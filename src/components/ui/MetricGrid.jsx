import { cn } from '@/lib/cn'
import { StatCard } from './StatCard'

export function MetricGrid({ items = [], className }) {
    return (
        <div className={cn('ui-metric-grid', className)}>
            {items.map((item, index) => (
                <StatCard
                    key={item.key ?? item.label ?? index}
                    label={item.label}
                    value={item.value}
                    trend={item.trend}
                    trendTone={item.trendTone}
                    description={item.description}
                    icon={item.icon}
                    footer={item.footer}
                />
            ))}
        </div>
    )
}
