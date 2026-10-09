import { cn } from '@/lib/cn'
import type { FilterBarProps } from './FilterBar.types'

export function FilterBar({ ref, className, children, ...props }: FilterBarProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-filter-bar', className)}
            role="group"
            aria-label="Filters"
            {...props}
        >
            {children}
        </div>
    )
}

export type { FilterBarProps } from './FilterBar.types'
