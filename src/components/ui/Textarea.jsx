import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Field } from './Field'

export function Textarea({
    label,
    hint,
    error,
    id,
    className,
    textareaClassName,
    required = false,
    rows = 5,
    ...props
}) {
    const generatedId = useId()
    const textareaId = id || generatedId
    const hintId = hint ? `${textareaId}-hint` : undefined
    const errorId = error ? `${textareaId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
        <Field
            className={className}
            htmlFor={textareaId}
            label={label}
            hint={hint}
            error={error}
            required={required}
            hintId={hintId}
            errorId={errorId}
        >
            <textarea
                className={cn(
                    'ui-input',
                    'ui-textarea',
                    error && 'ui-input--error',
                    textareaClassName,
                )}
                id={textareaId}
                rows={rows}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                required={required}
                {...props}
            />
        </Field>
    )
}
