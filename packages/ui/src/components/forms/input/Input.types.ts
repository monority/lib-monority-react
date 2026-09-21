import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputTone = 'neutral' | 'accent' | 'danger'
export type InputSize = 'sm' | 'md' | 'lg'

// `children` is excluded: an <input> is a void element, so rendered children
// would make React throw. Use `inputClassName` / field props instead.
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size' | 'children'> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  inputClassName?: string
  tone?: InputTone
  size?: InputSize
  invalid?: boolean
}
