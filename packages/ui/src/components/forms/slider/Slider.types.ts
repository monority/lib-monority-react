import type { InputHTMLAttributes, ReactNode } from 'react'

export type SliderSize = 'sm' | 'md' | 'lg'

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: SliderSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  inputClassName?: string
  showValue?: boolean
  onValueChange?: (value: string) => void
}
