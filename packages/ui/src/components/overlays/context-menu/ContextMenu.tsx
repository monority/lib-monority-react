import { usePortalTarget } from '@/internal/use-portal-target'
import { cn } from '@/lib/cn'
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'
import type { MutableRefObject, MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type {
    ContextMenuContentProps,
    ContextMenuItem,
    ContextMenuItemProps,
    ContextMenuLabelProps,
    ContextMenuProps,
    ContextMenuSeparatorProps,
    ContextMenuTriggerProps,
} from './ContextMenu.types'

function isActionableItem(item: ContextMenuItem) {
    return item.type !== 'separator' && !item.disabled
}

interface ContextMenuContextValue {
    isOpen: boolean
    setOpenState: (open: boolean) => void
    position: { top: number; left: number }
    openMenuAt: (x: number, y: number) => void
    contentRef: MutableRefObject<HTMLDivElement | null>
    rootRef: MutableRefObject<HTMLDivElement | null>
    focusItem: (direction?: number, targetValue?: string) => void
    instanceId: string
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

export function ContextMenu({
    ref,
    trigger,
    items = [],
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    className,
    contentClassName,
    children,
    ...props
}: ContextMenuProps) {
    const instanceId = useId()
    const rootRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const isControlled = controlledOpen !== undefined
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const isOpen = isControlled ? controlledOpen : internalOpen
    const portalTarget = usePortalTarget()

    const setOpenState = useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) setInternalOpen(nextOpen)
            onOpenChange?.(nextOpen)
        },
        [isControlled, onOpenChange]
    )

    const actionableItems = useMemo(() => items.filter(isActionableItem), [items])

    const focusItem = useCallback((direction = 1, targetValue?: string) => {
        const menuItems = contentRef.current?.querySelectorAll('[role="menuitem"]')
        if (!menuItems?.length) return
        if (targetValue) {
            ;(
                Array.from(menuItems).find(
                    (item) => (item as HTMLElement).dataset.value === targetValue
                ) as HTMLElement
            )?.focus()
            return
        }
        const activeIndex = Array.from(menuItems).findIndex(
            (item) => item === document.activeElement
        )
        const nextIndex =
            activeIndex === -1
                ? direction > 0
                    ? 0
                    : menuItems.length - 1
                : (activeIndex + direction + menuItems.length) % menuItems.length
        ;(menuItems[nextIndex] as HTMLElement)?.focus()
    }, [])

    const openMenuAt = useCallback(
        (clientX: number, clientY: number) => {
            const menuWidth = 192
            const menuHeight = 240
            const viewportWidth = window.innerWidth || 1024
            const viewportHeight = window.innerHeight || 768

            const left =
                clientX + menuWidth > viewportWidth
                    ? Math.max(8, viewportWidth - menuWidth - 8)
                    : Math.max(8, clientX)

            const top =
                clientY + menuHeight > viewportHeight
                    ? Math.max(8, viewportHeight - menuHeight - 8)
                    : Math.max(8, clientY)

            setPosition({ top, left })
            setOpenState(true)
        },
        [setOpenState]
    )

    const handleContextMenu = useCallback(
        (e: ReactMouseEvent) => {
            e.preventDefault()
            openMenuAt(e.clientX, e.clientY)
        },
        [openMenuAt]
    )

    useEffect(() => {
        if (!isOpen) return

        function handleClickOutside(e: MouseEvent) {
            if (
                !rootRef.current?.contains(e.target as Node) &&
                !contentRef.current?.contains(e.target as Node)
            ) {
                setOpenState(false)
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setOpenState(false)
                ;(
                    rootRef.current?.querySelector(
                        '.mr-context-menu__trigger'
                    ) as HTMLElement | null
                )?.focus()
            }
        }

        function handleResize() {
            setOpenState(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)
        window.addEventListener('resize', handleResize)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('resize', handleResize)
        }
    }, [isOpen, setOpenState])

    useEffect(() => {
        if (isOpen && actionableItems.length > 0) {
            focusItem(1, actionableItems[0]?.value)
        }
    }, [actionableItems, isOpen, focusItem])

    useEffect(() => {
        if (isOpen) {
            const original = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            return () => {
                document.body.style.overflow = original
            }
        }
    }, [isOpen])

    const contextValue: ContextMenuContextValue = {
        isOpen,
        setOpenState,
        position,
        openMenuAt,
        contentRef,
        rootRef,
        focusItem,
        instanceId,
    }

    if (children) {
        return (
            <ContextMenuContext.Provider value={contextValue}>
                <div
                    ref={(node) => {
                        if (typeof ref === 'function') ref(node)
                        else if (ref) (ref as { current: HTMLDivElement | null }).current = node
                        rootRef.current = node
                    }}
                    className={cn('mr-context-menu', className)}
                    data-open={isOpen ? true : undefined}
                    {...props}
                >
                    {children}
                </div>
            </ContextMenuContext.Provider>
        )
    }

    return (
        <ContextMenuContext.Provider value={contextValue}>
            <div
                ref={(node) => {
                    if (typeof ref === 'function') ref(node)
                    else if (ref) (ref as { current: HTMLDivElement | null }).current = node
                    rootRef.current = node
                }}
                className={cn('mr-context-menu', className)}
                data-open={isOpen ? true : undefined}
                {...props}
            >
                <div
                    className="mr-context-menu__trigger"
                    onContextMenu={handleContextMenu}
                    tabIndex={0}
                    role="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                >
                    {trigger}
                </div>

                {isOpen && portalTarget
                    ? createPortal(
                          <div
                              ref={contentRef}
                              id={`${instanceId}-content`}
                              className={cn('mr-context-menu__content', contentClassName)}
                              role="menu"
                              aria-orientation="vertical"
                              style={{ top: `${position.top}px`, left: `${position.left}px` }}
                              onKeyDown={(e) => {
                                  if (e.key === 'ArrowDown') {
                                      e.preventDefault()
                                      focusItem(1)
                                  }
                                  if (e.key === 'ArrowUp') {
                                      e.preventDefault()
                                      focusItem(-1)
                                  }
                                  if (e.key === 'Home') {
                                      e.preventDefault()
                                      focusItem(1, actionableItems[0]?.value)
                                  }
                                  if (e.key === 'End') {
                                      e.preventDefault()
                                      focusItem(
                                          -1,
                                          actionableItems[actionableItems.length - 1]?.value
                                      )
                                  }
                              }}
                          >
                              {items.map((item, index) =>
                                  item.type === 'separator' ? (
                                      <div
                                          key={`${instanceId}-sep-${index}`}
                                          className="mr-context-menu__separator"
                                          role="separator"
                                      />
                                  ) : (
                                      <button
                                          key={item.value}
                                          type="button"
                                          role="menuitem"
                                          data-value={item.value}
                                          className={cn(
                                              'mr-context-menu__item',
                                              item.danger && 'is-danger'
                                          )}
                                          disabled={item.disabled}
                                          onClick={() => {
                                              item.onSelect?.(item.value)
                                              setOpenState(false)
                                          }}
                                      >
                                          {item.icon ? (
                                              <span
                                                  className="mr-context-menu__item-icon"
                                                  aria-hidden="true"
                                              >
                                                  {item.icon}
                                              </span>
                                          ) : null}
                                          <span className="mr-context-menu__item-label">
                                              {item.label}
                                          </span>
                                          {item.shortcut ? (
                                              <kbd className="mr-context-menu__item-shortcut">
                                                  {item.shortcut}
                                              </kbd>
                                          ) : null}
                                      </button>
                                  )
                              )}
                          </div>,
                          portalTarget
                      )
                    : null}
            </div>
        </ContextMenuContext.Provider>
    )
}

