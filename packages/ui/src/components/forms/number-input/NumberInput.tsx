import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import type { NumberInputProps } from './NumberInput.types'

const numberInputVariants = cva({
  base: 'mr-number-input',
  variants: {
    size: {
      sm: 'mr-number-input--sm',
      md: 'mr-number-input--md',
      lg: 'mr-number-input--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      size,
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
      <Field
        className={cn('mr-number-input-field', className)}
        htmlFor={inputId}
        label={label}
        hint={hint}
        error={error}
        required={required}
        hintId={hintId}
        errorId={errorId}
      >
        <input
          ref={ref}
          id={inputId}
          type="number"
          className={cn(
            numberInputVariants({ size: resolvedSize }),
            disabled && 'mr-number-input--disabled',
            isInvalid && 'mr-number-input--error',
            inputClassName,
          )}
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

export type { NumberInputProps, NumberInputSize } from './NumberInput.types'
