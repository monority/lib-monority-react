import { cn } from '@/lib/cn'

type SidebarWidth = 'sm' | 'md' | 'lg'
const swCN: Record<SidebarWidth, string> = { sm: 'ui-sidebar-layout--sidebar-sm', md: 'ui-sidebar-layout--sidebar-md', lg: 'ui-sidebar-layout--sidebar-lg' }
interface SidebarLayoutProps { sidebar?: React.ReactNode; header?: React.ReactNode; children?: React.ReactNode; sidebarWidth?: SidebarWidth; className?: string }

export function SidebarLayout({ sidebar, header, children, sidebarWidth = 'md', className }: SidebarLayoutProps) {
  return <div className={cn('ui-sidebar-layout', swCN[sidebarWidth], className)}><aside className="ui-sidebar-layout__sidebar">{sidebar}</aside><div className="ui-sidebar-layout__main">{header ? <div className="ui-sidebar-layout__header">{header}</div> : null}<div className="ui-sidebar-layout__content">{children}</div></div></div>
}
