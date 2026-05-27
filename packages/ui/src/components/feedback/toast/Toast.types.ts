import type { HTMLAttributes, ReactNode } from 'react'

export type ToastTone = 'neutral' | 'success' | 'danger'

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: ToastTone
  title?: ReactNode
  description?: ReactNode
  onClose?: () => void
}
