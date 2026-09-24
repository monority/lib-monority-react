import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { DatePicker } from '@/components/forms/date-picker/DatePicker'
import type { DateRangePickerProps } from './DateRangePicker.types'

type DateValue = Date | string | null | undefined

function parseDate(value: DateValue): Date | null {
  if (value == null || value === '') return null
  const date = value instanceof Date ? new Date(value) : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function isOnOrBefore(date: Date, boundary: Date): boolean {
  return startOfDay(date).getTime() <= startOfDay(boundary).getTime()
}

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  function DateRangePicker(
    { size, className, fromLabel = 'From', toLabel = 'To', fromProps, toProps, error, hint, disabled },
    ref,
  ) {
    const fromControlled = fromProps?.value !== undefined
    const toControlled = toProps?.value !== undefined
    const [fromValue, setFromValue] = useState<Date | null>(() => parseDate(fromProps?.value ?? fromProps?.defaultValue))
    const [toValue, setToValue] = useState<Date | null>(() => parseDate(toProps?.value ?? toProps?.defaultValue))
    const normalizedRangeRef = useRef<string | null>(null)
    const resolvedFrom = fromControlled ? parseDate(fromProps?.value) : fromValue
    const resolvedTo = toControlled ? parseDate(toProps?.value) : toValue
    const invalidRange = Boolean(resolvedFrom && resolvedTo && isOnOrBefore(resolvedTo, resolvedFrom))
    const effectiveTo = invalidRange ? null : resolvedTo

    const handleFromChange = useCallback(
      (date: Date | null) => {
        if (!fromControlled) setFromValue(date)
        const currentTo = toControlled ? parseDate(toProps?.value) : toValue
        if (date && currentTo && isOnOrBefore(currentTo, date)) {
          if (!toControlled) setToValue(null)
          toProps?.onChange?.(null)
        }
        fromProps?.onChange?.(date)
      },
      [fromControlled, fromProps?.onChange, toControlled, toProps?.onChange, toProps?.value, toValue],
    )

    const handleToChange = useCallback(
      (date: Date | null) => {
        if (date && resolvedFrom && isOnOrBefore(date, resolvedFrom)) return
        if (!toControlled) setToValue(date)
        toProps?.onChange?.(date)
      },
      [resolvedFrom, toControlled, toProps?.onChange],
    )

    useEffect(() => {
      if (!invalidRange) {
        normalizedRangeRef.current = null
        return
      }
      const rangeKey = `${resolvedFrom?.getTime() ?? ''}:${resolvedTo?.getTime() ?? ''}`
      if (normalizedRangeRef.current === rangeKey) return
      normalizedRangeRef.current = rangeKey
      if (!toControlled) setToValue(null)
      else toProps?.onChange?.(null)
    }, [invalidRange, resolvedFrom, resolvedTo, toControlled, toProps?.onChange])

    const toMinDate = resolvedFrom
      ? [addDays(startOfDay(resolvedFrom), 1), toProps?.minDate]
          .filter((date): date is Date => Boolean(date))
          .sort((a, b) => b.getTime() - a.getTime())[0]
      : toProps?.minDate

    const originalDisabledDates = toProps?.disabledDates
    const toDisabledDates = resolvedFrom
      ? (date: Date) => isOnOrBefore(date, resolvedFrom) || (Array.isArray(originalDisabledDates)
          ? originalDisabledDates.some((disabledDate) => startOfDay(disabledDate).getTime() === startOfDay(date).getTime())
          : originalDisabledDates?.(date) ?? false)
      : originalDisabledDates

    return (
      <div ref={ref} className={cn('mr-date-range-picker', className)} data-size={size ?? 'md'}>
        <DatePicker
          {...fromProps}
          label={fromLabel}
          size={size}
          error={error}
          hint={hint}
          disabled={disabled}
          value={fromControlled ? resolvedFrom : fromValue}
          onChange={handleFromChange}
        />
        <span className="mr-date-range-picker__separator" aria-hidden="true">→</span>
        <DatePicker
          {...toProps}
          label={toLabel}
          size={size}
          error={error}
          hint={hint}
          disabled={disabled}
          value={toControlled ? effectiveTo : toValue}
          onChange={handleToChange}
          minDate={toMinDate}
          disabledDates={toDisabledDates}
        />
      </div>
    )
  },
)

export type { DateRangePickerProps, DateRangePickerSize } from './DateRangePicker.types'
