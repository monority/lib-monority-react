import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import type { DatePickerProps } from './DatePicker.types'

const datePickerVariants = cva({
  base: 'mr-date-picker',
  variants: {
    size: {
      sm: 'mr-date-picker--sm',
      md: 'mr-date-picker--md',
      lg: 'mr-date-picker--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(
    {
      size,
      type = 'date',
      label,
      hint,
      error,
      id,
      className,
      inputClassName,
      disabled = false,
      required = false,
      ...props
    },
    ref,
  ) {
    const generatedId = useId()
    const inputId = id || generatedId
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    const resolvedSize = size ?? 'md'
    const isInvalid = Boolean(error)

    return (
      <Field className={cn('mr-date-picker-field', className)} htmlFor={inputId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(datePickerVariants({ size: resolvedSize }), disabled && 'mr-date-picker--disabled', isInvalid && 'mr-date-picker--error', inputClassName)}
          disabled={disabled}
          required={required}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          data-size={resolvedSize}
          data-disabled={disabled ? true : undefined}
          data-invalid={isInvalid ? true : undefined}
          data-required={required ? true : undefined}
          {...props}
        />
      </Field>
    )
  },
)

export type { DatePickerProps, DatePickerSize, DatePickerType } from './DatePicker.types'
