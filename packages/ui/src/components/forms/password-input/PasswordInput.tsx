import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { InputHTMLAttributes } from 'react'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'aria-label'> { label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; id?: string; className?: string; inputClassName?: string; required?: boolean; showLabel?: string; hideLabel?: string; 'aria-label'?: string }

export function PasswordInput({ label, hint, error, id, className, inputClassName, required = false, showLabel = 'Afficher le mot de passe', hideLabel = 'Masquer le mot de passe', ...props }: PasswordInputProps) {
  const generatedId = useId(); const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined; const errorId = error ? `${inputId}-error` : undefined; const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const [visible, setVisible] = useState(false)
  return <Field className={className} htmlFor={inputId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
    <div className="ui-password-input">
      <input className={cn('ui-input ui-password-input__input', error ? 'ui-input--error' : undefined, inputClassName)} id={inputId} type={visible ? 'text' : 'password'} aria-label={typeof label === 'string' ? label : undefined} aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} autoComplete="current-password" {...props} />
      <button type="button" className="ui-password-input__toggle" onClick={() => setVisible((v) => !v)} aria-label={visible ? hideLabel : showLabel} tabIndex={-1}>{visible ? '🙈' : '👁'}</button>
    </div>
  </Field>
}
