import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type AlertDialogTone = 'default' | 'danger'

export interface AlertDialogProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    open: boolean
    title: string
    description?: ReactNode
    confirmLabel?: string
    cancelLabel?: string
    tone?: AlertDialogTone
    onConfirm?: () => void
    onCancel?: () => void
}
