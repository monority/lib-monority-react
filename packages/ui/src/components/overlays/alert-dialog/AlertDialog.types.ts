import type { ButtonProps } from '@/components/actions/button/Button.types'
import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type AlertDialogTone = 'default' | 'danger'

export interface AlertDialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    ref?: Ref<HTMLDivElement>
    open: boolean
    title?: string
    description?: ReactNode
    confirmLabel?: string
    cancelLabel?: string
    tone?: AlertDialogTone
    onConfirm?: () => void
    onCancel?: () => void
    children?: ReactNode
}

export interface AlertDialogHeaderProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
}

export interface AlertDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>
}

export interface AlertDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
}

export interface AlertDialogFooterProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
}

export type AlertDialogActionsProps = AlertDialogFooterProps

export interface AlertDialogCancelProps extends ButtonProps {
    ref?: Ref<HTMLButtonElement>
}

export interface AlertDialogConfirmProps extends ButtonProps {
    ref?: Ref<HTMLButtonElement>
}
