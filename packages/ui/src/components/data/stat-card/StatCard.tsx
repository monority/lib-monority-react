import { cn } from '@/lib/cn'
import { Card } from '@/components/display/card/Card'
import { Text } from '@/components/typography/text/Text'
import { Title } from '@/components/typography/title/Title'
import type {
    StatCardDescriptionProps,
    StatCardFooterProps,
    StatCardHeaderEndProps,
    StatCardHeaderProps,
    StatCardIconProps,
    StatCardLabelProps,
    StatCardMetricProps,
    StatCardProps,
    StatCardTone,
    StatCardTrendProps,
    StatCardValueProps,
} from './StatCard.types'

export function StatCardHeader({ ref, className, children, ...props }: StatCardHeaderProps) {
    return (
        <div ref={ref} className={cn('mr-stat-card__header', className)} {...props}>
            {children}
        </div>
    )
}

export function StatCardLabel({ ref, className, children, ...props }: StatCardLabelProps) {
    return (
        <Text
            as="span"
            ref={ref}
            className={cn('mr-stat-card__label', className)}
            tone="muted"
            size="sm"
            {...props}
        >
            {children}
        </Text>
    )
}

export function StatCardHeaderEnd({ ref, className, children, ...props }: StatCardHeaderEndProps) {
    return (
        <div ref={ref} className={cn('mr-stat-card__header-end', className)} {...props}>
            {children}
        </div>
    )
}

export function StatCardIcon({ ref, className, children, ...props }: StatCardIconProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-stat-card__icon', className)}
            aria-hidden="true"
            {...props}
        >
            {children}
        </div>
    )
}

export function StatCardTrend({
    ref,
    tone = 'neutral',
    className,
    children,
    ...props
}: StatCardTrendProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-stat-card__trend', className)}
            data-trend-tone={tone}
            {...props}
        >
            <span className="mr-stat-card__trend-marker" aria-hidden="true" />
            <Text as="span" tone="base" size="sm">
                {children}
            </Text>
        </div>
    )
}

export function StatCardMetric({ ref, className, children, ...props }: StatCardMetricProps) {
    return (
        <div ref={ref} className={cn('mr-stat-card__metric', className)} {...props}>
            {children}
        </div>
    )
}

export function StatCardValue({ ref, className, children, ...props }: StatCardValueProps) {
    return (
        <Title
            as="span"
            ref={ref}
            className={cn('mr-stat-card__value', className)}
            size="lg"
            {...props}
        >
            {children}
        </Title>
    )
}

export function StatCardDescription({
    ref,
    className,
    children,
    ...props
}: StatCardDescriptionProps) {
    return (
        <Text
            ref={ref}
            className={cn('mr-stat-card__description', className)}
            tone="muted"
            size="sm"
            {...props}
        >
            {children}
        </Text>
    )
}

export function StatCardFooter({ ref, className, children, ...props }: StatCardFooterProps) {
    return (
        <div ref={ref} className={cn('mr-stat-card__footer', className)} {...props}>
            {children}
        </div>
    )
}

export function StatCard({
    ref,
    label,
    value,
    trend,
    trendTone,
    description,
    icon,
    footer,
    children,
    className,
    ...props
}: StatCardProps) {
    const hasShorthand = label != null || value != null
    const resolvedTrendTone = trendTone ?? 'neutral'

    return (
        <Card ref={ref} className={cn('mr-stat-card', className)} padding="md" {...props}>
            {hasShorthand ? (
                <>
                    <StatCardHeader>
                        <StatCardLabel>{label}</StatCardLabel>
                        <StatCardHeaderEnd>
                            {icon != null ? <StatCardIcon>{icon}</StatCardIcon> : null}
                            {trend != null ? (
                                <StatCardTrend tone={resolvedTrendTone}>{trend}</StatCardTrend>
                            ) : null}
                        </StatCardHeaderEnd>
                    </StatCardHeader>

                    <StatCardMetric>
                        <StatCardValue>{value}</StatCardValue>
                    </StatCardMetric>

                    {description != null ? (
                        <StatCardDescription>{description}</StatCardDescription>
                    ) : null}
                    {footer != null ? <StatCardFooter>{footer}</StatCardFooter> : null}
                </>
            ) : null}
            {children}
        </Card>
    )
}

StatCard.Header = StatCardHeader
StatCard.Label = StatCardLabel
StatCard.HeaderEnd = StatCardHeaderEnd
StatCard.Icon = StatCardIcon
StatCard.Trend = StatCardTrend
StatCard.Metric = StatCardMetric
StatCard.Value = StatCardValue
StatCard.Description = StatCardDescription
StatCard.Footer = StatCardFooter

export type {
    StatCardProps,
    StatCardTone,
    StatCardHeaderProps,
    StatCardLabelProps,
    StatCardHeaderEndProps,
    StatCardIconProps,
    StatCardTrendProps,
    StatCardMetricProps,
    StatCardValueProps,
    StatCardDescriptionProps,
    StatCardFooterProps,
} from './StatCard.types'
