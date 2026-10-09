import type { MouseEvent } from 'react'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import type { SelectProps } from './Select.types'

export function Select({
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
    options,
    placeholder,
    ref,
    onMouseDown,
    ...props
}: SelectProps) {
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = size ?? 'md'
    const isInvalid = invalid || Boolean(error)

    const handleMouseDown = (e: MouseEvent<HTMLSelectElement>) => {
        onMouseDown?.(e)
        if (e.defaultPrevented || !props.multiple) return
        const target = e.target as HTMLElement
        if (target.tagName === 'OPTION') {
            e.preventDefault()
            const option = target as HTMLOptionElement
            option.selected = !option.selected
            const select = e.currentTarget
            select.focus()
            select.dispatchEvent(new Event('change', { bubbles: true }))
        }
    }

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
                    <InputBase
                        as="select"
                        ref={ref}
                        className="mr-select"
                        onMouseDown={handleMouseDown}
                        {...props}
                    >
                        {placeholder ? (
                            <option value="" disabled hidden>
                                {placeholder}
                            </option>
                        ) : null}
                        {options
                            ? options.map((opt) => (
                                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                                      {opt.label}
                                  </option>
                              ))
                            : null}
                        {children}
                    </InputBase>
                </span>
            </Field>
        </FormControl>
    )
}

export type { SelectProps, SelectTone, SelectSize, SelectOption } from './Select.types'
