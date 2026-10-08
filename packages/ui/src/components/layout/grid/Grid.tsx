import { cn } from '@/lib/cn'
import type { GridProps } from './Grid.types'

export function Grid({ ref, columns = 2, className, children, ...props }: GridProps) {
    return (
        <div ref={ref} className={cn('mr-grid', className)} data-columns={columns} {...props}>
            {children}
        </div>
    )
}

export type { GridProps, GridColumns } from './Grid.types'
