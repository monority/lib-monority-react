import type { InputHTMLAttributes, ReactNode } from 'react'

export type SwitchTone = 'accent' | 'neutral' | 'danger'
export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'children'> {
  tone?: SwitchTone
  size?: SwitchSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  invalid?: boolean
}
