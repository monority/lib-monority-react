import type { ElementType, HTMLAttributes, ReactNode, Ref } from 'react'

export type TextTone =
    | 'muted'
    | 'base'
    | 'strong'
    | 'neutral'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
export type TextSize = 'sm' | 'md' | 'lg'

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> {
    as?: ElementType
    tone?: TextTone
    size?: TextSize
    children?: ReactNode
    className?: string
    ref?: Ref<HTMLElement>
}
