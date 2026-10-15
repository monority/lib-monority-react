import {
    cloneElement,
    createContext,
    isValidElement,
    useCallback,
    useContext,
    useId,
    useState,
} from 'react'
import { cn } from '@/lib/cn'
import type {
    TooltipContentProps,
    TooltipProps,
    TooltipSide,
    TooltipTriggerProps,
} from './Tooltip.types'

interface TooltipContextValue {
    id: string
    side: TooltipSide
    arrow: boolean
    dismissed: boolean
}

const TooltipContext = createContext<TooltipContextValue | null>(null)

export function TooltipTrigger({
    ref,
    children,
    className,
    asChild: _asChild,
    ...props
}: TooltipTriggerProps) {
    const ctx = useContext(TooltipContext)
    const id = ctx?.id

    if (isValidElement(children)) {
        return cloneElement(children, {
            ref,
            'aria-describedby': id,
            ...props,
        } as Record<string, unknown>)
    }

    return (
        <span
            ref={ref as React.Ref<HTMLSpanElement>}
            aria-describedby={id}
            className={className}
            {...props}
        >
            {children}
        </span>
    )
}

export function TooltipContent({ ref, children, className, ...props }: TooltipContentProps) {
    const ctx = useContext(TooltipContext)
    const id = ctx?.id

    return (
        <div
            ref={ref}
            id={id}
            role="tooltip"
            className={cn('mr-tooltip__content', className)}
            {...props}
        >
            {children}
        </div>
    )
}

/**
 * Lightweight tooltip primitive.
 *
 * Visibility is CSS-driven (hover + focus-within) so the component stays
 * render-light; the only JS state is the Escape dismissal described by the
 * WAI-ARIA Authoring Practices. `data-hidden` overrides the CSS open state
 * until the pointer leaves or focus moves, so Escape sticks while hovering.
 */
export function Tooltip({
    ref,
    content,
    children,
    side = 'top',
    arrow = false,
    delayMs = 0,
    className,
    style,
    ...props
}: TooltipProps) {
    const generatedId = useId()
    const [dismissed, setDismissed] = useState(false)

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            setDismissed(true)
        }
    }, [])

    const clearDismissal = useCallback(() => {
        setDismissed(false)
    }, [])

    const tooltipStyle =
        delayMs > 0
            ? ({
                  ...style,
                  '--mr-tooltip-delay': `${delayMs}ms`,
              } as React.CSSProperties)
            : style

    const contextValue: TooltipContextValue = {
        id: generatedId,
        side,
        arrow,
        dismissed,
    }

    return (
        <TooltipContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cn('mr-tooltip', className)}
                data-side={side}
                data-arrow={arrow ? true : undefined}
                data-hidden={dismissed ? true : undefined}
                style={tooltipStyle}
                onKeyDown={handleKeyDown}
                onMouseLeave={clearDismissal}
                onFocusCapture={clearDismissal}
                {...props}
            >
                {content !== undefined ? (
                    <>
                        {isValidElement(children)
                            ? cloneElement(children, { 'aria-describedby': generatedId } as Record<
                                  string,
                                  unknown
                              >)
                            : children}
                        <div className="mr-tooltip__content" id={generatedId} role="tooltip">
                            {content}
                        </div>
                    </>
                ) : (
                    children
                )}
            </div>
        </TooltipContext.Provider>
    )
}

Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent

export type {
    TooltipProps,
    TooltipTriggerProps,
    TooltipContentProps,
    TooltipSide,
} from './Tooltip.types'
