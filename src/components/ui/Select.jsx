import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Field } from './Field'

export function Select({
    label,
    hint,
    error,
    id,
    className,
    selectClassName,
    required = false,
    children,
    ...props
}) {
    const generatedId = useId()
    const selectId = id || generatedId
    const hintId = hint ? `${selectId}-hint` : undefined
    const errorId = error ? `${selectId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
        <Field
            className={className}
            htmlFor={selectId}
            label={label}
            hint={hint}
            error={error}
            required={required}
            hintId={hintId}
            errorId={errorId}
        >
            <select
                className={cn('ui-input', 'ui-select', error && 'ui-input--error', selectClassName)}
                id={selectId}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                required={required}
                {...props}
            >
                {children}
            </select>
        </Field>
    )
}
