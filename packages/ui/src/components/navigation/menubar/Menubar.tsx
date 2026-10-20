import { cn } from '@/lib/cn'
import { MenuItemPrimitive, MenuSeparatorPrimitive } from '@/internal/menu/MenuItemPrimitive'
import { usePresence } from '@/internal/use-presence'
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
                data-value={value}
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
    const menubarCtx = useContext(MenubarContext)
    const menuCtx = useContext(MenubarMenuContext)
    const isOpen = menuCtx?.isOpen ?? false
    const isSwitching = Boolean(menubarCtx?.activeMenu && !isOpen)
    const durationMs = isSwitching ? 0 : 150
    const presence = usePresence(isOpen, { durationMs })

    if (!presence.isMounted) return null

    const handleRef = (node: HTMLDivElement | null) => {
        presence.ref(node)
        if (typeof ref === 'function') {
            ref(node)
        } else if (ref && 'current' in ref) {
            ;(ref as { current: HTMLDivElement | null }).current = node
        }
    }

    return (
        <div
            ref={handleRef}
            className={cn('mr-menubar__menu', className)}
            role="menu"
            aria-label={menuCtx?.value}
            {...presence.presenceProps}
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
        <MenuItemPrimitive
            ref={ref}
            classPrefix="mr-menubar"
            danger={variant === 'danger'}
            dangerClassName="mr-menubar__item--danger"
            disabled={disabled}
            disabledClassName="mr-menubar__item--disabled"
            icon={icon}
            shortcut={shortcut}
            shortcutClassName="mr-menubar__shortcut"
            className={className}
            onClick={onClick}
            onItemClick={() => menubarCtx?.setActiveMenu(null)}
            {...props}
        >
            {children}
        </MenuItemPrimitive>
    )
}

export function MenubarSeparator({ ref, className, ...props }: MenubarSeparatorProps) {
    return (
        <MenuSeparatorPrimitive
            ref={ref}
            classPrefix="mr-menubar"
            className={className}
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

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent | KeyboardEvent) => {
            if (!menubarRef.current) return

            const triggers = Array.from(
                menubarRef.current.querySelectorAll<HTMLButtonElement>(
                    '.mr-menubar__trigger:not(:disabled)'
                )
            )
            if (!triggers.length) return

            const activeWrapper = menubarRef.current.querySelector<HTMLElement>(
                '.mr-menubar__menu-wrapper--active, .mr-menubar__menu-wrapper[data-active="true"]'
            )
            const activeTrigger =
                activeWrapper?.querySelector<HTMLButtonElement>('.mr-menubar__trigger')
            const activeTriggerIndex = activeTrigger ? triggers.indexOf(activeTrigger) : -1

            const menuItems = activeWrapper
                ? Array.from(
                      activeWrapper.querySelectorAll<HTMLElement>(
                          '.mr-menubar__menu [role="menuitem"]:not([disabled])'
                      )
                  )
                : []

            const focusedItemIndex = menuItems.indexOf(document.activeElement as HTMLElement)
            const isFocusInMenu = focusedItemIndex !== -1
            const isFocusOnTrigger = triggers.includes(document.activeElement as HTMLButtonElement)

            if (e.key === 'Escape') {
                if (activeMenu) {
                    e.preventDefault()
                    setActiveMenu(null)
                    activeTrigger?.focus()
                }
                return
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault()
                const currentIdx = isFocusOnTrigger
                    ? triggers.indexOf(document.activeElement as HTMLButtonElement)
                    : activeTriggerIndex !== -1
                      ? activeTriggerIndex
                      : 0
                const nextIdx = (currentIdx + 1) % triggers.length
                const nextTrigger = triggers[nextIdx]
                if (nextTrigger) {
                    const menuWrapper = nextTrigger.closest('.mr-menubar__menu-wrapper')
                    const menuValue =
                        menuWrapper?.getAttribute('data-value') ?? nextTrigger.textContent ?? ''
                    if (activeMenu) {
                        setActiveMenu(menuValue)
                    }
                    nextTrigger.focus()
                }
                return
            }

            if (e.key === 'ArrowLeft') {
                e.preventDefault()
                const currentIdx = isFocusOnTrigger
                    ? triggers.indexOf(document.activeElement as HTMLButtonElement)
                    : activeTriggerIndex !== -1
                      ? activeTriggerIndex
                      : 0
                const prevIdx = (currentIdx - 1 + triggers.length) % triggers.length
                const prevTrigger = triggers[prevIdx]
                if (prevTrigger) {
                    const menuWrapper = prevTrigger.closest('.mr-menubar__menu-wrapper')
                    const menuValue =
                        menuWrapper?.getAttribute('data-value') ?? prevTrigger.textContent ?? ''
                    if (activeMenu) {
                        setActiveMenu(menuValue)
                    }
                    prevTrigger.focus()
                }
                return
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                if (isFocusOnTrigger && !activeMenu) {
                    const trigger = document.activeElement as HTMLButtonElement
                    const wrapper = trigger.closest('.mr-menubar__menu-wrapper')
                    const menuVal = wrapper?.getAttribute('data-value') ?? trigger.textContent ?? ''
                    setActiveMenu(menuVal)
                } else if (menuItems.length > 0) {
                    const nextItemIdx =
                        focusedItemIndex === -1 ? 0 : (focusedItemIndex + 1) % menuItems.length
                    menuItems[nextItemIdx]?.focus()
                }
                return
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault()
                if (isFocusOnTrigger && !activeMenu) {
                    const trigger = document.activeElement as HTMLButtonElement
                    const wrapper = trigger.closest('.mr-menubar__menu-wrapper')
                    const menuVal = wrapper?.getAttribute('data-value') ?? trigger.textContent ?? ''
                    setActiveMenu(menuVal)
                } else if (menuItems.length > 0) {
                    const prevItemIdx =
                        focusedItemIndex === -1
                            ? menuItems.length - 1
                            : (focusedItemIndex - 1 + menuItems.length) % menuItems.length
                    menuItems[prevItemIdx]?.focus()
                }
                return
            }

            if (e.key === 'Home') {
                e.preventDefault()
                if (isFocusInMenu && menuItems.length > 0) {
                    menuItems[0]?.focus()
                } else if (triggers.length > 0) {
                    triggers[0]?.focus()
                }
                return
            }

            if (e.key === 'End') {
                e.preventDefault()
                if (isFocusInMenu && menuItems.length > 0) {
                    menuItems[menuItems.length - 1]?.focus()
                } else if (triggers.length > 0) {
                    triggers[triggers.length - 1]?.focus()
                }
                return
            }
        },
        [activeMenu, setActiveMenu]
    )

    useEffect(() => {
        if (activeMenu) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleKeyDown)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [activeMenu, handleClickOutside, handleKeyDown])

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
                onKeyDown={handleKeyDown}
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
