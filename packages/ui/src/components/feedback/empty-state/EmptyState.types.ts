import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type EmptyStateStatus = 'empty' | 'loading' | 'error'

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    ref?: Ref<HTMLDivElement>
    title?: ReactNode
    description?: ReactNode
    icon?: ReactNode
    action?: ReactNode
    secondaryAction?: ReactNode
    state?: EmptyStateStatus
    children?: ReactNode
}

export interface EmptyStateIconProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface EmptyStateTitleProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
}

export interface EmptyStateDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
}

export interface EmptyStateActionsProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}
