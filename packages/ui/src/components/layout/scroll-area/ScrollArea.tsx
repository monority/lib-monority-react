import { cn } from '@/lib/cn'
import type { ScrollAreaProps } from './ScrollArea.types'

export function ScrollArea({
    ref,
    orientation = 'vertical',
    hideScrollbar = false,
    tabIndex = 0,
    role = 'region',
    'aria-label': ariaLabel = 'Zone de défilement',
    children,
    className,
    style,
    ...props
}: ScrollAreaProps) {
    const finalAriaLabel = props['aria-labelledby'] ? undefined : ariaLabel

    return (
        <div
            ref={ref}
            className={cn('mr-scroll-area', hideScrollbar && 'mr-scroll-area--hide', className)}
            data-orientation={orientation}
            tabIndex={tabIndex}
            role={role}
            aria-label={finalAriaLabel}
            style={style}
            {...props}
        >
            {children}
        </div>
    )
}

export type { ScrollAreaProps } from './ScrollArea.types'
