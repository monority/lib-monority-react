import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> { label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; id?: string; className?: string; selectClassName?: string; required?: boolean; children?: React.ReactNode }

export function Select({ label, hint, error, id, className, selectClassName, required = false, children, ...props }: SelectProps) {
  const generatedId = useId()
  const selectId = id || generatedId
  const hintId = hint ? `${selectId}-hint` : undefined
  const errorId = error ? `${selectId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return <Field className={className} htmlFor={selectId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
    <select className={cn('ui-input', 'ui-select', error ? 'ui-input--error' : undefined, selectClassName)} id={selectId} aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} {...props}>{children}</select>
  </Field>
}
