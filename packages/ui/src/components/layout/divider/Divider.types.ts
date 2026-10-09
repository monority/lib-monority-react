import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    label?: ReactNode
    orientation?: 'horizontal' | 'vertical'
}
