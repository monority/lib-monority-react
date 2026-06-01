import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { usePortalTarget } from '@/internal/use-portal-target'
import { cva } from '@/lib/variants'
import type { HoverCardProps } from './HoverCard.types'

const hoverCardVariants = cva({
  base: 'mr-hovercard',
  variants: {
    align: {
      start: 'mr-hovercard--align-start',
      center: 'mr-hovercard--align-center',
      end: 'mr-hovercard--align-end',
    },
    side: {
      top: 'mr-hovercard--side-top',
      bottom: 'mr-hovercard--side-bottom',
      left: 'mr-hovercard--side-left',
      right: 'mr-hovercard--side-right',
    },
  },
  defaultVariants: { align: 'center', side: 'bottom' },
})

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  function HoverCard(
    {
      children,
      content,
      openDelay = 300,
      closeDelay = 150,
      side = 'bottom',
      align = 'center',
      sideOffset = 8,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      arrow = true,
      className,
      contentClassName,
      ...props
    },
    ref,
  ) {
    const instanceId = useId()
    const rootRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLSpanElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

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
      [isControlled, onOpenChange],
    )

    const recalcPosition = useCallback(() => {
      const triggerEl = triggerRef.current
      if (!triggerEl) return
      const rect = triggerEl.getBoundingClientRect()
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft

      let top = 0
      let left = 0

      if (side === 'top') {
        top = rect.top + scrollTop - sideOffset
        left = rect.left + scrollLeft + rect.width / 2
      } else if (side === 'bottom') {
        top = rect.bottom + scrollTop + sideOffset
        left = rect.left + scrollLeft + rect.width / 2
      } else if (side === 'left') {
        top = rect.top + scrollTop + rect.height / 2
        left = rect.left + scrollLeft - sideOffset
      } else {
        top = rect.top + scrollTop + rect.height / 2
        left = rect.right + scrollLeft + sideOffset
      }

      if (align === 'start') {
        if (side === 'top' || side === 'bottom') left = rect.left + scrollLeft
        else top = rect.top + scrollTop
      } else if (align === 'end') {
        if (side === 'top' || side === 'bottom') left = rect.right + scrollLeft
        else top = rect.bottom + scrollTop
      }

      setPosition({ top, left })
    }, [side, align, sideOffset])

    const handleMouseEnter = useCallback(() => {
      clearTimeout(timeoutRef.current)
      recalcPosition()
      timeoutRef.current = setTimeout(() => setOpenState(true), openDelay)
    }, [openDelay, recalcPosition, setOpenState])

    const handleMouseLeave = useCallback(() => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setOpenState(false), closeDelay)
    }, [closeDelay, setOpenState])

    useEffect(() => {
      return () => clearTimeout(timeoutRef.current)
    }, [])

    useEffect(() => {
      if (isOpen) {
        const frameId = window.requestAnimationFrame(recalcPosition)
        function onScroll() { recalcPosition() }
        function onResize() { recalcPosition() }
        window.addEventListener('scroll', onScroll, true)
        window.addEventListener('resize', onResize)
        return () => {
          window.cancelAnimationFrame(frameId)
          window.removeEventListener('scroll', onScroll, true)
          window.removeEventListener('resize', onResize)
        }
      }
    }, [isOpen, recalcPosition])

    return (
      <div
        ref={ref}
        className={cn(hoverCardVariants({ align, side }), className)}
        data-open={isOpen ? true : undefined}
        data-align={align}
        data-side={side}
        {...props}
      >
        <span
          ref={triggerRef}
          className="mr-hovercard__trigger"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'inline-flex' }}
        >
          {children}
        </span>
        {isOpen && portalTarget
          ? createPortal(
              <div
                ref={contentRef}
                id={`${instanceId}-content`}
                className={cn(
                  'mr-hovercard__content',
                  `mr-hovercard__content--${side}`,
                  `mr-hovercard__content--${align}`,
                  contentClassName,
                )}
                role="dialog"
                aria-modal="false"
                style={{
                  position: 'absolute',
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {arrow && <div className="mr-hovercard__arrow" />}
                {content}
              </div>,
              portalTarget,
            )
          : null}
      </div>
    )
  },
)

export type { HoverCardProps } from './HoverCard.types'
