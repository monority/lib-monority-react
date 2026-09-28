import { createElement, type ReactElement } from 'react'
import { cn } from '@/lib/cn'
import { useFormControl } from '@/primitives/form-control/useFormControl'
import type { InputBaseProps } from './InputBase.types'

export function InputBase({
    as,
    size,
    tone,
    invalid,
    disabled,
    required,
    className,
    children,
    id,
    ref,
    ...domProps
}: InputBaseProps): ReactElement {
    const ctx = useFormControl()

    const resolvedSize = size ?? ctx.size
    const resolvedTone = tone ?? ctx.tone
    const isInvalid = invalid ?? ctx.isInvalid
    const isDisabled = disabled ?? ctx.isDisabled
    const isRequired = required ?? ctx.isRequired
    const resolvedId = id || ctx.inputId

    // <input> is a void element: rendering children makes React throw.
    const canHaveChildren = as !== 'input'

    const describedBy = ctx.describedBy || domProps['aria-describedby']

    // `createElement` accepte le tag dynamique ; les props publiques sont typées
    // par élément dans `InputBaseProps` (union discriminée sur `as`).
    return createElement(
        as,
        {
            id: resolvedId,
            ref,
            className: cn('mr-input-base', className),
            'aria-invalid': isInvalid || undefined,
            'aria-describedby': describedBy,
            disabled: isDisabled,
            required: isRequired,
            'data-size': resolvedSize,
            'data-tone': resolvedTone,
            'data-invalid': isInvalid ? true : undefined,
            'data-disabled': isDisabled ? true : undefined,
            'data-required': isRequired ? true : undefined,
            ...domProps,
        },
        canHaveChildren ? children : null
    )
}
