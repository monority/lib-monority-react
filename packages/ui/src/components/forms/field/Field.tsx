import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useFormControl } from '@/primitives/form-control'

export interface FieldProps { label?: ReactNode; hint?: ReactNode; error?: ReactNode; required?: boolean; htmlFor?: string; hintId?: string; errorId?: string; className?: string; children?: ReactNode }

export function Field({ label, hint, error, required, htmlFor, hintId, errorId, className, children }: FieldProps) {
  const ctx = useFormControl()
  const resolvedHtmlFor = htmlFor ?? ctx.inputId
  const resolvedHintId = hintId ?? ctx.hintId
  const resolvedErrorId = errorId ?? ctx.errorId
  const resolvedRequired = required ?? ctx.isRequired

  return <div className={cn('mr-field', className)}>
    {label ? <label className="mr-field__label" htmlFor={resolvedHtmlFor || undefined}>{label}{resolvedRequired ? <span className="mr-field__required"> *</span> : null}</label> : null}
    {children}
    {hint ? <span className="mr-field__hint" id={resolvedHintId}>{hint}</span> : null}
    {error ? <span className="mr-field__error" id={resolvedErrorId} role="alert" aria-live="assertive">{error}</span> : null}
  </div>
}
