import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface BreadcrumbItem {
    label: ReactNode
    href?: string
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    items?: BreadcrumbItem[]
}
