import type { HTMLAttributes, ReactNode } from 'react'

export type ProgressTone = 'neutral' | 'success' | 'warning' | 'danger'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
  label?: ReactNode
  showValue?: boolean
  tone?: ProgressTone
  barClassName?: string
}
