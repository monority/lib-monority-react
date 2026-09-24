import { forwardRef, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import { InputBase } from '@/primitives/input-base'
import type { PasswordInputProps } from './PasswordInput.types'

const EyeIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 4.5C5.5 4.5 2 10 2 10C2 10 5.5 15.5 10 15.5C14.5 15.5 18 10 18 10C18 10 14.5 4.5 10 4.5Z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 4.5C5.5 4.5 2 10 2 10C2 10 5.5 15.5 10 15.5C14.5 15.5 18 10 18 10C18 10 14.5 4.5 10 4.5Z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="3.5" y1="3.5" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

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
          <InputBase
            as="input"
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            className={cn(
              passwordInputVariants({ size: resolvedSize }),
              disabled && 'mr-password-input--disabled',
              isInvalid && 'mr-password-input--error',
              inputClassName,
            )}
            size={resolvedSize}
            invalid={isInvalid}
            disabled={disabled}
            required={required}
            aria-describedby={describedBy}
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
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          ) : null}
        </div>
      </Field>
    )
  },
)

export type { PasswordInputProps, PasswordInputSize } from './PasswordInput.types'
