import { useFloatingPosition } from '@/internal/use-floating-position'
import { usePortalTarget } from '@/internal/use-portal-target'
import { usePresence } from '@/internal/use-presence'
import { cn } from '@/lib/cn'
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
import type { CSSProperties, MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import type {
    HoverCardAlign,
    HoverCardContentProps,
    HoverCardProps,
    HoverCardSide,
    HoverCardTriggerProps,
} from './HoverCard.types'

interface HoverCardContextValue {
    isOpen: boolean
    isMounted: boolean
    presenceProps: { 'data-state': 'open' | 'closed'; 'data-closing'?: '' }
    setOpenState: (open: boolean) => void
    triggerRef: MutableRefObject<HTMLSpanElement | null>
    contentRef: MutableRefObject<HTMLDivElement | null>
    instanceId: string
    position: { top: number; left: number }
    actualSide: HoverCardSide
    actualAlign: HoverCardAlign
    arrowPosition: { left?: number; top?: number }
    positioned: boolean
    arrow: boolean
    contentClassName?: string
    portalTarget: HTMLElement | null
    presenceRef: (node: HTMLElement | null) => void
    updatePosition: () => void
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
                else if (ref) (ref as MutableRefObject<HTMLSpanElement | null>).current = node
                if (ctx) {
                    ctx.triggerRef.current = node
                }
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

    useLayoutEffect(() => {
        if (ctx) {
            ctx.updatePosition()
        }
    }, [ctx])

    if (!ctx || !ctx.isMounted || !ctx.portalTarget) return null

    const showArrow = explicitArrow !== undefined ? explicitArrow : ctx.arrow
    const { position, actualSide, actualAlign, arrowPosition, positioned, instanceId } = ctx

    return createPortal(
        <div
            ref={(node) => {
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node
                ctx.contentRef.current = node
                ctx.presenceRef(node)
            }}
            id={`${instanceId}-content`}
            className={cn('mr-hovercard__content', ctx.contentClassName, className)}
            role="dialog"
            aria-modal="false"
            data-side={actualSide}
            data-align={actualAlign}
            data-state={ctx.presenceProps['data-state']}
            data-closing={ctx.presenceProps['data-closing']}
            data-positioned={positioned ? '' : undefined}
            style={
                {
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    visibility: positioned ? undefined : 'hidden',
                    '--mr-hovercard-arrow-left': arrowPosition.left
                        ? `${arrowPosition.left}px`
                        : undefined,
                    '--mr-hovercard-arrow-top': arrowPosition.top
                        ? `${arrowPosition.top}px`
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
    sideOffset = 8,
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
    const isOpen = isControlled ? controlledOpen : internalOpen
    const portalTarget = usePortalTarget()
    const { isMounted, presenceProps, ref: presenceRef } = usePresence(isOpen, { durationMs: 200 })

    const { position, actualSide, actualAlign, arrowPosition, positioned, updatePosition } =
        useFloatingPosition(triggerRef, contentRef, {
            side,
            align,
            sideOffset,
            arrow,
            enabled: isMounted,
        })

    const setOpenState = useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) setInternalOpen(nextOpen)
            onOpenChange?.(nextOpen)
        },
        [isControlled, onOpenChange]
    )

    const handleMouseEnter = useCallback(() => {
        clearTimeout(timeoutRef.current)
        if (isOpen) return
        timeoutRef.current = setTimeout(() => setOpenState(true), openDelay)
    }, [isOpen, openDelay, setOpenState])

    const handleMouseLeave = useCallback(() => {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setOpenState(false), closeDelay)
    }, [closeDelay, setOpenState])

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current)
    }, [])

    const contextValue: HoverCardContextValue = {
        isOpen,
        isMounted,
        presenceProps,
        setOpenState,
        triggerRef,
        contentRef,
        instanceId,
        position,
        actualSide,
        actualAlign,
        arrowPosition,
        positioned,
        arrow,
        contentClassName,
        portalTarget,
        presenceRef,
        updatePosition,
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
