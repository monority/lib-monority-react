import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { OVERLAY_OFFSET } from '@/lib/constants'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { PopoverProps } from './Popover.types'

export function Popover({
    ref,
    trigger,
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    align = 'center',
    side = 'bottom',
    className,
    contentClassName,
    ...props
}: PopoverProps) {
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
    const updatePosition = useCallback(() => {
        const el =
            triggerElementRef.current ??
            rootRef.current?.querySelector('[data-mr-popover-trigger="true"]')
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
                        '[data-mr-popover-trigger="true"] button, [data-mr-popover-trigger="true"] a, [data-mr-popover-trigger="true"] [tabindex]'
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
        if (isOpen) contentRef.current?.focus()
    }, [isOpen])

    return (
        <div
            ref={ref}
            className={cn('mr-popover', className)}
            data-open={isOpen ? true : undefined}
            data-align={align}
            data-side={side}
            {...props}
        >
            {typeof trigger === 'string' ? (
                <button
                    type="button"
                    className="mr-popover__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`${instanceId}-content`}
                    onClick={(e) => {
                        triggerElementRef.current = e.currentTarget
                        updatePosition()
                        setOpenState(!isOpen)
                    }}
                >
                    {trigger}
                </button>
            ) : (
                <span
                    className="mr-popover__anchor"
                    data-mr-popover-trigger="true"
                    aria-expanded={isOpen}
                    aria-controls={`${instanceId}-content`}
                    onClick={(e) => {
                        triggerElementRef.current =
                            (e.target as HTMLElement).closest('button, a, [tabindex]') ??
                            e.currentTarget
                        updatePosition()
                        setOpenState(!isOpen)
                    }}
                >
                    {trigger}
                </span>
            )}
            {isOpen && portalTarget
                ? createPortal(
                      <div
                          ref={contentRef}
                          id={`${instanceId}-content`}
                          className={cn('mr-popover__content', contentClassName)}
                          role="dialog"
                          aria-modal="false"
                          tabIndex={-1}
                          style={{
                              top: `${position.top}px`,
                              left: `${position.left}px`,
                              visibility: positioned ? undefined : 'hidden',
                          }}
                      >
                          {children}
                      </div>,
                      portalTarget
                  )
                : null}
        </div>
    )
}

export type { PopoverProps } from './Popover.types'
