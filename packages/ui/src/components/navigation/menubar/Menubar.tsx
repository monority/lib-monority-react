import { cn } from '@/lib/cn'
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import type {
    MenuItem,
    MenubarContentProps,
    MenubarItemProps,
    MenubarMenu,
    MenubarMenuProps,
    MenubarProps,
    MenubarSeparatorProps,
    MenubarShortcutProps,
    MenubarTriggerProps,
} from './Menubar.types'

interface MenubarContextValue {
    activeMenu: string | null
    setActiveMenu: (value: string | null) => void
    toggleMenu: (label: string) => void
}

const MenubarContext = createContext<MenubarContextValue | null>(null)

interface MenubarMenuContextValue {
    value: string
    isOpen: boolean
    disabled?: boolean
}

const MenubarMenuContext = createContext<MenubarMenuContextValue | null>(null)

export function MenubarMenuComponent({
    ref,
    value: customValue,
    disabled,
    children,
    className,
    ...props
}: MenubarMenuProps) {
    const generatedId = useId()
    const value = customValue ?? generatedId
    const menubarCtx = useContext(MenubarContext)
    const isOpen = menubarCtx?.activeMenu === value

    return (
        <MenubarMenuContext.Provider value={{ value, isOpen, disabled }}>
            <div
                ref={ref}
                className={cn(
                    'mr-menubar__menu-wrapper',
                    isOpen && 'mr-menubar__menu-wrapper--active',
                    className
                )}
                data-active={isOpen || undefined}
                {...props}
            >
                {children}
            </div>
        </MenubarMenuContext.Provider>
    )
}

export function MenubarTrigger({
    ref,
    children,
    className,
    onClick,
    ...props
}: MenubarTriggerProps) {
    const menuCtx = useContext(MenubarMenuContext)
    const menubarCtx = useContext(MenubarContext)
    const isOpen = menuCtx?.isOpen ?? false
    const disabled = menuCtx?.disabled ?? props.disabled

    return (
        <button
            ref={ref}
            type="button"
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={isOpen}
            disabled={disabled}
            className={cn('mr-menubar__trigger', className)}
            onClick={(e) => {
                onClick?.(e)
                if (!disabled && menuCtx && menubarCtx) {
                    menubarCtx.toggleMenu(menuCtx.value)
                }
            }}
            {...props}
        >
            {children}
        </button>
    )
}

export function MenubarContent({ ref, children, className, ...props }: MenubarContentProps) {
    const menuCtx = useContext(MenubarMenuContext)
    const isOpen = menuCtx?.isOpen ?? false

    if (!isOpen) return null

    return (
        <div
            ref={ref}
            className={cn('mr-menubar__menu', className)}
            role="menu"
            aria-label={menuCtx?.value}
            {...props}
        >
            {children}
        </div>
    )
}

export function MenubarItem({
    ref,
    variant = 'default',
    icon,
    shortcut,
    disabled,
    children,
    className,
    onClick,
    ...props
}: MenubarItemProps) {
    const menubarCtx = useContext(MenubarContext)

    return (
        <button
            ref={ref}
            type="button"
            role="menuitem"
            disabled={disabled}
            onClick={(e) => {
                if (disabled) return
                onClick?.(e)
                menubarCtx?.setActiveMenu(null)
            }}
            className={cn(
                'mr-menubar__item',
                variant === 'danger' && 'mr-menubar__item--danger',
                disabled && 'mr-menubar__item--disabled',
                className
            )}
            {...props}
        >
            {icon ? <span className="mr-menubar__item-icon">{icon}</span> : null}
            <span className="mr-menubar__item-label">{children}</span>
            {shortcut ? <span className="mr-menubar__shortcut">{shortcut}</span> : null}
        </button>
    )
}

export function MenubarSeparator({ ref, className, ...props }: MenubarSeparatorProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-menubar__separator', className)}
            role="separator"
            {...props}
        />
    )
}

export function MenubarShortcut({ ref, children, className, ...props }: MenubarShortcutProps) {
    return (
        <span ref={ref} className={cn('mr-menubar__shortcut', className)} {...props}>
            {children}
        </span>
    )
}

export function Menubar({
    ref,
    items,
    defaultActive,
    value: controlledValue,
    onValueChange,
    className,
    children,
    ...props
}: MenubarProps) {
    const [internalActiveMenu, setInternalActiveMenu] = useState<string | null>(
        defaultActive ?? null
    )
    const activeMenu = controlledValue !== undefined ? controlledValue : internalActiveMenu
    const menubarRef = useRef<HTMLDivElement>(null)

    const setActiveMenu = useCallback(
        (val: string | null) => {
            if (controlledValue === undefined) {
                setInternalActiveMenu(val)
            }
            onValueChange?.(val)
        },
        [controlledValue, onValueChange]
    )

    const toggleMenu = useCallback(
        (label: string) => {
            setActiveMenu(activeMenu === label ? null : label)
        },
        [activeMenu, setActiveMenu]
    )

    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
                setActiveMenu(null)
            }
        },
        [setActiveMenu]
    )

    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveMenu(null)
            }
        },
        [setActiveMenu]
    )

    useEffect(() => {
        if (activeMenu) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleEscape)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [activeMenu, handleClickOutside, handleEscape])

    return (
        <MenubarContext.Provider value={{ activeMenu, setActiveMenu, toggleMenu }}>
            <div
                ref={(node) => {
                    if (typeof ref === 'function') ref(node)
                    else if (ref)
                        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
                    ;(menubarRef as React.MutableRefObject<HTMLDivElement | null>).current = node
                }}
                role="menubar"
                className={cn('mr-menubar', className)}
                data-open={activeMenu !== null ? true : undefined}
                data-has-active={activeMenu !== null ? true : undefined}
                {...props}
            >
                {children ??
                    (items
                        ? items.map((menu: MenubarMenu) => (
                              <MenubarMenuComponent
                                  key={menu.label}
                                  value={menu.label}
                                  disabled={menu.disabled}
                              >
                                  <MenubarTrigger>{menu.label}</MenubarTrigger>
                                  <MenubarContent>
                                      {menu.items.map((item: MenuItem, i: number) => {
                                          if (item.separator) {
                                              return <MenubarSeparator key={`sep-${i}`} />
                                          }
                                          return (
                                              <MenubarItem
                                                  key={i}
                                                  disabled={item.disabled}
                                                  variant={item.variant}
                                                  icon={item.icon}
                                                  shortcut={item.shortcut}
                                                  onClick={item.onClick}
                                              >
                                                  {item.label}
                                              </MenubarItem>
                                          )
                                      })}
                                  </MenubarContent>
                              </MenubarMenuComponent>
                          ))
                        : null)}
            </div>
        </MenubarContext.Provider>
    )
}

Menubar.Menu = MenubarMenuComponent
Menubar.Trigger = MenubarTrigger
Menubar.Content = MenubarContent
Menubar.Item = MenubarItem
Menubar.Separator = MenubarSeparator
Menubar.Shortcut = MenubarShortcut

export type {
    MenubarProps,
    MenubarMenuProps,
    MenubarTriggerProps,
    MenubarContentProps,
    MenubarItemProps,
    MenubarSeparatorProps,
    MenubarShortcutProps,
    MenubarMenu,
    MenuItem,
} from './Menubar.types'
