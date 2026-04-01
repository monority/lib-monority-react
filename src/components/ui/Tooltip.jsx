import { cn } from '@/lib/cn'

export function Tooltip({ content, children, className }) {
    return (
        <span className={cn('ui-tooltip', className)}>
            <span className="ui-tooltip__trigger">{children}</span>
            <span className="ui-tooltip__content" role="tooltip">
                {content}
            </span>
        </span>
    )
}
