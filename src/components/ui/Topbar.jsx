import { cn } from '@/lib/cn'

export function Topbar({
    brand,
    navigation,
    meta,
    actions,
    className,
}) {
    return (
        <header className={cn('ui-topbar', className)}>
            <div className="ui-topbar__brand">{brand}</div>
            {navigation ? <nav className="ui-topbar__navigation">{navigation}</nav> : null}
            {meta ? <div className="ui-topbar__meta">{meta}</div> : null}
            {actions ? <div className="ui-topbar__actions">{actions}</div> : null}
        </header>
    )
}
