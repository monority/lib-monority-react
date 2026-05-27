import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { FilterBarProps } from './FilterBar.types'

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  function FilterBar({ className, children, ...props }, ref) {
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
  },
)

export type { FilterBarProps } from './FilterBar.types'
