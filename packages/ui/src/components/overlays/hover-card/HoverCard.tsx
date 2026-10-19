import { usePortalTarget } from '@/internal/use-portal-target'
import { usePresence } from '@/internal/use-presence'
import { cn } from '@/lib/cn'
import { OVERLAY_ARROW_PADDING, OVERLAY_OFFSET, OVERLAY_VIEWPORT_GUTTER } from '@/lib/constants'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import type {
    HoverCardAlign,
    HoverCardContentProps,
    HoverCardProps,
    HoverCardSide,
    HoverCardTriggerProps,
} from './HoverCard.types'

interface FloatingPosition {
    top: number
    left: number
    side: HoverCardSide
    arrowLeft?: number
    arrowTop?: number
}

const VIEWPORT_PADDING = OVERLAY_VIEWPORT_GUTTER
const ARROW_PADDING = OVERLAY_ARROW_PADDING

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
    contentSize: number
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
    content: DOMRect
): FloatingPosition {
    const side = getFallbackSide(preferredSide, trigger, content, sideOffset)
    const maxLeft = window.innerWidth - content.width - VIEWPORT_PADDING
    const maxTop = window.innerHeight - content.height - VIEWPORT_PADDING

    if (side === 'top' || side === 'bottom') {
        const rawLeft = getAlignedOffset(align, trigger.left, trigger.width, content.width)
        const left = clamp(rawLeft, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxLeft))
        const top =
            side === 'top' ? trigger.top - content.height - sideOffset : trigger.bottom + sideOffset

        return {
            top: clamp(top, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxTop)),
            left,
            side,
            arrowLeft: clamp(
                trigger.left + trigger.width / 2 - left,
                ARROW_PADDING,
                Math.max(ARROW_PADDING, content.width - ARROW_PADDING)
            ),
        }
    }

    const rawTop = getAlignedOffset(align, trigger.top, trigger.height, content.height)
    const top = clamp(rawTop, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxTop))
    const left =
        side === 'left' ? trigger.left - content.width - sideOffset : trigger.right + sideOffset

    return {
        top,
        left: clamp(left, VIEWPORT_PADDING, Math.max(VIEWPORT_PADDING, maxLeft)),
        side,
        arrowTop: clamp(
            trigger.top + trigger.height / 2 - top,
            ARROW_PADDING,
            Math.max(ARROW_PADDING, content.height - ARROW_PADDING)
        ),
    }
}

interface HoverCardContextValue {
    isOpen: boolean
    isMounted: boolean
    presenceProps: { 'data-state': 'open' | 'closed'; 'data-closing'?: '' }
    setOpenState: (open: boolean) => void
    triggerRef: React.MutableRefObject<HTMLSpanElement | null>
    contentRef: React.MutableRefObject<HTMLDivElement | null>
    instanceId: string
    position: FloatingPosition
    arrow: boolean
    contentClassName?: string
    portalTarget: HTMLElement | null
    handleMouseEnter: () => void
    handleMouseLeave: () => void
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null)

export function HoverCardTrigger({
    ref,
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    ...props
}: HoverCardTriggerProps) {
    const ctx = useContext(HoverCardContext)

    return (
        <span
            ref={(node) => {
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node
                if (ctx)
                    (ctx.triggerRef as React.MutableRefObject<HTMLSpanElement | null>).current =
                        node
            }}
            className={cn('mr-hovercard__trigger', className)}
            onMouseEnter={(e) => {
                onMouseEnter?.(e)
                ctx?.handleMouseEnter()
            }}
            onMouseLeave={(e) => {
                onMouseLeave?.(e)
                ctx?.handleMouseLeave()
            }}
            {...props}
        >
            {children}
        </span>
    )
}

export function HoverCardContent({
    ref,
    children,
    className,
    arrow: explicitArrow,
    onMouseEnter,
    onMouseLeave,
    style,
    ...props
}: HoverCardContentProps) {
    const ctx = useContext(HoverCardContext)
    if (!ctx || !ctx.isMounted || !ctx.portalTarget) return null

    const showArrow = explicitArrow !== undefined ? explicitArrow : ctx.arrow
    const { position, instanceId } = ctx

    return createPortal(
        <div
            ref={(node) => {
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
                ;(ctx.contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            }}
            id={`${instanceId}-content`}
            className={cn('mr-hovercard__content', ctx.contentClassName, className)}
            role="dialog"
            aria-modal="false"
            data-side={position.side}
            data-closing={ctx.presenceProps['data-closing']}
            style={
                {
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    '--mr-hovercard-arrow-left': position.arrowLeft
                        ? `${position.arrowLeft}px`
                        : undefined,
                    '--mr-hovercard-arrow-top': position.arrowTop
                        ? `${position.arrowTop}px`
                        : undefined,
                    ...style,
                } as CSSProperties
            }
            onMouseEnter={(e) => {
                onMouseEnter?.(e)
                ctx.handleMouseEnter()
            }}
            onMouseLeave={(e) => {
                onMouseLeave?.(e)
                ctx.handleMouseLeave()
            }}
            {...props}
        >
            {showArrow && <div className="mr-hovercard__arrow" />}
            {children}
        </div>,
        ctx.portalTarget
    )
}

export function HoverCard({
    ref,
    children,
    content,
    openDelay = 300,
    closeDelay = 150,
    side = 'bottom',
    align = 'center',
    sideOffset = OVERLAY_OFFSET,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    arrow = true,
    className,
    contentClassName,
    ...props
}: HoverCardProps) {
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
    const { isMounted, presenceProps } = usePresence(isOpen, { durationMs: 150 })

    const setOpenState = useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) setInternalOpen(nextOpen)
            onOpenChange?.(nextOpen)
        },
        [isControlled, onOpenChange]
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
                contentEl.getBoundingClientRect()
            )
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

    const contextValue: HoverCardContextValue = {
        isOpen,
        isMounted,
        presenceProps,
        setOpenState,
        triggerRef,
        contentRef,
        instanceId,
        position,
        arrow,
        contentClassName,
        portalTarget,
        handleMouseEnter,
        handleMouseLeave,
    }

    return (
        <HoverCardContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cn('mr-hovercard', className)}
                data-open={isOpen ? true : undefined}
                data-align={align}
                data-side={side}
                {...props}
            >
                {content !== undefined ? (
                    <>
                        <HoverCardTrigger>{children}</HoverCardTrigger>
                        <HoverCardContent>{content}</HoverCardContent>
                    </>
                ) : (
                    children
                )}
            </div>
        </HoverCardContext.Provider>
    )
}

HoverCard.Trigger = HoverCardTrigger
HoverCard.Content = HoverCardContent

export type {
    HoverCardProps,
    HoverCardTriggerProps,
    HoverCardContentProps,
    HoverCardAlign,
    HoverCardSide,
} from './HoverCard.types'
