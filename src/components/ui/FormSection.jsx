import { cn } from '@/lib/cn'
import { Card } from './Card'
import { Text } from './Text'
import { Title } from './Title'

export function FormSection({
    title,
    description,
    meta,
    actions,
    className,
    children,
}) {
    return (
        <Card padding="lg" className={cn('ui-form-section', className)}>
            <div className="ui-form-section__header">
                <div className="ui-form-section__heading">
                    {title ? (
                        <Title as="h3" size="sm">
                            {title}
                        </Title>
                    ) : null}
                    {description ? <Text tone="base">{description}</Text> : null}
                    {meta ? <div className="ui-form-section__meta">{meta}</div> : null}
                </div>
                {actions ? <div className="ui-form-section__actions">{actions}</div> : null}
            </div>
            <div className="ui-form-section__body">{children}</div>
        </Card>
    )
}
