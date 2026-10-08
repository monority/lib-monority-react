import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type DataListColumns = 'auto' | 'split'

export interface DataListItem {
    key?: string
    label: ReactNode
    value: ReactNode
    render?: (value: ReactNode, item: DataListItem, index: number) => ReactNode
}

export interface DataListProps extends HTMLAttributes<HTMLDListElement> {
    ref?: Ref<HTMLDListElement>
    items?: DataListItem[]
    columns?: DataListColumns
    itemClassName?: string
}
