import type { HTMLAttributes, ReactNode } from 'react'

export type SortDirection = 'asc' | 'desc'

export interface Column<T = unknown> {
  key: string
  header: ReactNode
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  sortFn?: (left: T, right: T) => number
  accessor?: (row: T) => ReactNode
  render?: (value: ReactNode, row: T, index: number) => ReactNode
}

export interface Sort {
  key: string
  direction: SortDirection
}

export interface DataTableProps<T = unknown> extends HTMLAttributes<HTMLDivElement> {
  columns?: Column<T>[]
  rows?: T[]
  getRowId?: (row: T, index: number) => string
  emptyState?: ReactNode
  tableClassName?: string
  initialSort?: Sort
  sort?: Sort
  onSortChange?: (sort: Sort) => void
  selectable?: boolean
  defaultSelectedRowIds?: string[]
  selectedRowIds?: string[]
  onSelectedRowIdsChange?: (selectedRowIds: string[]) => void
  caption?: ReactNode
  getRowLabel?: (row: T, index: number) => string
}
