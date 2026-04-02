import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

export function Popover({
    trigger,
    children,
    open,
    defaultOpen = false,
    onOpenChange,
    align = 'start',
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

    const updatePosition = useCallback(() => {
        const triggerElement =
            triggerElementRef.current ??
            rootRef.current?.querySelector('[data-ui-popover-trigger="true"]')

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

    const triggerProps = {
        'data-ui-popover-trigger': 'true',
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
                    ?.querySelector('[data-ui-popover-trigger="true"] button, [data-ui-popover-trigger="true"] a, [data-ui-popover-trigger="true"] [tabindex]')
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
            contentRef.current?.focus()
        }
    }, [isOpen])

    return (
        <div
            ref={rootRef}
            className={cn(
                'ui-popover',
                `ui-popover--${side}`,
                `ui-popover--${align}`,
                className,
            )}
        >
            {typeof trigger === 'string' ? (
                <button
                    type="button"
                    className="ui-popover__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`${instanceId}-content`}
                    onClick={(event) => {
                        triggerElementRef.current = event.currentTarget
                        updatePosition()
                        setOpenState(!isOpen)
                    }}
                >
                    {trigger}
                </button>
            ) : (
                <span
                    className="ui-popover__anchor"
                    aria-expanded={isOpen}
                    aria-controls={`${instanceId}-content`}
                    {...triggerProps}
                    onClick={(event) => {
                        triggerElementRef.current = event.target.closest('button, a, [tabindex]') ?? event.currentTarget
                        updatePosition()
                        setOpenState(!isOpen)
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
                            'ui-popover__content',
                            `ui-popover__content--${side}`,
                            `ui-popover__content--${align}`,
                            contentClassName,
                        )}
                        role="dialog"
                        aria-modal="false"
                        tabIndex={-1}
                        style={{
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                        }}
                    >
                        {children}
                    </div>,
                    document.body,
                )
            ) : null}
        </div>
    )
}
