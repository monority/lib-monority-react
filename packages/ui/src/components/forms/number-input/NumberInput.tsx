import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { NumberInputProps } from './NumberInput.types'

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8H13M8 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

function parseNumeric(value: string): number | null {
  if (value === '' || value === '-' || value === '.') return null
  const n = parseFloat(value)
  if (isNaN(n) || !isFinite(n)) return null
  return n
}

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
      min,
      max,
      step = 1,
      value: controlledValue,
      onChange,
      defaultValue,
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
    const isControlled = controlledValue !== undefined
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [internalValue, setInternalValue] = useState<string>(() => {
      if (isControlled) return String(controlledValue ?? '')
      if (defaultValue !== undefined) return String(defaultValue)
      return ''
    })

    const numericValue = parseNumeric(internalValue)
    const atMin = min !== undefined && numericValue !== null && numericValue <= min
    const atMax = max !== undefined && numericValue !== null && numericValue >= max

    useEffect(() => {
      if (isControlled) {
        setInternalValue(String(controlledValue ?? ''))
      }
    }, [controlledValue, isControlled])

    const commitValue = useCallback((newVal: string) => {
      if (!isControlled) setInternalValue(newVal)
      const parsed = parseNumeric(newVal)
      if (parsed !== null && onChange) {
        const nativeEvent = new Event('change', { bubbles: true })
        const syntheticEvent = {
          target: { value: parsed },
          currentTarget: { value: parsed },
          type: 'change',
        } as unknown as React.ChangeEvent<HTMLInputElement>
        Object.defineProperty(syntheticEvent, 'nativeEvent', { value: nativeEvent })
        onChange(syntheticEvent)
      }
    }, [isControlled, onChange])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      // Allow: empty, minus, decimal start, and valid numeric chars
      if (raw === '' || raw === '-' || raw === '.' || /^-?\d*\.?\d*$/.test(raw)) {
        if (!isControlled) setInternalValue(raw)
        // Fire onChange with parsed value if valid
        const parsed = parseNumeric(raw)
        if (parsed !== null && onChange) {
          onChange({
            ...e,
            target: { ...e.target, value: parsed as unknown as string },
          } as unknown as React.ChangeEvent<HTMLInputElement>)
        }
      }
    }, [isControlled, onChange])

    const stepValue = useCallback((dir: 1 | -1) => {
      const current = numericValue ?? 0
      let next = parseFloat((current + dir * step).toFixed(10))
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
      inputRef.current?.focus()
    }, [numericValue, step, min, max, isControlled, onChange])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); stepValue(1) }
      if (e.key === 'ArrowDown') { e.preventDefault(); stepValue(-1) }
    }, [stepValue])

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
        <div className="mr-number-input__wrapper">
          <input
            ref={(el) => {
              inputRef.current = el
              if (typeof ref === 'function') ref(el)
              else if (ref) ref.current = el
            }}
            id={inputId}
            type="text"
            inputMode="decimal"
            value={internalValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={cn(
              'mr-number-input',
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
          <div className="mr-number-input__actions">
            <button
              type="button"
              className="mr-number-input__btn mr-number-input__btn--down"
              onClick={() => stepValue(-1)}
              disabled={disabled || atMin}
              tabIndex={-1}
              aria-label="Decrement"
            >
              <MinusIcon />
            </button>
            <button
              type="button"
              className="mr-number-input__btn mr-number-input__btn--up"
              onClick={() => stepValue(1)}
              disabled={disabled || atMax}
              tabIndex={-1}
              aria-label="Increment"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </Field>
    )
  },
)

export type { NumberInputProps, NumberInputSize } from './NumberInput.types'
