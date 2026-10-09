import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface KbdProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode
    size?: 'sm' | 'md' | 'lg'
    keys?: string[]
    ref?: Ref<HTMLElement>
}
