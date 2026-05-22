import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { InputHTMLAttributes } from 'react'
import './DatePicker.css'

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> { label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; id?: string; className?: string; inputClassName?: string; required?: boolean; type?: 'date' | 'datetime-local' | 'time' }

export function DatePicker({ label, hint, error, id, className, inputClassName, required = false, type = 'date', ...props }: DatePickerProps) {
  const generatedId = useId()
  const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return <Field className={className} htmlFor={inputId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
    <input className={cn('ui-input ui-date-picker', error ? 'ui-input--error' : undefined, inputClassName)} id={inputId} type={type} aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} {...props} />
  </Field>
}
