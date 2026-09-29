import { useId } from 'react'

export function useFieldIds({
    id,
    hint,
    error,
}: {
    id?: string
    hint?: boolean | React.ReactNode
    error?: boolean | React.ReactNode
}) {
    const generatedId = useId()
    const inputId = id || generatedId
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return { inputId, hintId, errorId, describedBy }
}
