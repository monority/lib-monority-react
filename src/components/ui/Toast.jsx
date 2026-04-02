import { cn } from '@/lib/cn'
import { Button } from './Button'

const toneClassName = {
    neutral: 'ui-toast--neutral',
    success: 'ui-toast--success',
    danger: 'ui-toast--danger',
}

export function Toast({ title, description, tone = 'neutral', className, onClose }) {
    return (
        <div className={cn('ui-toast', toneClassName[tone], className)} role="status">
            <div className="stack-s">
                <div className="ui-toast__header">
                    <strong className="ui-toast__title">{title}</strong>
                    {onClose ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ui-toast__close"
                            onClick={onClose}
                            aria-label="Fermer la notification"
                        >
                            ×
                        </Button>
                    ) : null}
                </div>
                {description ? <p className="ui-toast__description">{description}</p> : null}
            </div>
        </div>
    )
}
