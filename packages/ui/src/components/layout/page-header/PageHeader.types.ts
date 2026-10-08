import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}
