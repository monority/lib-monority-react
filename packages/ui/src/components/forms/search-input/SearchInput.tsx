import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { InputHTMLAttributes } from 'react'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'aria-label'> { label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; id?: string; className?: string; inputClassName?: string; required?: boolean; value?: string; defaultValue?: string; placeholder?: string; clearLabel?: string; 'aria-label'?: string }

export function SearchInput({ label, hint, error, id, className, inputClassName, required = false, value, defaultValue = '', onChange, placeholder = 'Rechercher...', clearLabel = 'Effacer', ...props }: SearchInputProps) {
  const generatedId = useId(); const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined; const errorId = error ? `${inputId}-error` : undefined; const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const isControlled = value !== undefined; const [internalValue, setInternalValue] = useState(defaultValue); const currentValue = isControlled ? value : internalValue
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) { if (!isControlled) setInternalValue(event.target.value); onChange?.(event) }
  function handleClear() { if (!isControlled) setInternalValue(''); onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>) }
  return <Field className={className} htmlFor={inputId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
    <div className="ui-search-input"><span className="ui-search-input__icon" aria-hidden="true">🔍</span><input className={cn('ui-input ui-search-input__input', error ? 'ui-input--error' : undefined, inputClassName)} id={inputId} type="search" value={currentValue} onChange={handleChange} placeholder={placeholder} aria-label={typeof label === 'string' ? label : undefined} aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} {...props} />{currentValue ? <button type="button" className="ui-search-input__clear" onClick={handleClear} aria-label={clearLabel}>✕</button> : null}</div>
  </Field>
}
