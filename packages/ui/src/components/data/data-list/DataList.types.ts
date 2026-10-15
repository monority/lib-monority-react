import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type DataListColumns = 'auto' | 'split'

export interface DataListItem {
    key?: string
    label: ReactNode
    value: ReactNode
    render?: (value: ReactNode, item: DataListItem, index: number) => ReactNode
}

export type DataListItemData = DataListItem

export interface DataListProps extends HTMLAttributes<HTMLDListElement> {
    ref?: Ref<HTMLDListElement>
    items?: DataListItem[]
    columns?: DataListColumns
    itemClassName?: string
    children?: ReactNode
}

export interface DataListItemProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface DataListLabelProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}

export interface DataListValueProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}
