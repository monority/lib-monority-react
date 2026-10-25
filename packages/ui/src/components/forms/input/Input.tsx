import { Field } from '@/components/forms/field/Field'
import { cn } from '@/lib/cn'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { useCallback, useRef, useState } from 'react'
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

const ClearIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d="M5 5L15 15M15 5L5 15"
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
    clearable = false,
    clearAriaLabel = 'Clear text',
    onClear,
    value,
    defaultValue,
    onChange,
    ...props
}: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const isControlled = value !== undefined
    const [internalHasValue, setInternalHasValue] = useState(
        Boolean(defaultValue && String(defaultValue).length > 0)
    )
    const hasValue = isControlled
        ? Boolean(value !== null && value !== undefined && String(value).length > 0)
        : internalHasValue

    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = density ?? 'md'
    const isInvalid = invalid || Boolean(error)

    const isPasswordMode = type === 'password'
    const effectiveType = isPasswordMode ? (showPassword ? 'text' : 'password') : type

    const showClear = Boolean(clearable) && hasValue && !disabled && !props.readOnly
    const hasLeadingIcon = Boolean(iconLeading)
    const hasTrailingToggle = isPasswordMode && showPasswordToggle
    const hasTrailingIcon = Boolean(iconTrailing) || hasTrailingToggle || showClear
    const needsWrapper = hasLeadingIcon || hasTrailingIcon || Boolean(clearable)

    const handleRef = useCallback(
        (node: HTMLInputElement | null) => {
            inputRef.current = node
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref && typeof ref === 'object' && 'current' in ref) {
                ;(ref as { current: HTMLInputElement | null }).current = node
            }
        },
        [ref]
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalHasValue(e.target.value.length > 0)
        }
        onChange?.(e)
    }

    const handleClear = () => {
        if (inputRef.current) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
            )?.set
            if (nativeInputValueSetter) {
                nativeInputValueSetter.call(inputRef.current, '')
            } else {
                inputRef.current.value = ''
            }
            const inputEvent = new Event('input', { bubbles: true })
            inputRef.current.dispatchEvent(inputEvent)
            const changeEvent = new Event('change', { bubbles: true })
            inputRef.current.dispatchEvent(changeEvent)
            inputRef.current.focus()
        }
        if (!isControlled) {
            setInternalHasValue(false)
        }
        onClear?.()
    }

    const inputControl = (
        <InputBase
            as="input"
            ref={handleRef}
            type={effectiveType}
            className={cn('mr-input', inputClassName)}
            data-size={resolvedSize}
            data-has-leading-icon={hasLeadingIcon ? '' : undefined}
            data-has-trailing-icon={hasTrailingIcon ? '' : undefined}
            disabled={disabled}
            required={required}
            invalid={isInvalid}
            value={value}
            defaultValue={defaultValue}
            onChange={handleInputChange}
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
                        ) : showClear ? (
                            <button
                                type="button"
                                className="mr-input__clear"
                                aria-label={clearAriaLabel}
                                onClick={handleClear}
                                onMouseDown={(e) => e.preventDefault()}
                                tabIndex={-1}
                                disabled={disabled}
                            >
                                <ClearIcon />
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
