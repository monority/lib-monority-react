import { cn } from '@/lib/cn'
import type { ScrollAreaProps } from './ScrollArea.types'

export function ScrollArea({
    ref,
    orientation = 'vertical',
    hideScrollbar = false,
    children,
    className,
    style,
    ...props
}: ScrollAreaProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-scroll-area', hideScrollbar && 'mr-scroll-area--hide', className)}
            data-orientation={orientation}
            style={style}
            {...props}
        >
            {children}
        </div>
    )
}

export type { ScrollAreaProps } from './ScrollArea.types'
