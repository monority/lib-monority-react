import { Field } from '@/components/forms/field/Field'
import { cn } from '@/lib/cn'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { forwardRef, useState } from 'react'
import type { TextareaProps } from './Textarea.types'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    {
        tone,
        size,
        label,
        hint,
        error,
        id,
        className,
        invalid = false,
        disabled = false,
        required = false,
        resize = 'vertical',
        value,
        defaultValue,
        onChange,
        maxLength,
        ...props
    },
    ref
) {
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = size ?? 'md'
    const isControlled = value !== undefined

    // Track char count for uncontrolled
    const [charCount, setCharCount] = useState(
        isControlled ? String(value ?? '').length : String(defaultValue ?? '').length
    )

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (!isControlled) {
            setCharCount(e.target.value.length)
        }
        onChange?.(e)
    }

    const currentLength = isControlled ? String(value ?? '').length : charCount
    const isOverLimit =
        typeof maxLength !== 'undefined' && maxLength > 0 ? currentLength > maxLength : false
    const isInvalid = invalid || error != null || isOverLimit

    return (
        <FormControl
            id={id}
            hint={hint != null}
            error={error != null}
            disabled={disabled}
            required={required}
            tone={resolvedTone}
            size={resolvedSize}
            invalid={isInvalid}
        >
            <Field className={className} label={label} hint={hint} error={error}>
                <InputBase
                    as="textarea"
                    ref={ref}
                    className={cn('mr-textarea')}
                    data-resize={resize}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    maxLength={maxLength}
                    {...props}
                />
                {typeof maxLength !== 'undefined' && maxLength > 0 ? (
                    <span
                        className="mr-textarea__counter"
                        data-near-limit={isOverLimit ? true : undefined}
                        data-over-limit={isOverLimit ? true : undefined}
                        aria-live="polite"
                    >
                        {currentLength} / {maxLength}
                    </span>
                ) : null}
            </Field>
        </FormControl>
    )
})

export type { TextareaProps, TextareaTone, TextareaSize } from './Textarea.types'
