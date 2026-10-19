import { usePortalTarget } from '@/internal/use-portal-target'
import { cn } from '@/lib/cn'
import { OVERLAY_OFFSET } from '@/lib/constants'
import {
    cloneElement,
    createContext,
    isValidElement,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'
import type { MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import type {
    DropdownAlign,
    DropdownMenuContentProps,
    DropdownMenuItem,
    DropdownMenuItemProps,
    DropdownMenuLabelProps,
    DropdownMenuProps,
    DropdownMenuSeparatorProps,
    DropdownMenuTriggerProps,
    DropdownSide,
} from './DropdownMenu.types'

function isActionableItem(item: DropdownMenuItem) {
    return item.type !== 'separator' && !item.disabled
}

interface DropdownMenuContextValue {
    isOpen: boolean
    setOpenState: (open: boolean) => void
    triggerElementRef: MutableRefObject<Element | null>
    contentRef: MutableRefObject<HTMLDivElement | null>
    position: { top: number; left: number }
    positioned: boolean
    focusItem: (direction?: number, targetValue?: string) => void
    updatePosition: () => void
    align: DropdownAlign
    side: DropdownSide
    instanceId: string
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

export function DropdownMenu({
    ref,
    trigger,
    items = [],
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    align = 'end',
    side = 'bottom',
    className,
    contentClassName,
    children,
    ...props
}: DropdownMenuProps) {
    const instanceId = useId()
    const rootRef = useRef<HTMLDivElement>(null)
    const triggerElementRef = useRef<Element | null>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const isControlled = controlledOpen !== undefined
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const isOpen = isControlled ? controlledOpen : internalOpen
    const portalTarget = usePortalTarget()
    // Never paint at the (0,0) initial position: hidden until measured.
    const [positioned, setPositioned] = useState(false)

    const setOpenState = useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) setInternalOpen(nextOpen)
            onOpenChange?.(nextOpen)
        },
        [isControlled, onOpenChange]
    )

    const actionableItems = useMemo(() => items.filter(isActionableItem), [items])

    const updatePosition = useCallback(() => {
        const el =
            triggerElementRef.current ??
            rootRef.current?.querySelector('[data-mr-dropdown-trigger="true"]')
        if (!el) return
        const anchorRect = el.getBoundingClientRect()
        const contentEl = contentRef.current
        const floatingRect = contentEl ? contentEl.getBoundingClientRect() : { width: 0, height: 0 }
        const gap = OVERLAY_OFFSET
        const top = side === 'top' ? anchorRect.top - gap : anchorRect.bottom + gap
        let left = anchorRect.left
        if (align === 'center') {
            left = anchorRect.left + anchorRect.width / 2 - floatingRect.width / 2
        } else if (align === 'end') {
            left = anchorRect.right - floatingRect.width
        }
        const padding = 8
        const maxLeft = (window.innerWidth || 1024) - floatingRect.width - padding
        left = Math.min(Math.max(left, padding), Math.max(padding, maxLeft))
        setPosition({ top, left })
        setPositioned(true)
    }, [align, side])

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

    useEffect(() => {
        if (!isOpen) {
            setPositioned(false)
            return
        }
        const frameId = window.requestAnimationFrame(updatePosition)
        function pd(e: MouseEvent) {
            if (
                !rootRef.current?.contains(e.target as Node) &&
                !contentRef.current?.contains(e.target as Node)
            )
                setOpenState(false)
        }
        function kd(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setOpenState(false)
                ;(
                    rootRef.current?.querySelector(
                        '[data-mr-dropdown-trigger="true"] button, [data-mr-dropdown-trigger="true"] a, [data-mr-dropdown-trigger="true"] [tabindex]'
                    ) as HTMLElement
                )?.focus()
            }
        }
        function vc() {
            updatePosition()
        }
        document.addEventListener('mousedown', pd)
        document.addEventListener('keydown', kd)
        window.addEventListener('resize', vc)
        window.addEventListener('scroll', vc, true)
        return () => {
            window.cancelAnimationFrame(frameId)
            document.removeEventListener('mousedown', pd)
            document.removeEventListener('keydown', kd)
            window.removeEventListener('resize', vc)
            window.removeEventListener('scroll', vc, true)
        }
    }, [isOpen, setOpenState, updatePosition])

    useEffect(() => {
        if (isOpen && actionableItems.length > 0) {
            focusItem(1, actionableItems[0]?.value)
        }
    }, [actionableItems, isOpen, focusItem])

    const contextValue: DropdownMenuContextValue = {
        isOpen,
        setOpenState,
        triggerElementRef,
        contentRef,
        position,
        positioned,
        focusItem,
        updatePosition,
        align,
        side,
        instanceId,
    }

    if (children) {
        return (
            <DropdownMenuContext.Provider value={contextValue}>
                <div
                    ref={(node) => {
                        if (typeof ref === 'function') ref(node)
                        else if (ref) (ref as { current: HTMLDivElement | null }).current = node
                        rootRef.current = node
                    }}
                    className={cn('mr-dropdown', className)}
                    data-open={isOpen ? true : undefined}
                    data-align={align}
                    data-side={side}
                    {...props}
                >
                    {children}
                </div>
            </DropdownMenuContext.Provider>
        )
    }

    return (
        <DropdownMenuContext.Provider value={contextValue}>
            <div
                ref={(node) => {
                    if (typeof ref === 'function') ref(node)
                    else if (ref) (ref as { current: HTMLDivElement | null }).current = node
                    rootRef.current = node
                }}
                className={cn('mr-dropdown', className)}
                data-open={isOpen ? true : undefined}
                data-align={align}
                data-side={side}
                {...props}
            >
                {typeof trigger === 'string' ? (
                    <button
                        type="button"
                        className="mr-dropdown__trigger"
                        data-mr-dropdown-trigger="true"
                        aria-expanded={isOpen}
                        aria-controls={`${instanceId}-content`}
                        aria-haspopup="menu"
                        onClick={(e) => {
                            triggerElementRef.current = e.currentTarget
                            updatePosition()
                            setOpenState(!isOpen)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                updatePosition()
                                setOpenState(true)
                            }
                        }}
                    >
                        {trigger}
                    </button>
                ) : isValidElement(trigger) ? (
                    cloneElement(
                        trigger as React.ReactElement<Record<string, unknown>>,
                        {
                            'data-mr-dropdown-trigger': 'true',
                            'aria-expanded': isOpen,
                            'aria-controls': `${instanceId}-content`,
                            'aria-haspopup': 'menu',
                            ref: (node: HTMLElement | null) => {
                                triggerElementRef.current = node
                                const childRef =
                                    (trigger.props as { ref?: React.Ref<HTMLElement> })?.ref ??
                                    (trigger as unknown as { ref?: React.Ref<HTMLElement> }).ref
                                if (typeof childRef === 'function') childRef(node)
                                else if (
                                    childRef &&
                                    typeof childRef === 'object' &&
                                    'current' in childRef
                                ) {
                                    ;(
                                        childRef as unknown as { current: HTMLElement | null }
                                    ).current = node
                                }
                            },
                            onClick: (e: React.MouseEvent<HTMLElement>) => {
                                const childProps = (
                                    trigger as React.ReactElement<Record<string, unknown>>
                                ).props
                                if (typeof childProps.onClick === 'function') {
                                    ;(childProps.onClick as React.MouseEventHandler<HTMLElement>)(e)
                                }
                                triggerElementRef.current = e.currentTarget
                                updatePosition()
                                setOpenState(!isOpen)
                            },
                            onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
                                const childProps = (
                                    trigger as React.ReactElement<Record<string, unknown>>
                                ).props
                                if (typeof childProps.onKeyDown === 'function') {
                                    ;(
                                        childProps.onKeyDown as React.KeyboardEventHandler<HTMLElement>
                                    )(e)
                                }
                                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    updatePosition()
                                    setOpenState(true)
                                }
                            },
                        } as Record<string, unknown>
                    )
                ) : (
                    <button
                        type="button"
                        className="mr-dropdown__trigger"
                        data-mr-dropdown-trigger="true"
                        aria-expanded={isOpen}
                        aria-controls={`${instanceId}-content`}
                        aria-haspopup="menu"
                        onClick={(e) => {
                            triggerElementRef.current = e.currentTarget
                            updatePosition()
                            setOpenState(!isOpen)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                updatePosition()
                                setOpenState(true)
                            }
                        }}
                    >
                        {trigger}
                    </button>
                )}
                {isOpen && portalTarget
                    ? createPortal(
                          <div
                              ref={contentRef}
                              id={`${instanceId}-content`}
                              className={cn('mr-dropdown__content', contentClassName)}
                              role="menu"
                              aria-orientation="vertical"
                              style={{
                                  top: `${position.top}px`,
                                  left: `${position.left}px`,
                                  visibility: positioned ? undefined : 'hidden',
                              }}
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
                                          className="mr-dropdown__separator"
                                          role="separator"
                                      />
                                  ) : (
                                      <button
                                          key={item.value}
                                          type="button"
                                          role="menuitem"
                                          data-value={item.value}
                                          className={cn(
                                              'mr-dropdown__item',
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
                                                  className="mr-dropdown__item-icon"
                                                  aria-hidden="true"
                                              >
                                                  {item.icon}
                                              </span>
                                          ) : null}
                                          <span className="mr-dropdown__item-label">
                                              {item.label}
                                          </span>
                                          {item.shortcut ? (
                                              <kbd className="mr-dropdown__item-shortcut">
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
        </DropdownMenuContext.Provider>
    )
}

function DropdownMenuTrigger({
    ref,
    className,
    children,
    onClick,
    onKeyDown,
    ...props
}: DropdownMenuTriggerProps) {
    const context = useContext(DropdownMenuContext)
    return (
        <button
            ref={(node) => {
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as { current: HTMLButtonElement | null }).current = node
                if (context) context.triggerElementRef.current = node
            }}
            type="button"
            className={cn('mr-dropdown__trigger', className)}
            data-mr-dropdown-trigger="true"
            aria-haspopup="menu"
            aria-expanded={context?.isOpen}
            onClick={(e) => {
                onClick?.(e)
                if (context) {
                    context.updatePosition()
                    context.setOpenState(!context.isOpen)
                }
            }}
            onKeyDown={(e) => {
                onKeyDown?.(e)
                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    if (context) {
                        context.updatePosition()
                        context.setOpenState(true)
                    }
                }
            }}
            {...props}
        >
            {children}
        </button>
    )
}

