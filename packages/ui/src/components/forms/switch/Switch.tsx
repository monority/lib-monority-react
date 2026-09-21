import { forwardRef, useCallback, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { FormControl, useFormControl } from '@/primitives/form-control'
import { Field } from '@/components/forms/field/Field'
import type { SwitchProps } from './Switch.types'

const switchVariants = cva({
    base: 'mr-switch',
    variants: {
        tone: {
            accent: 'mr-switch--accent',
            neutral: 'mr-switch--neutral',
            danger: 'mr-switch--danger',
        },
        size: {
            sm: 'mr-switch--sm',
            md: 'mr-switch--md',
            lg: 'mr-switch--lg',
        },
    },
    defaultVariants: { tone: 'accent', size: 'md' },
})

const SwitchInner = forwardRef<HTMLInputElement, SwitchProps>(function SwitchInner(
    {
        tone,
        size,
        label,
        hint,
        error,
        className,
        checked,
        defaultChecked,
        onChange,
        disabled = false,
        required = false,
        invalid = false,
        ...props
    },
    ref
) {
    const resolvedTone = tone ?? 'accent'
    const resolvedSize = size ?? 'md'
    const isInvalid = invalid || Boolean(error)
    const { describedBy, inputId } = useFormControl()

    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
    const isControlled = checked !== undefined
    const resolvedChecked = isControlled ? checked : internalChecked

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setInternalChecked(e.target.checked)
            }
            onChange?.(e)
        },
        [isControlled, onChange]
    )

    return (
        <Field className={className} label={label} hint={hint} error={error}>
            <label
                className={cn(
                    switchVariants({ tone: resolvedTone, size: resolvedSize }),
                    resolvedChecked && 'mr-switch--checked',
                    disabled && 'mr-switch--disabled',
                    isInvalid && 'mr-switch--invalid'
                )}
                data-tone={resolvedTone}
                data-size={resolvedSize}
                data-checked={resolvedChecked ? true : undefined}
                data-disabled={disabled ? true : undefined}
                data-invalid={isInvalid ? true : undefined}
                data-required={required ? true : undefined}
            >
                <input
                    ref={ref}
                    id={inputId || undefined}
                    type="checkbox"
                    className="mr-switch__input"
                    checked={resolvedChecked}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                    aria-invalid={isInvalid || undefined}
                    aria-describedby={describedBy}
                    role="switch"
                    {...props}
                />
                <span className="mr-switch__control" aria-hidden="true">
                    <span className="mr-switch__thumb" />
                </span>
            </label>
        </Field>
    )
})

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(props, ref) {
    const { id, ...rest } = props
    return (
        <FormControl
            id={id}
            hint={!!rest.hint}
            error={!!rest.error}
            disabled={rest.disabled}
            required={rest.required}
        >
            <SwitchInner ref={ref} {...rest} />
        </FormControl>
    )
})

export type { SwitchProps, SwitchSize, SwitchTone } from './Switch.types'
