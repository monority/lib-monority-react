import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}
