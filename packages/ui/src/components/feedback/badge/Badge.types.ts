import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    tone?: BadgeTone
    variant?: BadgeVariant
    size?: BadgeSize
    dot?: boolean
    children?: ReactNode
}

export interface BadgeDotProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}
