import { cn } from '@/lib/cn'

export function Divider({ className, label }) {
    return (
        <div
            className={cn('ui-divider', className)}
            role="separator"
            aria-label={label || undefined}
        >
            {label ? <span className="ui-divider__label">{label}</span> : null}
        </div>
    )
}
