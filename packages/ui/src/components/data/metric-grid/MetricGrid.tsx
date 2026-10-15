import { cn } from '@/lib/cn'
import { StatCard } from '@/components/data/stat-card/StatCard'
import type { MetricGridProps } from './MetricGrid.types'

export function MetricGrid({ ref, items, children, className, ...props }: MetricGridProps) {
    return (
        <div ref={ref} className={cn('mr-metric-grid', className)} {...props}>
            {items
                ? items.map(({ key, ...cardProps }) => <StatCard key={key} {...cardProps} />)
                : children}
        </div>
    )
}

export type { MetricGridProps, MetricGridItem } from './MetricGrid.types'
