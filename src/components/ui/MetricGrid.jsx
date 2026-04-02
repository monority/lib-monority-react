import { cn } from '@/lib/cn'
import { Grid } from './Grid'
import { StatCard } from './StatCard'

export function MetricGrid({ items = [], className }) {
    return (
        <Grid cols={items.length >= 3 ? 3 : 2} gap="md" className={cn('ui-metric-grid', className)}>
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
        </Grid>
    )
}
