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
    useRef,
    useState,
} from 'react'
import type { MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import type {
    PopoverAlign,
    PopoverAnchorProps,
    PopoverContentProps,
    PopoverProps,
    PopoverSide,
    PopoverTriggerProps,
} from './Popover.types'

interface PopoverContextValue {
    isOpen: boolean
    isMounted: boolean
    presenceProps: { 'data-state': 'open' | 'closed'; 'data-closing'?: '' }
    setOpenState: (open: boolean) => void
    triggerElementRef: MutableRefObject<Element | null>
    contentRef: MutableRefObject<HTMLDivElement | null>
    rootRef: MutableRefObject<HTMLDivElement | null>
    instanceId: string
    actualSide: PopoverSide
    actualAlign: PopoverAlign
    updatePosition: () => void
    position: { top: number; left: number }
    positioned: boolean
    portalTarget: HTMLElement | null
    contentClassName?: string
    presenceRef: (node: HTMLElement | null) => void
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

export function PopoverTrigger({
    ref,
    children,
    className,
    asChild,
    onClick,
    ...props
}: PopoverTriggerProps) {
    const ctx = useContext(PopoverContext)
    const isOpen = ctx?.isOpen ?? false
    const instanceId = ctx?.instanceId ?? ''

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        onClick?.(e)
        if (ctx) {
            ctx.triggerElementRef.current = e.currentTarget
            ctx.setOpenState(!isOpen)
        }
    }

    if (asChild || (asChild !== false && isValidElement(children))) {
        const child = children as React.ReactElement<Record<string, unknown>>
        const childProps = child.props as Record<string, unknown>
        const childRef =
            (child.props as { ref?: React.Ref<HTMLElement> })?.ref ??
            (child as unknown as { ref?: React.Ref<HTMLElement> }).ref

        return cloneElement(child, {
            ref: (node: HTMLElement | null) => {
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as MutableRefObject<HTMLElement | null>).current = node

                if (ctx) ctx.triggerElementRef.current = node

                if (typeof childRef === 'function') childRef(node)
                else if (childRef && typeof childRef === 'object' && 'current' in childRef) {
                    ;(childRef as MutableRefObject<HTMLElement | null>).current = node
                }
            },
            className: cn(childProps.className as string | undefined, className),
            'aria-expanded': isOpen,
            'aria-controls': `${instanceId}-content`,
            'data-mr-popover-trigger': 'true',
            onClick: (e: React.MouseEvent<HTMLElement>) => {
                if (typeof childProps.onClick === 'function') {
                    ;(childProps.onClick as React.MouseEventHandler<HTMLElement>)(e)
                }
                handleClick(e)
            },
            ...props,
        } as Record<string, unknown>)
    }

    return (
        <button
            ref={(node) => {
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as MutableRefObject<HTMLButtonElement | null>).current = node
                if (ctx) ctx.triggerElementRef.current = node
            }}
            type="button"
            className={cn('mr-popover__trigger', className)}
            aria-expanded={isOpen}
            aria-controls={`${instanceId}-content`}
            data-mr-popover-trigger="true"
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

export function PopoverAnchor({ ref, children, className, ...props }: PopoverAnchorProps) {
    const ctx = useContext(PopoverContext)
    return (
        <span
            ref={(node) => {
                if (typeof ref === 'function') {
                    ;(ref as (instance: HTMLElement | null) => void)(node)
                } else if (ref) {
                    ;(ref as MutableRefObject<HTMLElement | null>).current = node
                }
                if (ctx) ctx.triggerElementRef.current = node
            }}
            className={cn('mr-popover__anchor', className)}
            data-mr-popover-trigger="true"
            {...props}
        >
            {children}
        </span>
    )
}

export function PopoverContent({ ref, children, className, ...props }: PopoverContentProps) {
    const ctx = useContext(PopoverContext)
    if (!ctx || !ctx.isMounted || !ctx.portalTarget) return null

    return createPortal(
        <div
            ref={(node) => {
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node
                ctx.contentRef.current = node
                ctx.presenceRef(node)
            }}
            id={`${ctx.instanceId}-content`}
            className={cn('mr-popover__content', ctx.contentClassName, className)}
            role="dialog"
            aria-modal="false"
            tabIndex={-1}
            data-side={ctx.actualSide}
            data-align={ctx.actualAlign}
            data-state={ctx.presenceProps['data-state']}
            data-closing={ctx.presenceProps['data-closing']}
            data-positioned={ctx.positioned ? '' : undefined}
            style={{
                top: `${ctx.position.top}px`,
                left: `${ctx.position.left}px`,
                visibility: ctx.positioned ? undefined : 'hidden',
            }}
            {...props}
        >
            {children}
        </div>,
        ctx.portalTarget
    )
}

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
                setOpenState(false)
                const focusableTrigger = rootRef.current?.querySelector<HTMLElement>(
                    '[data-mr-popover-trigger="true"] button, [data-mr-popover-trigger="true"] a, [data-mr-popover-trigger="true"] [tabindex], button[data-mr-popover-trigger="true"]'
                )
                focusableTrigger?.focus()
            }
        }

        document.addEventListener('mousedown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, setOpenState])

    useEffect(() => {
        if (isOpen) contentRef.current?.focus()
    }, [isOpen])

    const contextValue: PopoverContextValue = {
        isOpen,
        isMounted,
        presenceProps,
        setOpenState,
        triggerElementRef,
        contentRef,
        rootRef,
        instanceId,
        actualSide,
        actualAlign,
        updatePosition,
        position,
        positioned,
        portalTarget,
        contentClassName,
        presenceRef,
    }

    return (
        <PopoverContext.Provider value={contextValue}>
            <div
                ref={(node) => {
                    if (typeof ref === 'function') ref(node)
                    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node
                    rootRef.current = node
                }}
                className={cn('mr-popover', className)}
                data-open={isOpen ? true : undefined}
                data-align={align}
                data-side={side}
                {...props}
            >
                {trigger !== undefined ? (
                    <>
                        {typeof trigger === 'string' ? (
                            <PopoverTrigger>{trigger}</PopoverTrigger>
                        ) : isValidElement(trigger) ? (
                            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                        ) : (
                            <PopoverAnchor>{trigger}</PopoverAnchor>
                        )}
                        <PopoverContent>{children}</PopoverContent>
                    </>
                ) : (
                    children
                )}
            </div>
        </PopoverContext.Provider>
    )
}

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent
Popover.Anchor = PopoverAnchor

export type {
    PopoverProps,
    PopoverTriggerProps,
    PopoverContentProps,
    PopoverAnchorProps,
    PopoverAlign,
    PopoverSide,
} from './Popover.types'
