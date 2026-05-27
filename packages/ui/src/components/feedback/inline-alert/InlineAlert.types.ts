import type { HTMLAttributes, ReactNode } from 'react'

export type InlineAlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface InlineAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: InlineAlertTone
  title?: ReactNode
  description?: ReactNode
  actionLabel?: ReactNode
  onAction?: () => void
}
