import type { ReactNode } from 'react'
import { useFieldIds } from '@/internal/use-field-ids'
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
    const { inputId, hintId, errorId, describedBy } = useFieldIds({ id, hint, error })
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

    return <FormControlContext.Provider value={value}>{children}</FormControlContext.Provider>
}
