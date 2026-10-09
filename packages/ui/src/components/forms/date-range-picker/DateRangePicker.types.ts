import type { ReactNode, Ref } from 'react'
import type { DatePickerProps } from '@/components/forms/date-picker/DatePicker.types'

export type DateRangePickerSize = 'sm' | 'md' | 'lg'

export interface DateRangePickerProps {
    ref?: Ref<HTMLDivElement>
    size?: DateRangePickerSize
    className?: string
    fromLabel?: string
    toLabel?: string
    fromProps?: Omit<Partial<DatePickerProps>, 'label'>
    toProps?: Omit<Partial<DatePickerProps>, 'label'>
    error?: ReactNode
    hint?: ReactNode
    disabled?: boolean
}
