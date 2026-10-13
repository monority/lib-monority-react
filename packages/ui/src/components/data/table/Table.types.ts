import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface Column<T = Record<string, unknown>> {
    key: string
    label?: ReactNode
    render?: (value: unknown, row: T) => ReactNode
    className?: string
}

export interface TableProps<T = Record<string, unknown>> extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    columns?: Column<T>[]
    rows?: T[]
    getRowId?: (row: T, index: number) => string
    emptyState?: ReactNode
    tableClassName?: string
}