function DropdownMenuContent({
    ref,
    className,
    children,
    onKeyDown,
    ...props
}: DropdownMenuContentProps) {
    const context = useContext(DropdownMenuContext)
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
            className={cn('mr-dropdown__content', className)}
            data-side={context.side}
            data-align={context.align}
            style={{
                top: `${context.position.top}px`,
                left: `${context.position.left}px`,
                visibility: context.positioned ? undefined : 'hidden',
            }}
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

function DropdownMenuItemComponent({
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
}: DropdownMenuItemProps) {
    const context = useContext(DropdownMenuContext)
    return (
        <button
            ref={ref}
            type="button"
            role="menuitem"
            data-value={value}
            disabled={disabled}
            className={cn('mr-dropdown__item', danger && 'is-danger', className)}
            onClick={(e) => {
                onClick?.(e)
                onSelect?.(value ?? '')
                context?.setOpenState(false)
            }}
            {...props}
        >
            {icon ? (
                <span className="mr-dropdown__item-icon" aria-hidden="true">
                    {icon}
                </span>
            ) : null}
            <span className="mr-dropdown__item-label">{children}</span>
            {shortcut ? <kbd className="mr-dropdown__item-shortcut">{shortcut}</kbd> : null}
        </button>
    )
}

function DropdownMenuSeparator({ ref, className, ...props }: DropdownMenuSeparatorProps) {
    return (
        <div
            ref={ref}
            role="separator"
            className={cn('mr-dropdown__separator', className)}
            {...props}
        />
    )
}

function DropdownMenuLabel({ ref, className, children, ...props }: DropdownMenuLabelProps) {
    return (
        <div ref={ref} className={cn('mr-dropdown__label', className)} {...props}>
            {children}
        </div>
    )
}

DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger'
DropdownMenuContent.displayName = 'DropdownMenu.Content'
DropdownMenuItemComponent.displayName = 'DropdownMenu.Item'
DropdownMenuSeparator.displayName = 'DropdownMenu.Separator'
DropdownMenuLabel.displayName = 'DropdownMenu.Label'

DropdownMenu.Trigger = DropdownMenuTrigger
DropdownMenu.Content = DropdownMenuContent
DropdownMenu.Item = DropdownMenuItemComponent
DropdownMenu.Separator = DropdownMenuSeparator
DropdownMenu.Label = DropdownMenuLabel

export {
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItemComponent as DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
}

export type {
    DropdownMenuProps,
    DropdownMenuItem as DropdownMenuItemData,
    DropdownAlign,
    DropdownSide,
    DropdownMenuTriggerProps,
    DropdownMenuContentProps,
    DropdownMenuItemProps,
    DropdownMenuSeparatorProps,
    DropdownMenuLabelProps,
} from './DropdownMenu.types'
