import type { InputHTMLAttributes, ReactNode } from 'react'

export type SliderSize = 'sm' | 'md' | 'lg'

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value' | 'defaultValue' | 'onChange'> {
  size?: SliderSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  inputClassName?: string
  showValue?: boolean
  /** Numeric slider value when controlled. */
  value?: number
  /** Initial value when uncontrolled. */
  defaultValue?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Called with the numeric slider value on every change. */
  onValueChange?: (value: number) => void
}
