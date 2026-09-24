import { Field } from '@/components/forms/field/Field'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { forwardRef, useState } from 'react'
import type { TextareaProps } from './Textarea.types'

const textareaVariants = cva({
    base: 'mr-textarea',
    variants: {
        tone: {
            neutral: 'mr-textarea--neutral',
            accent: 'mr-textarea--accent',
            danger: 'mr-textarea--danger',
        },
        size: {
            sm: 'mr-textarea--sm',
            md: 'mr-textarea--md',
            lg: 'mr-textarea--lg',
        },
    },
    defaultVariants: { tone: 'neutral', size: 'md' },
})

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
    const isInvalid = invalid || error != null
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
    const isNearLimit =
        typeof maxLength !== 'undefined' && maxLength > 0
            ? currentLength / maxLength >= 0.85
            : false

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
                    className={cn(
                        textareaVariants({ tone: resolvedTone, size: resolvedSize }),
                        disabled && 'mr-textarea--disabled',
                        isInvalid && 'mr-textarea--invalid'
                    )}
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
                        data-near-limit={isNearLimit ? true : undefined}
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
