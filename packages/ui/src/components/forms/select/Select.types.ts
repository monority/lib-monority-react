import type { ReactNode, SelectHTMLAttributes } from 'react'

export type SelectTone = 'neutral' | 'accent' | 'danger'
export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'> {
  tone?: SelectTone
  size?: SelectSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  invalid?: boolean
  children?: ReactNode
}
