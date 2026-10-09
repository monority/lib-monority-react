import { useCallback, useId, useState } from 'react'
import { cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/cn'
import type { TooltipProps } from './Tooltip.types'

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

    return (
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
            {isValidElement(children)
                ? cloneElement(children, { 'aria-describedby': generatedId } as Record<
                      string,
                      unknown
                  >)
                : children}
            <div className="mr-tooltip__content" id={generatedId} role="tooltip">
                {content}
            </div>
        </div>
    )
}

export type { TooltipProps } from './Tooltip.types'
