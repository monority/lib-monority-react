import { cn } from '@/lib/cn'
import { Text } from './Text'
import { Title } from './Title'

const toneClassName = {
    info: 'ui-banner--info',
    success: 'ui-banner--success',
    warning: 'ui-banner--warning',
    danger: 'ui-banner--danger',
}

export function Banner({
    tone = 'info',
    eyebrow,
    title,
    description,
    actions,
    className,
}) {
    return (
        <section className={cn('ui-banner', toneClassName[tone], className)}>
            <div className="ui-banner__content">
                {eyebrow ? (
                    <Text as="span" tone="strong" size="sm" className="ui-banner__eyebrow">
                        {eyebrow}
                    </Text>
                ) : null}
                {title ? (
                    <Title as="h3" size="md" className="ui-banner__title">
                        {title}
                    </Title>
                ) : null}
                {description ? (
                    <Text tone="base" className="ui-banner__description">
                        {description}
                    </Text>
                ) : null}
            </div>
            {actions ? <div className="ui-banner__actions">{actions}</div> : null}
        </section>
    )
}
