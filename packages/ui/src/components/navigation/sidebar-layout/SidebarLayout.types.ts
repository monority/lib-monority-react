import type { HTMLAttributes, ReactNode } from 'react'

export type SidebarWidth = 'sm' | 'md' | 'lg'

export interface SidebarLayoutProps extends HTMLAttributes<HTMLDivElement> {
  sidebar?: ReactNode
  header?: ReactNode
  children?: ReactNode
  sidebarWidth?: SidebarWidth
}
