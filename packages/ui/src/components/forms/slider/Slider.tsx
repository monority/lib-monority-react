import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { InputHTMLAttributes } from 'react'
import './Slider.css'

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> { label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; id?: string; className?: string; inputClassName?: string; value?: string | number; defaultValue?: string | number; min?: string | number; max?: string | number; step?: string | number; showValue?: boolean; required?: boolean; onValueChange?: (value: string) => void }

export function Slider({ label, hint, error, id, className, inputClassName, value, defaultValue = 50, min = 0, max = 100, step = 1, showValue = true, required = false, onChange, onValueChange, ...props }: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue); const generatedId = useId(); const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined; const errorId = error ? `${inputId}-error` : undefined; const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const isControlled = value !== undefined; const displayValue = isControlled ? value : internalValue
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) { if (!isControlled) setInternalValue(event.target.value); onValueChange?.(event.target.value); onChange?.(event) }
  return <Field className={cn('ui-slider-field', className)} htmlFor={inputId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
    <div className="ui-slider__row"><input className={cn('ui-slider', error ? 'ui-slider--error' : undefined, inputClassName)} id={inputId} type="range" min={min} max={max} step={step} value={value} defaultValue={value === undefined ? defaultValue : undefined} onChange={handleChange} aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} {...props} />{showValue ? <output className="ui-slider__value" htmlFor={inputId}>{displayValue}</output> : null}</div>
  </Field>
}
