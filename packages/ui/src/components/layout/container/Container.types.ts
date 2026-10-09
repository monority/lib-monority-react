import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    size?: ContainerSize
    children?: ReactNode
}
