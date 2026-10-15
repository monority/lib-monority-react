import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import type {
    NavigationItem,
    NavigationMenuContentProps,
    NavigationMenuItemProps,
    NavigationMenuLinkProps,
    NavigationMenuListProps,
    NavigationMenuProps,
    NavigationMenuTriggerProps,
} from './NavigationMenu.types'

function getItemValue(label: string): string {
    return label.toLowerCase().replace(/\s+/g, '-')
}

interface NavigationMenuContextValue {
    activeValue: string
    setActiveValue: (value: string) => void
    updateIndicator: (el: HTMLElement | null) => void
    indicatorStyle: { left: number; width: number }
    indicatorRef: React.RefObject<HTMLDivElement | null>
    handleItemMouseEnter: (val: string, el: HTMLElement | null) => void
    handleItemMouseLeave: () => void
}

const NavigationMenuContext = createContext<NavigationMenuContextValue | null>(null)

interface NavigationMenuItemContextValue {
    value: string
    isActive: boolean
    disabled?: boolean
}

const NavigationMenuItemContext = createContext<NavigationMenuItemContextValue | null>(null)
const NavigationMenuContentContext = createContext<boolean>(false)

export function NavigationMenuList({
    ref,
    children,
    className,
    ...props
}: NavigationMenuListProps) {
    const menuCtx = useContext(NavigationMenuContext)

    return (
        <div ref={ref} className={cn('mr-nav-menu__list', className)} {...props}>
            {children}
            {menuCtx ? (
                <div
                    ref={menuCtx.indicatorRef}
                    className="mr-nav-menu__indicator"
                    style={{
                        transform: `translateX(${menuCtx.indicatorStyle.left}px)`,
                        width: `${menuCtx.indicatorStyle.width}px`,
                        opacity: menuCtx.activeValue ? 1 : 0,
                    }}
                />
            ) : null}
        </div>
    )
}

export function NavigationMenuItem({
    ref,
    value: customValue,
    disabled,
    children,
    className,
    onMouseOver,
    ...props
}: NavigationMenuItemProps) {
    const generatedId = useId()
    const value = customValue ?? generatedId
    const menuCtx = useContext(NavigationMenuContext)
    const isActive = menuCtx?.activeValue === value

    return (
        <NavigationMenuItemContext.Provider value={{ value, isActive, disabled }}>
            <div
                ref={ref}
                className={cn(
                    'mr-nav-menu__item',
                    isActive && 'mr-nav-menu__item--active',
                    disabled && 'mr-nav-menu__item--disabled',
                    className
                )}
                data-active={isActive || undefined}
                data-disabled={disabled || undefined}
                onMouseOver={(e) => {
                    const related = e.relatedTarget as Node | null
                    const itemEl = e.currentTarget
                    if (related && itemEl.contains(related)) return
                    onMouseOver?.(e)
                    if (disabled) return
                    const trigger = itemEl.querySelector(
                        '.mr-nav-menu__trigger, .mr-nav-menu__link'
                    ) as HTMLElement | null
                    menuCtx?.handleItemMouseEnter(value, trigger)
                }}
                {...props}
            >
                {children}
            </div>
        </NavigationMenuItemContext.Provider>
    )
}

export function NavigationMenuTrigger({
    ref,
    icon,
    children,
    className,
    ...props
}: NavigationMenuTriggerProps) {
    const itemCtx = useContext(NavigationMenuItemContext)
    const isActive = itemCtx?.isActive ?? false
    const disabled = itemCtx?.disabled ?? props.disabled

    return (
        <button
            ref={ref}
            type="button"
            className={cn('mr-nav-menu__trigger', className)}
            disabled={disabled}
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={isActive}
            {...props}
        >
            {icon ? <span className="mr-nav-menu__icon">{icon}</span> : null}
            {children}
            <svg
                className="mr-nav-menu__chevron"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}

export function NavigationMenuContent({
    ref,
    children,
    className,
    ...props
}: NavigationMenuContentProps) {
    const itemCtx = useContext(NavigationMenuItemContext)
    const isActive = itemCtx?.isActive ?? false

    if (!isActive) return null

    return (
        <NavigationMenuContentContext.Provider value={true}>
            <div ref={ref} className={cn('mr-nav-menu__content', className)} role="menu" {...props}>
                <div className="mr-nav-menu__sub-list">{children}</div>
            </div>
        </NavigationMenuContentContext.Provider>
    )
}

export function NavigationMenuLink({
    ref,
    href = '#',
    active,
    disabled: customDisabled,
    icon,
    description,
    children,
    className,
    ...props
}: NavigationMenuLinkProps) {
    const isInsideContent = useContext(NavigationMenuContentContext)
    const itemCtx = useContext(NavigationMenuItemContext)
    const disabled = customDisabled ?? itemCtx?.disabled

    if (isInsideContent || description) {
        return (
            <a
                ref={ref}
                href={href}
                className={cn('mr-nav-menu__sub-item', className)}
                role="menuitem"
                aria-disabled={disabled || undefined}
                {...props}
            >
                {icon ? <span className="mr-nav-menu__sub-icon">{icon}</span> : null}
                <div className="mr-nav-menu__sub-text">
                    <span className="mr-nav-menu__sub-label">{children}</span>
                    {description ? (
                        <span className="mr-nav-menu__sub-desc">{description}</span>
                    ) : null}
                </div>
            </a>
        )
    }

    return (
        <a
            ref={ref}
            href={href}
            className={cn(
                'mr-nav-menu__link',
                disabled && 'mr-nav-menu__link--disabled',
                active && 'mr-nav-menu__link--active',
                className
            )}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : 0}
            {...props}
        >
            {icon ? <span className="mr-nav-menu__icon">{icon}</span> : null}
            {children}
        </a>
    )
}

