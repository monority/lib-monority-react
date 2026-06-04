import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputTone = 'neutral' | 'accent' | 'danger'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  inputClassName?: string
  tone?: InputTone
  size?: InputSize
  invalid?: boolean
  children?: ReactNode
}
