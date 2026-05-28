import { useContext } from 'react'
import { FormControlContext, type FormControlContextValue } from './FormControlContext'

export function useFormControl(): FormControlContextValue {
  const ctx = useContext(FormControlContext)
  if (ctx === null) {
    return {
      inputId: '',
      hintId: undefined,
      errorId: undefined,
      describedBy: undefined,
      size: 'md',
      tone: 'neutral',
      isInvalid: false,
      isDisabled: false,
      isRequired: false,
    }
  }
  return ctx
}
