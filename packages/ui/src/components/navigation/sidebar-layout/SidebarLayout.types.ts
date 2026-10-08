import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type SidebarWidth = 'sm' | 'md' | 'lg'

export interface SidebarLayoutProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    sidebar?: ReactNode
    header?: ReactNode
    children?: ReactNode
    sidebarWidth?: SidebarWidth
}
