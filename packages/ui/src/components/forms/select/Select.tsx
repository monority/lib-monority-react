import { forwardRef } from 'react'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import type { SelectProps } from './Select.types'

// Les variantes et tailles sont portées par les attributs `data-*`
// (`data-tone`, `data-size`, `data-disabled`, `data-invalid`) émis par
// `InputBase` depuis le contexte `FormControl` : aucune classe de modifier BEM.
// Voir docs/conventions.md ("Un seul jeu de sélecteurs").

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
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
        children,
        ...props
    },
    ref
) {
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = size ?? 'md'
    const isInvalid = invalid || Boolean(error)

    return (
        <FormControl
            id={id}
            hint={Boolean(hint)}
            error={Boolean(error)}
            disabled={disabled}
            required={required}
            tone={resolvedTone}
            size={resolvedSize}
            invalid={isInvalid}
        >
            <Field className={className} label={label} hint={hint} error={error}>
                <span
                    className="mr-select-wrapper"
                    data-size={resolvedSize}
                    data-disabled={disabled ? true : undefined}
                    data-invalid={isInvalid ? true : undefined}
                    data-multiple={props.multiple ? true : undefined}
                >
                    <InputBase as="select" ref={ref} className="mr-select" {...props}>
                        {children}
                    </InputBase>
                </span>
            </Field>
        </FormControl>
    )
})

export type { SelectProps, SelectTone, SelectSize } from './Select.types'
