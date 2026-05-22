import { cn } from '@/lib/cn'
import { Card } from '@/components/display/card/Card'
import { Text } from '@/components/typography/text/Text'
import { Title } from '@/components/typography/title/Title'

type TrendTone = 'neutral' | 'positive' | 'warning' | 'danger'
const tCN: Record<TrendTone, string> = { neutral: 'ui-stat-card__trend--neutral', positive: 'ui-stat-card__trend--positive', warning: 'ui-stat-card__trend--warning', danger: 'ui-stat-card__trend--danger' }
interface StatCardProps { label: React.ReactNode; value: React.ReactNode; trend?: React.ReactNode; trendTone?: TrendTone; description?: React.ReactNode; icon?: React.ReactNode; footer?: React.ReactNode; className?: string }

export function StatCard({ label, value, trend, trendTone = 'neutral', description, icon, footer, className }: StatCardProps) {
  return <Card padding="md" className={cn('ui-stat-card', className)}>
    <div className="ui-stat-card__header"><div className="stack-s"><Text as="span" tone="muted" size="sm">{label}</Text><Title as="h3" size="lg" className="ui-stat-card__value">{value}</Title></div>{icon ? <div className="ui-stat-card__icon" aria-hidden="true">{icon}</div> : null}</div>
    {trend || description ? <div className="ui-stat-card__meta">{trend ? <span className={cn('ui-stat-card__trend', tCN[trendTone])}>{trend}</span> : null}{description ? <Text tone="base" size="sm">{description}</Text> : null}</div> : null}
    {footer ? <div className="ui-stat-card__footer">{footer}</div> : null}
  </Card>
}
