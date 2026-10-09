import type { HTMLAttributes, Ref } from 'react'

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    orientation?: 'horizontal' | 'vertical'
    decorative?: boolean
}
