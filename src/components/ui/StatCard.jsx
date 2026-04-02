import { cn } from '@/lib/cn'
import { Card } from './Card'
import { Text } from './Text'
import { Title } from './Title'

const trendClassName = {
    neutral: 'ui-stat-card__trend--neutral',
    positive: 'ui-stat-card__trend--positive',
    warning: 'ui-stat-card__trend--warning',
    danger: 'ui-stat-card__trend--danger',
}

export function StatCard({
    label,
    value,
    trend,
    trendTone = 'neutral',
    description,
    icon,
    footer,
    className,
}) {
    return (
        <Card padding="md" className={cn('ui-stat-card', className)}>
            <div className="ui-stat-card__header">
                <div className="stack-s">
                    <Text as="span" tone="muted" size="sm">
                        {label}
                    </Text>
                    <Title as="h3" size="lg" className="ui-stat-card__value">
                        {value}
                    </Title>
                </div>
                {icon ? <div className="ui-stat-card__icon" aria-hidden="true">{icon}</div> : null}
            </div>
            {trend || description ? (
                <div className="ui-stat-card__meta">
                    {trend ? (
                        <span className={cn('ui-stat-card__trend', trendClassName[trendTone])}>
                            {trend}
                        </span>
                    ) : null}
                    {description ? (
                        <Text tone="base" size="sm">
                            {description}
                        </Text>
                    ) : null}
                </div>
            ) : null}
            {footer ? <div className="ui-stat-card__footer">{footer}</div> : null}
        </Card>
    )
}
