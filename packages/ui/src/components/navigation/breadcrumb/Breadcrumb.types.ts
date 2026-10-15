import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export interface BreadcrumbItemData {
    label: ReactNode
    href?: string
}

export type BreadcrumbItem = BreadcrumbItemData

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    items?: BreadcrumbItemData[]
    children?: ReactNode
}

export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {
    ref?: Ref<HTMLOListElement>
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
    ref?: Ref<HTMLLIElement>
}

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    ref?: Ref<HTMLAnchorElement>
}

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}
