import { forwardRef, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import type { PasswordInputProps } from './PasswordInput.types'

const passwordInputVariants = cva({
  base: 'mr-password-input',
  variants: {
    size: {
      sm: 'mr-password-input--sm',
      md: 'mr-password-input--md',
      lg: 'mr-password-input--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
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
      showToggle = true,
      ...props
    },
    ref,
  ) {
    const [showPassword, setShowPassword] = useState(false)
    const generatedId = useId()
    const inputId = id || generatedId
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    const resolvedSize = size ?? 'md'
    const isInvalid = Boolean(error)

    return (
      <Field
        className={cn('mr-password-input-field', className)}
        htmlFor={inputId}
        label={label}
        hint={hint}
        error={error}
        required={required}
        hintId={hintId}
        errorId={errorId}
      >
        <div className="mr-password-input__wrapper">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            className={cn(
              passwordInputVariants({ size: resolvedSize }),
              disabled && 'mr-password-input--disabled',
              isInvalid && 'mr-password-input--error',
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
            autoComplete="current-password"
            {...props}
          />
          {showToggle ? (
            <button
              type="button"
              className="mr-password-input__toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          ) : null}
        </div>
      </Field>
    )
  },
)

export type { PasswordInputProps, PasswordInputSize } from './PasswordInput.types'
