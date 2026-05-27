import type { HTMLAttributes, ReactNode } from 'react'

export type DataListColumns = 'auto' | 'split'

export interface DataListItem {
  key?: string
  label: ReactNode
  value: ReactNode
  render?: (value: ReactNode, item: DataListItem, index: number) => ReactNode
}

export interface DataListProps extends HTMLAttributes<HTMLDListElement> {
  items?: DataListItem[]
  columns?: DataListColumns
  itemClassName?: string
}
