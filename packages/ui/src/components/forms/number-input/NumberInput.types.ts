import type { InputHTMLAttributes, ReactNode } from 'react'

export type NumberInputSize = 'sm' | 'md' | 'lg'

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: NumberInputSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  inputClassName?: string
}
