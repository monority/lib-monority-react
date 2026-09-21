import type { HTMLAttributes, ReactNode } from 'react'

export type ProgressTone = 'neutral' | 'success' | 'warning' | 'danger'
export type ProgressMode = 'determinate' | 'indeterminate'

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number
  label?: ReactNode
  showValue?: boolean
  tone?: ProgressTone
  mode?: ProgressMode
  barClassName?: string
}
