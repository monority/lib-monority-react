import type { HTMLAttributes, ReactNode } from 'react'

export type AlertDialogTone = 'default' | 'danger'

export interface AlertDialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  title: string
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  tone?: AlertDialogTone
  onConfirm?: () => void
  onCancel?: () => void
}
