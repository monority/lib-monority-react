import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { GridProps } from './Grid.types'

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
    { columns = 2, className, children, ...props },
    ref
) {
    return (
        <div ref={ref} className={cn('mr-grid', className)} data-columns={columns} {...props}>
            {children}
        </div>
    )
})

export type { GridProps, GridColumns } from './Grid.types'