export function NavigationMenu({
    ref,
    items,
    defaultValue,
    value: controlledValue,
    onValueChange,
    className,
    children,
    onMouseLeave,
    ...props
}: NavigationMenuProps) {
    const [internalActiveValue, setInternalActiveValue] = useState(defaultValue ?? '')
    const activeValue = controlledValue ?? internalActiveValue
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const indicatorRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    const setActiveValue = useCallback(
        (v: string) => {
            if (controlledValue === undefined) setInternalActiveValue(v)
            onValueChange?.(v)
        },
        [controlledValue, onValueChange]
    )

    const updateIndicator = useCallback((el: HTMLElement | null) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const parentRect = el.closest('.mr-nav-menu__list')?.getBoundingClientRect()
        if (parentRect) {
            setIndicatorStyle({
                left: rect.left - parentRect.left,
                width: rect.width,
            })
        }
    }, [])

    const handleItemMouseEnter = useCallback(
        (itemValue: string, el: HTMLElement | null) => {
            clearTimeout(timeoutRef.current)
            if (el) updateIndicator(el)
            setActiveValue(itemValue)
        },
        [setActiveValue, updateIndicator]
    )

    const handleItemMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setActiveValue('')
            setIndicatorStyle({ left: 0, width: 0 })
        }, 150)
    }, [setActiveValue])

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current)
    }, [])

    return (
        <NavigationMenuContext.Provider
            value={{
                activeValue,
                setActiveValue,
                updateIndicator,
                indicatorStyle,
                indicatorRef,
                handleItemMouseEnter,
                handleItemMouseLeave,
            }}
        >
            <nav
                ref={ref}
                className={cn('mr-nav-menu', className)}
                aria-label="Main navigation"
                data-open={Boolean(activeValue) || undefined}
                onMouseLeave={(e) => {
                    onMouseLeave?.(e)
                    handleItemMouseLeave()
                }}
                {...props}
            >
                {children ??
                    (items ? (
                        <NavigationMenuList>
                            {items.map((item: NavigationItem) => {
                                const itemValue = getItemValue(item.label)
                                const hasSubItems = item.items && item.items.length > 0

                                return (
                                    <NavigationMenuItem
                                        key={itemValue}
                                        value={itemValue}
                                        disabled={item.disabled}
                                    >
                                        {hasSubItems ? (
                                            <>
                                                <NavigationMenuTrigger icon={item.icon}>
                                                    {item.label}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    {item.items!.map((sub) => (
                                                        <NavigationMenuLink
                                                            key={sub.label}
                                                            href={sub.href || '#'}
                                                            icon={sub.icon}
                                                            description={sub.description}
                                                        >
                                                            {sub.label}
                                                        </NavigationMenuLink>
                                                    ))}
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            <NavigationMenuLink
                                                href={item.href || '#'}
                                                icon={item.icon}
                                                disabled={item.disabled}
                                            >
                                                {item.label}
                                            </NavigationMenuLink>
                                        )}
                                    </NavigationMenuItem>
                                )
                            })}
                        </NavigationMenuList>
                    ) : null)}
            </nav>
        </NavigationMenuContext.Provider>
    )
}

NavigationMenu.List = NavigationMenuList
NavigationMenu.Item = NavigationMenuItem
NavigationMenu.Trigger = NavigationMenuTrigger
NavigationMenu.Content = NavigationMenuContent
NavigationMenu.Link = NavigationMenuLink

export type {
    NavigationMenuProps,
    NavigationMenuListProps,
    NavigationMenuItemProps,
    NavigationMenuTriggerProps,
    NavigationMenuContentProps,
    NavigationMenuLinkProps,
    NavigationItem,
    NavigationSubItem,
} from './NavigationMenu.types'
