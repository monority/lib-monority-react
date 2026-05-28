import type { ReactNode } from 'react'
import type { DatePickerProps } from '@/components/forms/date-picker/DatePicker.types'

export type DateRangePickerSize = 'sm' | 'md' | 'lg'

export interface DateRangePickerProps {
  size?: DateRangePickerSize
  className?: string
  fromLabel?: string
  toLabel?: string
  fromProps?: Omit<Partial<DatePickerProps>, 'label'>
  toProps?: Omit<Partial<DatePickerProps>, 'label'>
}
