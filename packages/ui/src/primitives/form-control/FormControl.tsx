import { type ReactNode, useId } from 'react'
import { FormControlContext, type FormControlContextValue } from './FormControlContext'

export interface FormControlProps {
  id?: string
  hint?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  tone?: 'neutral' | 'accent' | 'danger'
  invalid?: boolean
  disabled?: boolean
  required?: boolean
  children?: ReactNode
}

export function FormControl({
  id,
  hint,
  error,
  size = 'md',
  tone = 'neutral',
  invalid,
  disabled = false,
  required = false,
  children,
}: FormControlProps) {
  const generatedId = useId()
  const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const isInvalid = invalid ?? Boolean(error)
  const isDisabled = disabled
  const isRequired = required

  const value: FormControlContextValue = {
    inputId,
    hintId,
    errorId,
    describedBy,
    size,
    tone,
    isInvalid,
    isDisabled,
    isRequired,
  }

  return (
    <FormControlContext.Provider value={value}>
      {children}
    </FormControlContext.Provider>
  )
}
