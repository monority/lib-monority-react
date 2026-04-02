import { cn } from '@/lib/cn'
import { Text } from './Text'
import { Title } from './Title'

export function PageHeader({
    eyebrow,
    title,
    description,
    meta,
    actions,
    align = 'start',
    className,
    children,
}) {
    return (
        <header className={cn('ui-page-header', align === 'center' && 'ui-page-header--center', className)}>
            <div className="ui-page-header__main">
                {eyebrow ? (
                    <Text as="span" tone="strong" size="sm" className="ui-page-header__eyebrow">
                        {eyebrow}
                    </Text>
                ) : null}
                {title ? (
                    <Title as="h2" size="lg" className="ui-page-header__title">
                        {title}
                    </Title>
                ) : null}
                {description ? (
                    <Text tone="base" className="ui-page-header__description">
                        {description}
                    </Text>
                ) : null}
                {meta ? <div className="ui-page-header__meta">{meta}</div> : null}
                {children ? <div className="ui-page-header__content">{children}</div> : null}
            </div>
            {actions ? <div className="ui-page-header__actions">{actions}</div> : null}
        </header>
    )
}
