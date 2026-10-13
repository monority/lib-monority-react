import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export interface TopbarProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}

export interface TopbarBrandProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface TopbarBrandMarkProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface TopbarNavProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
    /** Accessible label for the navigation landmark */
    'aria-label'?: string
}

export interface TopbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    ref?: Ref<HTMLAnchorElement>
    children?: ReactNode
    /** Marks the link as the current page */
    active?: boolean
}

export interface TopbarActionsProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface TopbarMetaProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export type TopbarStatusTone = 'success' | 'warning' | 'danger' | 'info'

export interface TopbarStatusProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
    tone?: TopbarStatusTone
}
