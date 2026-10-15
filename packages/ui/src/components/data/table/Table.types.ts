import type { HTMLAttributes, ReactNode, Ref, TdHTMLAttributes, ThHTMLAttributes } from 'react'

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
    children?: ReactNode
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
    ref?: Ref<HTMLTableSectionElement>
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    ref?: Ref<HTMLTableSectionElement>
}

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
    ref?: Ref<HTMLTableSectionElement>
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    ref?: Ref<HTMLTableRowElement>
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
    ref?: Ref<HTMLTableCellElement>
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    ref?: Ref<HTMLTableCellElement>
}

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
    ref?: Ref<HTMLTableCaptionElement>
}
