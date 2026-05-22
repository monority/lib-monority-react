import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { InputHTMLAttributes } from 'react'
import './DateRangePicker.css'

interface DateRangePickerProps { label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; id?: string; className?: string; inputClassName?: string; required?: boolean; fromLabel?: string; toLabel?: string; fromProps?: InputHTMLAttributes<HTMLInputElement>; toProps?: InputHTMLAttributes<HTMLInputElement> }

export function DateRangePicker({ label, hint, error, id, className, inputClassName, required = false, fromLabel = 'Du', toLabel = 'Au', fromProps, toProps }: DateRangePickerProps) {
  const generatedId = useId(); const fieldId = id || generatedId; const fromId = `${fieldId}-from`; const toId = `${fieldId}-to`
  const hintId = hint ? `${fieldId}-hint` : undefined; const errorId = error ? `${fieldId}-error` : undefined; const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return <Field className={className} htmlFor={fromId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
    <div className="ui-date-range">
      <div className="ui-date-range__group"><label className="ui-date-range__sub-label" htmlFor={fromId}>{fromLabel}</label><input id={fromId} className={cn('ui-input ui-date-range__input', error ? 'ui-input--error' : undefined, inputClassName)} type="date" aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} {...fromProps} /></div>
      <span className="ui-date-range__separator" aria-hidden="true">→</span>
      <div className="ui-date-range__group"><label className="ui-date-range__sub-label" htmlFor={toId}>{toLabel}</label><input id={toId} className={cn('ui-input ui-date-range__input', error ? 'ui-input--error' : undefined, inputClassName)} type="date" aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} {...toProps} /></div>
    </div>
  </Field>
}
