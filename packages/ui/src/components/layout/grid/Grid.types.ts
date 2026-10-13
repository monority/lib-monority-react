import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type GridColumns = 1 | 2 | 3 | 4 | 'auto-fit' | 'auto-fill'
export type GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    columns?: GridColumns
    gap?: GridGap
    children?: ReactNode
}
