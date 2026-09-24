import type { InputHTMLAttributes, ReactNode } from 'react'

export type DatePickerSize = 'sm' | 'md' | 'lg'
export type DatePickerTone = 'neutral' | 'accent' | 'danger'

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value' | 'onChange' | 'defaultValue'> {
  size?: DatePickerSize
  tone?: DatePickerTone
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  // Value
  value?: Date | string | null
  defaultValue?: Date | string
  onChange?: (date: Date | null) => void
  // Calendar options
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[] | ((date: Date) => boolean)
  placeholder?: string
  // Styling
  inputClassName?: string
  popoverClassName?: string
}
