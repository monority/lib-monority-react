import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type ToastTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    ref?: Ref<HTMLDivElement>
    tone?: ToastTone
    title?: ReactNode
    description?: ReactNode
    onClose?: () => void
    onOpenChange?: (open: boolean) => void
    children?: ReactNode
}

export interface ToastTitleProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
}

export interface ToastDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
}

export interface ToastCloseProps extends HTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
}
