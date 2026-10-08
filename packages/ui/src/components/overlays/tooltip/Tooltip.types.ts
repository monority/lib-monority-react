import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
    ref?: Ref<HTMLDivElement>
    content: ReactNode
    children: ReactNode
}
