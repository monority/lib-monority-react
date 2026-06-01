import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { DatePicker } from '@/components/forms/date-picker/DatePicker'
import type { DateRangePickerProps } from './DateRangePicker.types'

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  function DateRangePicker({ size, className, fromLabel = 'From', toLabel = 'To', fromProps, toProps, error, hint, disabled }, ref) {
    return (
      <div ref={ref} className={cn('mr-date-range-picker', className)} data-size={size ?? 'md'}>
        <DatePicker label={fromLabel} size={size} error={error} hint={hint} disabled={disabled} {...fromProps} />
        <span className="mr-date-range-picker__separator" aria-hidden="true">→</span>
        <DatePicker label={toLabel} size={size} error={error} hint={hint} disabled={disabled} {...toProps} />
      </div>
    )
  },
)

export type { DateRangePickerProps, DateRangePickerSize } from './DateRangePicker.types'
