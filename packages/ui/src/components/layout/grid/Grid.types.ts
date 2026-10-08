import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type GridColumns = 1 | 2 | 3 | 4 | 'auto-fit' | 'auto-fill'

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    columns?: GridColumns
    children?: ReactNode
}
