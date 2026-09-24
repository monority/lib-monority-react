import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Card } from '@/components/display/card/Card'
import { Text } from '@/components/typography/text/Text'
import { Title } from '@/components/typography/title/Title'
import type { StatCardProps } from './StatCard.types'

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
    { label, value, trend, trendTone, description, icon, footer, className, ...props },
    ref
) {
    const resolvedTrendTone = trendTone ?? 'neutral'

    return (
        <Card ref={ref} className={cn('mr-stat-card', className)} padding="md" {...props}>
            <div className="mr-stat-card__header">
                <Text as="span" className="mr-stat-card__label" tone="muted" size="sm">
                    {label}
                </Text>
                <div className="mr-stat-card__header-end">
                    {trend != null ? (
                        <div className="mr-stat-card__trend" data-trend-tone={resolvedTrendTone}>
                            <span className="mr-stat-card__trend-marker" aria-hidden="true" />
                            <Text as="span" tone="base" size="sm">
                                {trend}
                            </Text>
                        </div>
                    ) : null}
                    {icon != null ? (
                        <div className="mr-stat-card__icon" aria-hidden="true">
                            {icon}
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="mr-stat-card__metric">
                <Title as="span" className="mr-stat-card__value" size="lg">
                    {value}
                </Title>
            </div>

            {description != null ? (
                <Text className="mr-stat-card__description" tone="muted" size="sm">
                    {description}
                </Text>
            ) : null}
            {footer != null ? <div className="mr-stat-card__footer">{footer}</div> : null}
        </Card>
    )
})

export type { StatCardProps, StatCardTone } from './StatCard.types'