function ContextMenuTrigger({
    ref,
    className,
    children,
    onContextMenu,
    ...props
}: ContextMenuTriggerProps) {
    const context = useContext(ContextMenuContext)
    return (
        <div
            ref={ref}
            className={cn('mr-context-menu__trigger', className)}
            tabIndex={0}
            role="button"
            aria-haspopup="menu"
            aria-expanded={context?.isOpen}
            onContextMenu={(e) => {
                onContextMenu?.(e)
                if (!e.defaultPrevented && context) {
                    e.preventDefault()
                    context.openMenuAt(e.clientX, e.clientY)
                }
            }}
            {...props}
        >
            {children}
        </div>
    )
}

function ContextMenuContent({
    ref,
    className,
    children,
    onKeyDown,
    ...props
}: ContextMenuContentProps) {
    const context = useContext(ContextMenuContext)
    const portalTarget = usePortalTarget()
    if (!context?.isOpen || !portalTarget) return null

    return createPortal(
        <div
            ref={(node) => {
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as { current: HTMLDivElement | null }).current = node
                if (context) context.contentRef.current = node
            }}
            role="menu"
            aria-orientation="vertical"
            className={cn('mr-context-menu__content', className)}
            style={{ top: `${context.position.top}px`, left: `${context.position.left}px` }}
            onKeyDown={(e) => {
                onKeyDown?.(e)
                if (e.defaultPrevented) return
                if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    context.focusItem(1)
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    context.focusItem(-1)
                }
            }}
            {...props}
        >
            {children}
        </div>,
        portalTarget
    )
}

