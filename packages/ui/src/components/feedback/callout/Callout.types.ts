import type { HTMLAttributes, ReactNode } from 'react'

export type CalloutTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'role'> {
  tone?: CalloutTone
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  role?: 'note' | 'alert' | 'status' | string
}
