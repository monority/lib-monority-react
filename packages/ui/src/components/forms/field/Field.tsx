import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface FieldProps { label?: ReactNode; hint?: ReactNode; error?: ReactNode; required?: boolean; htmlFor?: string; hintId?: string; errorId?: string; className?: string; children?: ReactNode }

export function Field({ label, hint, error, required = false, htmlFor, hintId, errorId, className, children }: FieldProps) {
  return <div className={cn('ui-field', className)}>
    {label ? <label className="ui-field__label" htmlFor={htmlFor}>{label}{required ? <span className="ui-field__required"> *</span> : null}</label> : null}
    {children}
    {hint ? <span className="ui-field__hint" id={hintId}>{hint}</span> : null}
    {error ? <span className="ui-field__error" id={errorId} role="alert" aria-live="assertive">{error}</span> : null}
  </div>
}
