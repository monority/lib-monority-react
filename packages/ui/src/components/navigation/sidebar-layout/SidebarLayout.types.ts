import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export type SidebarWidth = 'sm' | 'md' | 'lg'

export interface SidebarLayoutProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    sidebar?: ReactNode
    header?: ReactNode
    children?: ReactNode
    sidebarWidth?: SidebarWidth
    /**
     * Rend la barre laterale repliable. En mode props (`sidebar` / `header`), un
     * `SidebarLayout.Toggle` est insere automatiquement en tete du header : ne pas en
     * ajouter un second dans `header`. En mode compose, placer le Toggle soi-meme.
     */
    collapsible?: boolean
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

export interface SidebarLayoutSidebarProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
}

export interface SidebarLayoutMainProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface SidebarLayoutHeaderProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface SidebarLayoutContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface SidebarLayoutToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
}
