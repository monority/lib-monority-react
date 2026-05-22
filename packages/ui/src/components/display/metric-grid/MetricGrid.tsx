import { cn } from '@/lib/cn'
import { StatCard } from '@/components/display/stat-card/StatCard'

interface MetricGridItem { key?: string; label: React.ReactNode; value: React.ReactNode; trend?: React.ReactNode; trendTone?: 'neutral' | 'positive' | 'warning' | 'danger'; description?: React.ReactNode; icon?: React.ReactNode; footer?: React.ReactNode }
interface MetricGridProps { items?: MetricGridItem[]; className?: string }

export function MetricGrid({ items = [], className }: MetricGridProps) {
  return <div className={cn('ui-metric-grid', className)}>{items.map((item, index) => <StatCard key={item.key ?? (typeof item.label === 'string' ? item.label : String(index))} label={item.label} value={item.value} trend={item.trend} trendTone={item.trendTone} description={item.description} icon={item.icon} footer={item.footer} />)}</div>
}
