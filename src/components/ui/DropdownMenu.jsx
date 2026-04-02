import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

function isActionableItem(item) {
    return item.type !== 'separator' && !item.disabled
}

export function DropdownMenu({
    trigger,
    items = [],
    open,
    defaultOpen = false,
    onOpenChange,
    align = 'end',
    side = 'bottom',
    className,
    contentClassName,
}) {
    const instanceId = useId()
    const rootRef = useRef(null)
    const triggerElementRef = useRef(null)
    const contentRef = useRef(null)
    const isControlled = open !== undefined
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const isOpen = isControlled ? open : internalOpen

    const setOpenState = useCallback((nextOpen) => {
        if (!isControlled) {
            setInternalOpen(nextOpen)
        }

        onOpenChange?.(nextOpen)
    }, [isControlled, onOpenChange])

    const actionableItems = useMemo(() => items.filter(isActionableItem), [items])

    const updatePosition = useCallback(() => {
        const triggerElement =
            triggerElementRef.current ??
            rootRef.current?.querySelector('[data-ui-dropdown-trigger="true"]')

        if (!triggerElement) {
            return
        }

        const rect = triggerElement.getBoundingClientRect()
        const gap = 10
        const top = side === 'top' ? rect.top - gap : rect.bottom + gap

        let left = rect.left

        if (align === 'center') {
            left = rect.left + rect.width / 2
        }

        if (align === 'end') {
            left = rect.right
        }

        setPosition({ top, left })
    }, [align, side])

    function focusItem(direction = 1, targetValue) {
        const menuItems = contentRef.current?.querySelectorAll('[role="menuitem"]')

        if (!menuItems?.length) {
            return
        }

        if (targetValue) {
            const targetItem = [...menuItems].find((item) => item.dataset.value === targetValue)
            targetItem?.focus()
            return
        }

        const activeIndex = [...menuItems].findIndex((item) => item === document.activeElement)
        const nextIndex = activeIndex === -1
            ? direction > 0 ? 0 : menuItems.length - 1
            : (activeIndex + direction + menuItems.length) % menuItems.length

        menuItems[nextIndex]?.focus()
    }

    useEffect(() => {
        if (!isOpen) {
            return undefined
        }

        const frameId = window.requestAnimationFrame(() => {
            updatePosition()
        })

        function handlePointerDown(event) {
            if (
                !rootRef.current?.contains(event.target) &&
                !contentRef.current?.contains(event.target)
            ) {
                setOpenState(false)
            }
        }

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setOpenState(false)
                rootRef.current
                    ?.querySelector('[data-ui-dropdown-trigger="true"] button, [data-ui-dropdown-trigger="true"] a, [data-ui-dropdown-trigger="true"] [tabindex]')
                    ?.focus()
            }
        }

        function handleViewportChange() {
            updatePosition()
        }

        document.addEventListener('mousedown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)
        window.addEventListener('resize', handleViewportChange)
        window.addEventListener('scroll', handleViewportChange, true)

        return () => {
            window.cancelAnimationFrame(frameId)
            document.removeEventListener('mousedown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('resize', handleViewportChange)
            window.removeEventListener('scroll', handleViewportChange, true)
        }
    }, [isOpen, setOpenState, updatePosition])

    useEffect(() => {
        if (isOpen) {
            focusItem(1, actionableItems[0]?.value)
        }
    }, [actionableItems, isOpen])

    const triggerProps = {
        'data-ui-dropdown-trigger': 'true',
        'aria-expanded': isOpen,
        'aria-controls': `${instanceId}-content`,
        'aria-haspopup': 'menu',
    }

    return (
        <div
            ref={rootRef}
            className={cn(
                'ui-dropdown',
                `ui-dropdown--${side}`,
                `ui-dropdown--${align}`,
                className,
            )}
        >
            {typeof trigger === 'string' ? (
                <button
                    type="button"
                    className="ui-dropdown__trigger"
                    {...triggerProps}
                    onClick={(event) => {
                        triggerElementRef.current = event.currentTarget
                        updatePosition()
                        setOpenState(!isOpen)
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            updatePosition()
                            setOpenState(true)
                        }
                    }}
                >
                    {trigger}
                </button>
            ) : (
                <span
                    className="ui-dropdown__anchor"
                    {...triggerProps}
                    onClick={(event) => {
                        triggerElementRef.current = event.target.closest('button, a, [tabindex]') ?? event.currentTarget
                        updatePosition()
                        setOpenState(!isOpen)
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            updatePosition()
                            setOpenState(true)
                        }
                    }}
                >
                    {trigger}
                </span>
            )}

            {isOpen ? (
                createPortal(
                    <div
                        ref={contentRef}
                        id={`${instanceId}-content`}
                        className={cn(
                            'ui-dropdown__content',
                            `ui-dropdown__content--${side}`,
                            `ui-dropdown__content--${align}`,
                            contentClassName,
                        )}
                        role="menu"
                        aria-orientation="vertical"
                        style={{
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'ArrowDown') {
                                event.preventDefault()
                                focusItem(1)
                            }

                            if (event.key === 'ArrowUp') {
                                event.preventDefault()
                                focusItem(-1)
                            }

                            if (event.key === 'Home') {
                                event.preventDefault()
                                focusItem(1, actionableItems[0]?.value)
                            }

                            if (event.key === 'End') {
                                event.preventDefault()
                                focusItem(-1, actionableItems[actionableItems.length - 1]?.value)
                            }
                        }}
                    >
                        {items.map((item, index) => {
                            if (item.type === 'separator') {
                                return <div key={`${instanceId}-separator-${index}`} className="ui-dropdown__separator" role="separator" />
                            }

                            return (
                                <button
                                    key={item.value}
                                    type="button"
                                    role="menuitem"
                                    data-value={item.value}
                                    className={cn('ui-dropdown__item', item.danger && 'is-danger')}
                                    disabled={item.disabled}
                                    onClick={() => {
                                        item.onSelect?.(item.value)
                                        setOpenState(false)
                                    }}
                                >
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>,
                    document.body,
                )
            ) : null}
        </div>
    )
}
