import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface TopbarProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}
