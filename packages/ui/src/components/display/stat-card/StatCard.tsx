import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Card } from '@/components/display/card/Card'
import { Text } from '@/components/typography/text/Text'
import { Title } from '@/components/typography/title/Title'
import type { StatCardProps } from './StatCard.types'

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  function StatCard(
    {
      label,
      value,
      trend,
      trendTone,
      description,
      icon,
      footer,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <Card
        ref={ref}
        className={cn('mr-stat-card', className)}
        padding="md"
        {...props}
      >
        <div className="mr-stat-card__header">
          <div className="mr-stat-card__info">
            <Text tone="muted" size="sm">{label}</Text>
            <Title as="span" size="lg">{value}</Title>
          </div>
          {icon ? (
            <div className="mr-stat-card__icon" aria-hidden="true">
              {icon}
            </div>
          ) : null}
        </div>
        {trend ? (
          <div className="mr-stat-card__trend" data-trend-tone={trendTone}>
            <Text
              tone={trendTone === 'danger' ? 'strong' : 'base'}
              size="sm"
            >
              {trend}
            </Text>
          </div>
        ) : null}
        {description ? (
          <Text tone="muted" size="sm">{description}</Text>
        ) : null}
        {footer ? (
          <div className="mr-stat-card__footer">{footer}</div>
        ) : null}
      </Card>
    )
  },
)

export type { StatCardProps, StatCardTone } from './StatCard.types'
