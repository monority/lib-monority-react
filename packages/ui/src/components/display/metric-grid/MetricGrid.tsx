import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { StatCard } from '@/components/display/stat-card/StatCard'
import type { MetricGridProps } from './MetricGrid.types'

export const MetricGrid = forwardRef<HTMLDivElement, MetricGridProps>(
  function MetricGrid({ items = [], className, ...props }, ref) {
    return (
      <div ref={ref} className={cn('mr-metric-grid', className)} {...props}>
        {items.map(({ key, ...cardProps }) => (
          <StatCard key={key} {...cardProps} />
        ))}
      </div>
    )
  },
)

export type { MetricGridProps, MetricGridItem } from './MetricGrid.types'
