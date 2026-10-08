import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    ratio?: number
    children?: ReactNode
}