function ContextMenuItemComponent({
    ref,
    value,
    danger = false,
    icon,
    shortcut,
    onSelect,
    disabled = false,
    className,
    children,
    onClick,
    ...props
}: ContextMenuItemProps) {
    const context = useContext(ContextMenuContext)
    return (
        <button
            ref={ref}
            type="button"
            role="menuitem"
            data-value={value}
            disabled={disabled}
            className={cn('mr-context-menu__item', danger && 'is-danger', className)}
            onClick={(e) => {
                onClick?.(e)
                onSelect?.(value ?? '')
                context?.setOpenState(false)
            }}
            {...props}
        >
            {icon ? (
                <span className="mr-context-menu__item-icon" aria-hidden="true">
                    {icon}
                </span>
            ) : null}
            <span className="mr-context-menu__item-label">{children}</span>
            {shortcut ? <kbd className="mr-context-menu__item-shortcut">{shortcut}</kbd> : null}
        </button>
    )
}

function ContextMenuSeparator({ ref, className, ...props }: ContextMenuSeparatorProps) {
    return (
        <div
            ref={ref}
            role="separator"
            className={cn('mr-context-menu__separator', className)}
            {...props}
        />
    )
}

function ContextMenuLabel({ ref, className, children, ...props }: ContextMenuLabelProps) {
    return (
        <div ref={ref} className={cn('mr-context-menu__label', className)} {...props}>
            {children}
        </div>
    )
}

ContextMenuTrigger.displayName = 'ContextMenu.Trigger'
ContextMenuContent.displayName = 'ContextMenu.Content'
ContextMenuItemComponent.displayName = 'ContextMenu.Item'
ContextMenuSeparator.displayName = 'ContextMenu.Separator'
ContextMenuLabel.displayName = 'ContextMenu.Label'

ContextMenu.Trigger = ContextMenuTrigger
ContextMenu.Content = ContextMenuContent
ContextMenu.Item = ContextMenuItemComponent
ContextMenu.Separator = ContextMenuSeparator
ContextMenu.Label = ContextMenuLabel

export {
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItemComponent as ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuLabel,
}

export type {
    ContextMenuProps,
    ContextMenuItem as ContextMenuItemData,
    ContextMenuTriggerProps,
    ContextMenuContentProps,
    ContextMenuItemProps,
    ContextMenuSeparatorProps,
    ContextMenuLabelProps,
} from './ContextMenu.types'
