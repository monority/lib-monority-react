import { cn } from '@/lib/cn'

const toneClassName = {
    neutral: 'ui-toast--neutral',
    success: 'ui-toast--success',
    danger: 'ui-toast--danger',
}

export function Toast({ title, description, tone = 'neutral', className }) {
    return (
        <div className={cn('ui-toast', toneClassName[tone], className)} role="status">
            <div className="stack-s">
                <strong className="ui-toast__title">{title}</strong>
                {description ? <p className="ui-toast__description">{description}</p> : null}
            </div>
        </div>
    )
}
