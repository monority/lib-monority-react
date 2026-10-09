import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    orientation?: 'both' | 'vertical' | 'horizontal'
    hideScrollbar?: boolean
    children?: ReactNode
}
