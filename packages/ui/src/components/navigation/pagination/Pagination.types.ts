import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    HTMLAttributes,
    ReactNode,
    Ref,
} from 'react'

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    page?: number
    totalPages?: number
    onPageChange?: (page: number) => void
    children?: ReactNode
}

export interface PaginationContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface PaginationItemProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    ref?: Ref<HTMLAnchorElement>
    isActive?: boolean
}

export interface PaginationPreviousProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    ref?: Ref<HTMLAnchorElement>
}

export interface PaginationNextProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    ref?: Ref<HTMLAnchorElement>
}

export interface PaginationEllipsisProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}
