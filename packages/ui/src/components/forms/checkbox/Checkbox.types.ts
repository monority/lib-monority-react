import type { InputHTMLAttributes, ReactNode } from 'react'

export type CheckboxTone = 'accent' | 'neutral' | 'danger'
export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'children'> {
  tone?: CheckboxTone
  size?: CheckboxSize
  label?: ReactNode
  className?: string
  indeterminate?: boolean
  invalid?: boolean
}
