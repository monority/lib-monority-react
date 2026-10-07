import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type InlineAlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface InlineAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    ref?: Ref<HTMLDivElement>
    tone?: InlineAlertTone
    title?: ReactNode
    description?: ReactNode
    actionLabel?: ReactNode
    onAction?: () => void
    children?: ReactNode
}

export interface InlineAlertTitleProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
}

export interface InlineAlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
}

export interface InlineAlertActionProps extends HTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
}
