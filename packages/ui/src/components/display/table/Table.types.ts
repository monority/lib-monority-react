import type { HTMLAttributes, ReactNode } from 'react'

export interface Column {
  key: string
  label?: ReactNode
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode
  className?: string
}

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  columns?: Column[]
  rows?: Record<string, unknown>[]
  getRowId?: (row: Record<string, unknown>, index: number) => string
  emptyState?: ReactNode
  tableClassName?: string
}
