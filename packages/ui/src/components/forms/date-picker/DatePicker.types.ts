import type { InputHTMLAttributes, ReactNode } from 'react'

export type DatePickerSize = 'sm' | 'md' | 'lg'
export type DatePickerType = 'date' | 'datetime-local' | 'time' | 'month' | 'week'

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: DatePickerSize
  type?: DatePickerType
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  inputClassName?: string
}
