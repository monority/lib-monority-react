import { cn } from '@/lib/cn'

const toneClassName = {
    neutral: 'ui-callout--neutral',
    info: 'ui-callout--info',
    success: 'ui-callout--success',
    warning: 'ui-callout--warning',
    danger: 'ui-callout--danger',
}

export function Callout({ title, description, tone = 'neutral', className, children }) {
    return (
        <div className={cn('ui-callout', toneClassName[tone], className)} role="note">
            {title ? <strong className="ui-callout__title">{title}</strong> : null}
            {description ? <p className="ui-callout__description">{description}</p> : null}
            {children}
        </div>
    )
}
