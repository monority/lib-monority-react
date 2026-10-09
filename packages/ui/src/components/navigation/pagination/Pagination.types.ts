import type { HTMLAttributes, Ref } from 'react'

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    page?: number
    totalPages?: number
    onPageChange?: (page: number) => void
}
