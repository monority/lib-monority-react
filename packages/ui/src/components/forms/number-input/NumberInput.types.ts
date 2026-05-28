import type { InputHTMLAttributes, ReactNode } from 'react'

export type NumberInputSize = 'sm' | 'md' | 'lg'

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value' | 'onChange' | 'defaultValue'> {
  size?: NumberInputSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  inputClassName?: string
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
