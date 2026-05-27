import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface FieldProps { label?: ReactNode; hint?: ReactNode; error?: ReactNode; required?: boolean; htmlFor?: string; hintId?: string; errorId?: string; className?: string; children?: ReactNode }

export function Field({ label, hint, error, required = false, htmlFor, hintId, errorId, className, children }: FieldProps) {
  return <div className={cn('mr-field', className)}>
    {label ? <label className="mr-field__label" htmlFor={htmlFor}>{label}{required ? <span className="mr-field__required"> *</span> : null}</label> : null}
    {children}
    {hint ? <span className="mr-field__hint" id={hintId}>{hint}</span> : null}
    {error ? <span className="mr-field__error" id={errorId} role="alert" aria-live="assertive">{error}</span> : null}
  </div>
}
