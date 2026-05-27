import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import type { DateRangePickerProps } from './DateRangePicker.types'

const dateRangePickerVariants = cva({
  base: 'mr-date-range-picker',
  variants: {
    size: {
      sm: 'mr-date-range-picker--sm',
      md: 'mr-date-range-picker--md',
      lg: 'mr-date-range-picker--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  function DateRangePicker(
    {
      size,
      label,
      hint,
      error,
      className,
      fromLabel = 'From',
      toLabel = 'To',
      fromProps,
      toProps,
      ...props
    },
    ref,
  ) {
    const generatedId = useId()
    const fieldId = `date-range-${generatedId}`
    const hintId = hint ? `${fieldId}-hint` : undefined
    const errorId = error ? `${fieldId}-error` : undefined
    const resolvedSize = size ?? 'md'
    const isInvalid = Boolean(error)

    return (
      <div ref={ref} className={cn('mr-date-range-picker-wrapper', className)} {...props}>
        <Field
          htmlFor={fromProps?.id || `${fieldId}-from`}
          label={label}
          hint={hint}
          error={error}
          hintId={hintId}
          errorId={errorId}
        >
          <div className={cn(dateRangePickerVariants({ size: resolvedSize }))} data-size={resolvedSize}>
            <div className="mr-date-range-picker__group">
              <label className="mr-date-range-picker__group-label" htmlFor={fromProps?.id || `${fieldId}-from`}>
                {fromLabel}
              </label>
              <input
                id={fromProps?.id || `${fieldId}-from`}
                type="date"
                className={cn(
                  'mr-date-range-picker__input',
                  isInvalid && 'mr-date-range-picker__input--error',
                )}
                aria-invalid={isInvalid || undefined}
                aria-describedby={errorId || hintId}
                {...fromProps}
              />
            </div>
            <span className="mr-date-range-picker__separator" aria-hidden="true">→</span>
            <div className="mr-date-range-picker__group">
              <label className="mr-date-range-picker__group-label" htmlFor={toProps?.id || `${fieldId}-to`}>
                {toLabel}
              </label>
              <input
                id={toProps?.id || `${fieldId}-to`}
                type="date"
                className={cn(
                  'mr-date-range-picker__input',
                  isInvalid && 'mr-date-range-picker__input--error',
                )}
                aria-invalid={isInvalid || undefined}
                {...toProps}
              />
            </div>
          </div>
        </Field>
      </div>
    )
  },
)

export type { DateRangePickerProps, DateRangePickerSize } from './DateRangePicker.types'
