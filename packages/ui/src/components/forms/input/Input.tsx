import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import type { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        tone,
        size: density,
        label,
        hint,
        error,
        id,
        className,
        inputClassName,
        invalid = false,
        required = false,
        disabled = false,
        ...props
    },
    ref
) {
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = density ?? 'md'
    const isInvalid = invalid || Boolean(error)

    return (
        <FormControl
            id={id}
            hint={!!hint}
            error={!!error}
            disabled={disabled}
            required={required}
            tone={resolvedTone}
            size={resolvedSize}
            invalid={isInvalid}
        >
            <Field className={className} label={label} hint={hint} error={error}>
                <InputBase
                    as="input"
                    ref={ref}
                    className={cn('mr-input', inputClassName)}
                    {...props}
                />
            </Field>
        </FormControl>
    )
})

export type { InputProps, InputTone, InputSize } from './Input.types'
