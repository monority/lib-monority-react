import { forwardRef, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { HoverCardAlign, HoverCardProps, HoverCardSide } from './HoverCard.types'

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

interface FloatingPosition {
  top: number
  left: number
  side: HoverCardSide
  arrowLeft?: number
  arrowTop?: number
}

const VIEWPORT_PADDING = 12
const ARROW_PADDING = 12

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getFallbackSide(side: HoverCardSide, trigger: DOMRect, content: DOMRect, offset: number) {
  const space = {
    top: trigger.top - offset - VIEWPORT_PADDING,
    bottom: window.innerHeight - trigger.bottom - offset - VIEWPORT_PADDING,
    left: trigger.left - offset - VIEWPORT_PADDING,
    right: window.innerWidth - trigger.right - offset - VIEWPORT_PADDING,
  }

  if (side === 'bottom' && space.bottom < content.height && space.top > space.bottom) return 'top'
  if (side === 'top' && space.top < content.height && space.bottom > space.top) return 'bottom'
  if (side === 'right' && space.right < content.width && space.left > space.right) return 'left'
  if (side === 'left' && space.left < content.width && space.right > space.left) return 'right'
  return side
}

function getAlignedOffset(
  align: HoverCardAlign,
  start: number,
  triggerSize: number,
  contentSize: number,
) {
  if (align === 'start') return start
  if (align === 'end') return start + triggerSize - contentSize
  return start + triggerSize / 2 - contentSize / 2
}

function calculatePosition(
  preferredSide: HoverCardSide,
  align: HoverCardAlign,
  sideOffset: number,
  trigger: DOMRect,
  content: DOMRect,
): FloatingPosition {
  const side = getFallbackSide(preferredSide, trigger, content, sideOffset)
  const maxLeft = window.innerWidth - content.width - VIEWPORT_PADDING
  const maxTop = window.innerHeight - content.height - VIEWPORT_PADDING

  if (side === 'top' || side === 'bottom') {
    const rawLeft = getAlignedOffset(align, trigger.left, trigger.width, content.width)
    const left = clamp(rawLeft, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxLeft))
    const top =
      side === 'top'
        ? trigger.top - content.height - sideOffset
        : trigger.bottom + sideOffset

    return {
      top: clamp(top, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxTop)),
      left,
      side,
      arrowLeft: clamp(
        trigger.left + trigger.width / 2 - left,
        ARROW_PADDING,
        Math.max(ARROW_PADDING, content.width - ARROW_PADDING),
      ),
    }
  }

  const rawTop = getAlignedOffset(align, trigger.top, trigger.height, content.height)
  const top = clamp(rawTop, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxTop))
  const left =
    side === 'left'
      ? trigger.left - content.width - sideOffset
      : trigger.right + sideOffset

  return {
    top,
    left: clamp(left, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxLeft)),
    side,
    arrowTop: clamp(
      trigger.top + trigger.height / 2 - top,
      ARROW_PADDING,
      Math.max(ARROW_PADDING, content.height - ARROW_PADDING),
    ),
  }
}

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
    const triggerRef = useRef<HTMLSpanElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    const isControlled = controlledOpen !== undefined
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const [position, setPosition] = useState<FloatingPosition>({
      top: VIEWPORT_PADDING,
      left: VIEWPORT_PADDING,
      side,
    })
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
      const contentEl = contentRef.current
      if (!triggerEl || !contentEl) return

      setPosition(
        calculatePosition(
          side,
          align,
          sideOffset,
          triggerEl.getBoundingClientRect(),
          contentEl.getBoundingClientRect(),
        ),
      )
    }, [side, align, sideOffset])

    const handleMouseEnter = useCallback(() => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setOpenState(true), openDelay)
    }, [openDelay, setOpenState])

    const handleMouseLeave = useCallback(() => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setOpenState(false), closeDelay)
    }, [closeDelay, setOpenState])

    useEffect(() => {
      return () => clearTimeout(timeoutRef.current)
    }, [])

    useLayoutEffect(() => {
      if (!isOpen) return
      recalcPosition()
    }, [isOpen, recalcPosition, content])

    useEffect(() => {
      if (!isOpen) return
      function onScroll() {
        recalcPosition()
      }
      function onResize() {
        recalcPosition()
      }
      window.addEventListener('scroll', onScroll, true)
      window.addEventListener('resize', onResize)
      return () => {
        window.removeEventListener('scroll', onScroll, true)
        window.removeEventListener('resize', onResize)
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
                  `mr-hovercard__content--${position.side}`,
                  `mr-hovercard__content--${align}`,
                  contentClassName,
                )}
                role="dialog"
                aria-modal="false"
                data-side={position.side}
                style={{
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                  '--mr-hovercard-arrow-left': position.arrowLeft
                    ? `${position.arrowLeft}px`
                    : undefined,
                  '--mr-hovercard-arrow-top': position.arrowTop
                    ? `${position.arrowTop}px`
                    : undefined,
                } as CSSProperties}
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
