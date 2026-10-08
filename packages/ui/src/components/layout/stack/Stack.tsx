import { cn } from '@/lib/cn'
import type { StackProps } from './Stack.types'

export function Stack({
    ref,
    gap = 'md',
    direction = 'vertical',
    align = 'stretch',
    justify = 'start',
    className,
    children,
    ...props
}: StackProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-stack', className)}
            data-gap={gap}
            data-direction={direction}
            data-align={align}
            data-justify={justify}
            {...props}
        >
            {children}
        </div>
    )
}

export type { StackProps, StackGap, StackDirection, StackAlign, StackJustify } from './Stack.types'
