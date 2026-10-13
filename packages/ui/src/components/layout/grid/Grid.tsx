import { cn } from '@/lib/cn'
import type { GridProps } from './Grid.types'

export function Grid({ ref, columns = 2, gap, className, children, ...props }: GridProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-grid', className)}
            data-columns={columns}
            data-gap={gap}
            {...props}
        >
            {children}
        </div>
    )
}

export type { GridProps, GridColumns, GridGap } from './Grid.types'
