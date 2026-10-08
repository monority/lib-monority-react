import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type CalloutTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
export type CalloutSize = 'sm' | 'md'

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'role'> {
    ref?: Ref<HTMLDivElement>
    tone?: CalloutTone
    size?: CalloutSize
    title?: ReactNode
    description?: ReactNode
    icon?: ReactNode
    children?: ReactNode
    role?: 'note' | 'alert' | 'status' | string
}

export interface CalloutIconProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface CalloutTitleProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
}

export interface CalloutDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
}

export interface CalloutContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}
