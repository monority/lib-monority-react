import { cn } from '@/lib/cn'

export function Toolbar({
    leading,
    trailing,
    align = 'center',
    className,
    children,
}) {
    return (
        <div className={cn('ui-toolbar', align === 'start' && 'ui-toolbar--start', className)}>
            <div className="ui-toolbar__group ui-toolbar__group--leading">{leading}</div>
            {children ? <div className="ui-toolbar__center">{children}</div> : null}
            <div className="ui-toolbar__group ui-toolbar__group--trailing">{trailing}</div>
        </div>
    )
}
