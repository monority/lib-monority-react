import type { ReactNode } from 'react'

export type DateRangePickerSize = 'sm' | 'md' | 'lg'

export interface DateRangePickerProps {
  size?: DateRangePickerSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  fromLabel?: string
  toLabel?: string
  fromProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
  toProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
}
