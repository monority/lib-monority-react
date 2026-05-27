import type { HTMLAttributes, ReactNode } from 'react'

export type CalloutTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: CalloutTone
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
}
