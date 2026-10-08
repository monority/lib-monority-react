import { useState } from 'react'
import { cn } from '@/lib/cn'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import type { InputProps } from './Input.types'

const EyeIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d="M10 4.5C5.5 4.5 2 10 2 10C2 10 5.5 15.5 10 15.5C14.5 15.5 18 10 18 10C18 10 14.5 4.5 10 4.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
)

const EyeOffIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d="M10 4.5C5.5 4.5 2 10 2 10C2 10 5.5 15.5 10 15.5C14.5 15.5 18 10 18 10C18 10 14.5 4.5 10 4.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <line
            x1="3.5"
            y1="3.5"
            x2="16.5"
            y2="16.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
)

export function Input({
    ref,
    tone,
    size: density,
    label,
    hint,
    error,
    id,
    className,
    inputClassName,
    invalid = false,
    required = false,
    disabled = false,
    type,
    iconLeading,
    iconTrailing,
    showPasswordToggle = false,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = density ?? 'md'
    const isInvalid = invalid || Boolean(error)

    const isPasswordMode = type === 'password'
    const effectiveType = isPasswordMode ? (showPassword ? 'text' : 'password') : type

    const hasLeadingIcon = Boolean(iconLeading)
    const hasTrailingToggle = isPasswordMode && showPasswordToggle
    const hasTrailingIcon = Boolean(iconTrailing) || hasTrailingToggle
    const needsWrapper = hasLeadingIcon || hasTrailingIcon

    const inputControl = (
        <InputBase
            as="input"
            ref={ref}
            type={effectiveType}
            className={cn('mr-input', inputClassName)}
            data-size={resolvedSize}
            data-has-leading-icon={hasLeadingIcon ? '' : undefined}
            data-has-trailing-icon={hasTrailingIcon ? '' : undefined}
            disabled={disabled}
            required={required}
            invalid={isInvalid}
            {...props}
        />
    )

    return (
        <FormControl
            id={id}
            hint={!!hint}
            error={!!error}
            disabled={disabled}
            required={required}
            tone={resolvedTone}
            size={resolvedSize}
            invalid={isInvalid}
        >
            <Field className={className} label={label} hint={hint} error={error}>
                {needsWrapper ? (
                    <div
                        className={cn(
                            'mr-input__wrapper',
                            isPasswordMode && 'mr-password-input__wrapper'
                        )}
                        data-size={resolvedSize}
                    >
                        {hasLeadingIcon ? (
                            <span
                                className="mr-input__icon mr-input__icon--leading"
                                aria-hidden="true"
                            >
                                {iconLeading}
                            </span>
                        ) : null}
                        {inputControl}
                        {hasTrailingToggle ? (
                            <button
                                type="button"
                                className="mr-password-input__toggle"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={() => setShowPassword((prev) => !prev)}
                                onMouseDown={(e) => e.preventDefault()}
                                tabIndex={-1}
                                disabled={disabled}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        ) : hasTrailingIcon ? (
                            <span
                                className="mr-input__icon mr-input__icon--trailing"
                                aria-hidden="true"
                            >
                                {iconTrailing}
                            </span>
                        ) : null}
                    </div>
                ) : (
                    inputControl
                )}
            </Field>
        </FormControl>
    )
}

export type { InputProps, InputTone, InputSize } from './Input.types'
