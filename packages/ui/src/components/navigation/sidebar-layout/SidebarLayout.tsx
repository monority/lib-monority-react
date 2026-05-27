import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { SidebarLayoutProps } from './SidebarLayout.types'

export const SidebarLayout = forwardRef<HTMLDivElement, SidebarLayoutProps>(
  function SidebarLayout({ sidebar, header, children, sidebarWidth = 'md', className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('mr-sidebar-layout', className)}
        data-sidebar-width={sidebarWidth}
        {...props}
      >
        <aside className="mr-sidebar-layout__sidebar">{sidebar}</aside>
        <div className="mr-sidebar-layout__main">
          {header ? <div className="mr-sidebar-layout__header">{header}</div> : null}
          <div className="mr-sidebar-layout__content">{children}</div>
        </div>
      </div>
    )
  },
)

export type { SidebarLayoutProps, SidebarWidth } from './SidebarLayout.types'
