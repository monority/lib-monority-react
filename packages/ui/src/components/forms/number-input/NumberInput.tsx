import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { InputHTMLAttributes } from 'react'

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'aria-label'> { label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; id?: string; className?: string; inputClassName?: string; required?: boolean; value?: string | number; defaultValue?: string | number; min?: number; max?: number; step?: number; incrementLabel?: string; decrementLabel?: string; 'aria-label'?: string }

export function NumberInput({ label, hint, error, id, className, inputClassName, required = false, value, defaultValue = '', onChange, min, max, step = 1, incrementLabel = 'Augmenter', decrementLabel = 'Diminuer', ...props }: NumberInputProps) {
  const generatedId = useId()
  const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = isControlled ? value : internalValue
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) { if (!isControlled) setInternalValue(event.target.value); onChange?.(event) }
  function stepValue(direction: number) {
    const num = parseFloat(String(currentValue)) || 0
    const next = Math.round((num + direction * step) * 100) / 100
    if (min !== undefined && next < min) return; if (max !== undefined && next > max) return
    const str = String(next); if (!isControlled) setInternalValue(str); onChange?.({ target: { value: str } } as React.ChangeEvent<HTMLInputElement>)
  }
  return <Field className={className} htmlFor={inputId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
    <div className="ui-number-input">
      <input className={cn('ui-input ui-number-input__input', error ? 'ui-input--error' : undefined, inputClassName)} id={inputId} type="number" value={currentValue} onChange={handleChange} min={min} max={max} step={step} aria-label={typeof label === 'string' ? label : undefined} aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} {...props} />
      <div className="ui-number-input__controls"><button type="button" className="ui-number-input__btn" onClick={() => stepValue(1)} aria-label={incrementLabel} tabIndex={-1}>▲</button><button type="button" className="ui-number-input__btn" onClick={() => stepValue(-1)} aria-label={decrementLabel} tabIndex={-1}>▼</button></div>
    </div>
  </Field>
}
