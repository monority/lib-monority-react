import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { FormControl } from '@/primitives/form-control'
import { Field } from '@/components/forms/field/Field'
import { InputBase } from '@/primitives/input-base'
import type { NumberInputProps } from './NumberInput.types'

const MinusIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const PlusIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8H13M8 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

function parseNumeric(value: string): number | null {
    if (value === '' || value === '-' || value === '.') return null
    const n = Number.parseFloat(value)
    if (Number.isNaN(n) || !Number.isFinite(n)) return null
    return n
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
    {
        size,
        tone,
        label,
        hint,
        error,
        id,
        className,
        inputClassName,
        wrapperClassName,
        disabled = false,
        required = false,
        readOnly = false,
        invalid = false,
        min,
        max,
        step = 1,
        value: controlledValue,
        onChange,
        onValueChange,
        defaultValue,
        ...props
    },
    ref
) {
    const generatedId = useId()
    const inputId = id || generatedId
    const resolvedSize = size ?? 'md'
    const resolvedTone = tone ?? 'neutral'
    const isInvalid = invalid || Boolean(error)
    const isControlled = controlledValue !== undefined
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [internalValue, setInternalValue] = useState<string>(() => {
        if (isControlled) {
            return controlledValue !== null && controlledValue !== undefined
                ? String(controlledValue)
                : ''
        }
        if (defaultValue !== undefined && defaultValue !== null) return String(defaultValue)
        return ''
    })

    const numericValue = parseNumeric(internalValue)
    const atMin = min !== undefined && numericValue !== null && numericValue <= min
    const atMax = max !== undefined && numericValue !== null && numericValue >= max

    useEffect(() => {
        if (isControlled) {
            setInternalValue(
                controlledValue !== null && controlledValue !== undefined
                    ? String(controlledValue)
                    : ''
            )
        }
    }, [controlledValue, isControlled])

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value
            // Allow: empty, minus, decimal start, and valid numeric chars
            if (raw === '' || raw === '-' || raw === '.' || /^-?\d*\.?\d*$/.test(raw)) {
                if (!isControlled) setInternalValue(raw)
                const parsed = parseNumeric(raw)
                if (onChange) {
                    onChange(e)
                }
                if (onValueChange) {
                    onValueChange(parsed)
                }
            }
        },
        [isControlled, onChange, onValueChange]
    )

    const stepValue = useCallback(
        (dir: 1 | -1, multiplier = 1) => {
            if (disabled || readOnly) return
            const current = numericValue ?? 0
            const delta = dir * step * multiplier
            let next = Number.parseFloat((current + delta).toFixed(10))
            if (min !== undefined) next = Math.max(next, min)
            if (max !== undefined) next = Math.min(next, max)
            const str = String(next)
            if (!isControlled) setInternalValue(str)
            if (onChange) {
                const nativeEvent = new Event('change', { bubbles: true })
                const syntheticEvent = {
                    target: { value: str },
                    currentTarget: { value: str },
                    type: 'change',
                } as unknown as React.ChangeEvent<HTMLInputElement>
                Object.defineProperty(syntheticEvent, 'nativeEvent', { value: nativeEvent })
                onChange(syntheticEvent)
            }
            if (onValueChange) {
                onValueChange(next)
            }
            inputRef.current?.focus()
        },
        [disabled, readOnly, numericValue, step, min, max, isControlled, onChange, onValueChange]
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                stepValue(1)
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                stepValue(-1)
            } else if (e.key === 'PageUp') {
                e.preventDefault()
                stepValue(1, 10)
            } else if (e.key === 'PageDown') {
                e.preventDefault()
                stepValue(-1, 10)
            }
            props.onKeyDown?.(e)
        },
        [stepValue, props.onKeyDown]
    )

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            const raw = e.target.value
            if (raw === '' || raw === '-' || raw === '.') {
                if (raw !== '') {
                    if (!isControlled) setInternalValue('')
                    onValueChange?.(null)
                }
            } else {
                const parsed = parseNumeric(raw)
                if (parsed !== null) {
                    let clamped = parsed
                    if (min !== undefined) clamped = Math.max(clamped, min)
                    if (max !== undefined) clamped = Math.min(clamped, max)
                    const str = String(clamped)
                    if (!isControlled) setInternalValue(str)
                    if (inputRef.current) inputRef.current.value = str
                    if (clamped !== parsed) {
                        onValueChange?.(clamped)
                    }
                }
            }
            props.onBlur?.(e)
        },
        [isControlled, min, max, onValueChange, props.onBlur]
    )

    return (
        <FormControl
            id={inputId}
            hint={!!hint}
            error={!!error}
            disabled={disabled}
            required={required}
            tone={resolvedTone}
            size={resolvedSize}
            invalid={isInvalid}
        >
            <Field className={className} label={label} hint={hint} error={error}>
                <div
                    className={cn('mr-number-input__wrapper', wrapperClassName)}
                    data-size={resolvedSize}
                    data-tone={resolvedTone}
                >
                    <InputBase
                        as="input"
                        ref={(el) => {
                            inputRef.current = el as HTMLInputElement | null
                            if (typeof ref === 'function') ref(el as HTMLInputElement | null)
                            else if (ref) ref.current = el as HTMLInputElement | null
                        }}
                        type="text"
                        inputMode="decimal"
                        role="spinbutton"
                        aria-valuenow={numericValue ?? undefined}
                        aria-valuemin={min}
                        aria-valuemax={max}
                        value={internalValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        className={cn('mr-number-input', inputClassName)}
                        disabled={disabled}
                        required={required}
                        readOnly={readOnly}
                        {...props}
                    />
                    <div className="mr-number-input__actions" data-size={resolvedSize}>
                        <button
                            type="button"
                            className="mr-number-input__btn mr-number-input__btn--down"
                            onClick={() => stepValue(-1)}
                            onMouseDown={(e) => e.preventDefault()}
                            disabled={disabled || readOnly || atMin}
                            tabIndex={-1}
                            aria-label="Decrement"
                        >
                            <MinusIcon />
                        </button>
                        <button
                            type="button"
                            className="mr-number-input__btn mr-number-input__btn--up"
                            onClick={() => stepValue(1)}
                            onMouseDown={(e) => e.preventDefault()}
                            disabled={disabled || readOnly || atMax}
                            tabIndex={-1}
                            aria-label="Increment"
                        >
                            <PlusIcon />
                        </button>
                    </div>
                </div>
            </Field>
        </FormControl>
    )
})

export type { NumberInputProps, NumberInputSize, NumberInputTone } from './NumberInput.types'
