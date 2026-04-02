import { cn } from '@/lib/cn'
import { Button } from './Button'

const toneClassName = {
    info: 'ui-inline-alert--info',
    success: 'ui-inline-alert--success',
    warning: 'ui-inline-alert--warning',
    danger: 'ui-inline-alert--danger',
}

const roleByTone = {
    info: 'status',
    success: 'status',
    warning: 'alert',
    danger: 'alert',
}

export function InlineAlert({
    tone = 'info',
    title,
    description,
    actionLabel,
    onAction,
    className,
}) {
    return (
        <div className={cn('ui-inline-alert', toneClassName[tone], className)} role={roleByTone[tone]}>
            <div className="ui-inline-alert__marker" aria-hidden="true" />
            <div className="ui-inline-alert__body">
                {title ? <strong className="ui-inline-alert__title">{title}</strong> : null}
                {description ? <p className="ui-inline-alert__description">{description}</p> : null}
            </div>
            {actionLabel ? (
                <Button size="sm" variant="ghost" onClick={onAction} className="ui-inline-alert__action">
                    {actionLabel}
                </Button>
            ) : null}
        </div>
    )
}
