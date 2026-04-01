import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Field } from './Field'

export function Input({
    label,
    hint,
    error,
    id,
    className,
    inputClassName,
    required = false,
    ...props
}) {
    const generatedId = useId()
    const inputId = id || generatedId
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
        <Field
            className={className}
            htmlFor={inputId}
            label={label}
            hint={hint}
            error={error}
            required={required}
            hintId={hintId}
            errorId={errorId}
        >
            <input
                className={cn('ui-input', error && 'ui-input--error', inputClassName)}
                id={inputId}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                required={required}
                {...props}
            />
        </Field>
    )
}
