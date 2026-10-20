import {
    MenuItemPrimitive,
    MenuLabelPrimitive,
    MenuSeparatorPrimitive,
} from '@/internal/menu/MenuItemPrimitive'
import { useFloatingPosition } from '@/internal/use-floating-position'
import { usePortalTarget } from '@/internal/use-portal-target'
import { usePresence } from '@/internal/use-presence'
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
    isMounted: boolean
    presenceProps: { 'data-state': 'open' | 'closed'; 'data-closing'?: '' }
    setOpenState: (open: boolean) => void
    triggerElementRef: MutableRefObject<Element | null>
    contentRef: MutableRefObject<HTMLDivElement | null>
    position: { top: number; left: number }
    actualSide: DropdownSide
    actualAlign: DropdownAlign
    positioned: boolean
    focusItem: (direction?: number, targetValue?: string) => void
    returnFocusToTrigger: () => void
    updatePosition: () => void
    instanceId: string
    presenceRef: (node: HTMLElement | null) => void
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
    const isOpen = isControlled ? controlledOpen : internalOpen
    const portalTarget = usePortalTarget()
    const { isMounted, presenceProps, ref: presenceRef } = usePresence(isOpen, { durationMs: 200 })

    const { position, actualSide, actualAlign, positioned, updatePosition } = useFloatingPosition(
        triggerElementRef,
        contentRef,
        {
            side,
            align,
            sideOffset: OVERLAY_OFFSET,
            enabled: isMounted,
        }
    )

    const setOpenState = useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) setInternalOpen(nextOpen)
            onOpenChange?.(nextOpen)
        },
        [isControlled, onOpenChange]
    )

    const returnFocusToTrigger = useCallback(() => {
        const triggerEl =
            triggerElementRef.current ??
            rootRef.current?.querySelector<HTMLElement>(
                '[data-mr-dropdown-trigger="true"] button, [data-mr-dropdown-trigger="true"] a, [data-mr-dropdown-trigger="true"] [tabindex], button[data-mr-dropdown-trigger="true"]'
            )
        if (triggerEl && 'focus' in triggerEl) {
            ;(triggerEl as HTMLElement).focus()
        }
    }, [])

    const actionableItems = useMemo(() => items.filter(isActionableItem), [items])

    const focusItem = useCallback((direction = 1, targetValue?: string) => {
        const menuItems = Array.from(
            contentRef.current?.querySelectorAll<HTMLElement>(
                '[role="menuitem"]:not([disabled])'
            ) ?? []
        )
        if (!menuItems.length) return

        if (targetValue) {
            const target = menuItems.find((item) => item.dataset.value === targetValue)
            if (target) {
                target.focus()
                return
            }
        }

        const activeIndex = menuItems.findIndex((item) => item === document.activeElement)
        const nextIndex =
            activeIndex === -1
                ? direction > 0
                    ? 0
                    : menuItems.length - 1
                : (activeIndex + direction + menuItems.length) % menuItems.length

        menuItems[nextIndex]?.focus()
    }, [])

    // Écoute des clics extérieurs et de la touche Escape pour fermer
    useEffect(() => {
        if (!isOpen) return

        function handlePointerDown(e: MouseEvent) {
            const target = e.target as Node
            if (!rootRef.current?.contains(target) && !contentRef.current?.contains(target)) {
                setOpenState(false)
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                e.preventDefault()
                setOpenState(false)
                returnFocusToTrigger()
            }
        }

        document.addEventListener('mousedown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, setOpenState, returnFocusToTrigger])

    // Focus automatique sur le premier élément dès que le menu est ouvert
    useEffect(() => {
        if (isOpen) {
            if (actionableItems.length > 0) {
                focusItem(1, actionableItems[0]?.value)
            } else {
                focusItem(1)
            }
        }
    }, [actionableItems, isOpen, focusItem])

    const contextValue: DropdownMenuContextValue = {
        isOpen,
        isMounted,
        presenceProps,
        setOpenState,
        triggerElementRef,
        contentRef,
        position,
        actualSide,
        actualAlign,
        positioned,
        focusItem,
        returnFocusToTrigger,
        updatePosition,
        instanceId,
        presenceRef,
    }

    if (children) {
        return (
            <DropdownMenuContext.Provider value={contextValue}>
                <div
                    ref={(node) => {
                        if (typeof ref === 'function') ref(node)
                        else if (ref)
                            (ref as MutableRefObject<HTMLDivElement | null>).current = node
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
                    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node
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
                            setOpenState(!isOpen)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                triggerElementRef.current = e.currentTarget
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
                                    triggerElementRef.current = e.currentTarget
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
                            setOpenState(!isOpen)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                triggerElementRef.current = e.currentTarget
                                setOpenState(true)
                            }
                        }}
                    >
                        {trigger}
                    </button>
                )}

                {isMounted && portalTarget
                    ? createPortal(
                          <div
                              ref={(node) => {
                                  contentRef.current = node
                                  presenceRef(node)
                              }}
                              id={`${instanceId}-content`}
                              className={cn('mr-dropdown__content', contentClassName)}
                              role="menu"
                              aria-orientation="vertical"
                              data-side={actualSide}
                              data-align={actualAlign}
                              data-state={presenceProps['data-state']}
                              data-closing={presenceProps['data-closing']}
                              data-positioned={positioned ? '' : undefined}
                              style={{
                                  top: `${position.top}px`,
                                  left: `${position.left}px`,
                                  visibility: positioned ? undefined : 'hidden',
                              }}
                              onKeyDown={(e) => {
                                  if (e.key === 'ArrowDown') {
                                      e.preventDefault()
                                      focusItem(1)
                                  } else if (e.key === 'ArrowUp') {
                                      e.preventDefault()
                                      focusItem(-1)
                                  } else if (e.key === 'Home') {
                                      e.preventDefault()
                                      focusItem(1, actionableItems[0]?.value)
                                  } else if (e.key === 'End') {
                                      e.preventDefault()
                                      focusItem(
                                          -1,
                                          actionableItems[actionableItems.length - 1]?.value
                                      )
                                  } else if (e.key === 'Tab') {
                                      setOpenState(false)
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
                                              returnFocusToTrigger()
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
                else if (ref) (ref as MutableRefObject<HTMLButtonElement | null>).current = node
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
                    context.setOpenState(!context.isOpen)
                }
            }}
            onKeyDown={(e) => {
                onKeyDown?.(e)
                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    if (context) {
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
    if (!context?.isMounted || !portalTarget) return null

    return createPortal(
        <div
            ref={(node) => {
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node
                if (context) {
                    context.contentRef.current = node
                    context.presenceRef(node)
                }
            }}
            role="menu"
            aria-orientation="vertical"
            className={cn('mr-dropdown__content', className)}
            data-side={context.actualSide}
            data-align={context.actualAlign}
            data-state={context.presenceProps['data-state']}
            data-closing={context.presenceProps['data-closing']}
            data-positioned={context.positioned ? '' : undefined}
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
                } else if (e.key === 'Tab') {
                    context.setOpenState(false)
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
        <MenuItemPrimitive
            ref={ref}
            value={value}
            danger={danger}
            icon={icon}
            shortcut={shortcut}
            onSelect={onSelect}
            disabled={disabled}
            className={className}
            classPrefix="mr-dropdown"
            onItemClick={() => {
                context?.setOpenState(false)
                context?.returnFocusToTrigger()
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </MenuItemPrimitive>
    )
}

function DropdownMenuSeparator({ ref, className, ...props }: DropdownMenuSeparatorProps) {
    return (
        <MenuSeparatorPrimitive
            ref={ref}
            classPrefix="mr-dropdown"
            className={className}
            {...props}
        />
    )
}

function DropdownMenuLabel({ ref, className, children, ...props }: DropdownMenuLabelProps) {
    return (
        <MenuLabelPrimitive ref={ref} classPrefix="mr-dropdown" className={className} {...props}>
            {children}
        </MenuLabelPrimitive>
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
