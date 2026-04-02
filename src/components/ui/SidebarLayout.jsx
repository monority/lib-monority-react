import { cn } from '@/lib/cn'

const sidebarWidthClassName = {
    sm: 'ui-sidebar-layout--sidebar-sm',
    md: 'ui-sidebar-layout--sidebar-md',
    lg: 'ui-sidebar-layout--sidebar-lg',
}

export function SidebarLayout({
    sidebar,
    header,
    children,
    sidebarWidth = 'md',
    className,
}) {
    return (
        <div className={cn('ui-sidebar-layout', sidebarWidthClassName[sidebarWidth], className)}>
            <aside className="ui-sidebar-layout__sidebar">{sidebar}</aside>
            <div className="ui-sidebar-layout__main">
                {header ? <div className="ui-sidebar-layout__header">{header}</div> : null}
                <div className="ui-sidebar-layout__content">{children}</div>
            </div>
        </div>
    )
}
