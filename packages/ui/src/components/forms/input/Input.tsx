import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      hint,
      error,
      id,
      className,
      inputClassName,
      required = false,
      disabled = false,
      ...props
    },
    ref,
  ) {
    const generatedId = useId()
    const inputId = id || generatedId
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <Field
        className={className}
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
          className={cn('mr-input', error ? 'mr-input--error' : undefined, inputClassName)}
          {...props}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          required={required}
          disabled={disabled}
          data-invalid={error ? true : undefined}
          data-required={required ? true : undefined}
          data-disabled={disabled ? true : undefined}
        />
      </Field>
    )
  },
)

export type { InputProps } from './Input.types'
