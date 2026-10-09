import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}
