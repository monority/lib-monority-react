import { createContext } from 'react'

export interface FormControlContextValue {
  inputId: string
  hintId: string | undefined
  errorId: string | undefined
  describedBy: string | undefined
  size: 'sm' | 'md' | 'lg'
  tone: 'neutral' | 'accent' | 'danger'
  isInvalid: boolean
  isDisabled: boolean
  isRequired: boolean
}

export const FormControlContext = createContext<FormControlContextValue | null>(null)
