import { cn } from '@/lib/cn'

const sizeClassName = {
    sm: 'ui-spinner--sm',
    md: 'ui-spinner--md',
    lg: 'ui-spinner--lg',
}

const toneClassName = {
    base: 'ui-spinner--base',
    muted: 'ui-spinner--muted',
    inverse: 'ui-spinner--inverse',
}

export function Spinner({
    size = 'md',
    tone = 'base',
    label = 'Chargement',
    className,
}) {
    return (
        <span className={cn('ui-spinner', sizeClassName[size], toneClassName[tone], className)}>
            <span className="ui-spinner__ring" aria-hidden="true" />
            <span className="visually-hidden">{label}</span>
        </span>
    )
}
