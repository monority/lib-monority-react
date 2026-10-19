import { Spinner } from '@/components/feedback/spinner/Spinner'
import { Field } from '@/components/forms/field/Field'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import type { MouseEvent } from 'react'
import type { SelectGroupProps, SelectOptionProps, SelectProps } from './Select.types'

export function SelectOption({ ref, children, ...props }: SelectOptionProps) {
    return (
        <option ref={ref} {...props}>
            {children}
        </option>
    )
}

export function SelectGroup({ ref, children, ...props }: SelectGroupProps) {
    return (
        <optgroup ref={ref} {...props}>
            {children}
        </optgroup>
    )
}

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
    loading = false,
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
                    data-loading={loading ? true : undefined}
                    data-invalid={isInvalid ? true : undefined}
                    data-multiple={props.multiple ? true : undefined}
                >
                    <InputBase
                        as="select"
                        ref={ref}
                        className="mr-select"
                        disabled={disabled || loading}
                        aria-busy={loading ? 'true' : undefined}
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
                    {loading ? (
                        <span className="mr-select__spinner" aria-hidden="true">
                            <Spinner size="sm" />
                        </span>
                    ) : null}
                </span>
            </Field>
        </FormControl>
    )
}

Select.Option = SelectOption
Select.Group = SelectGroup

export type {
    SelectProps,
    SelectOptionProps,
    SelectGroupProps,
    SelectTone,
    SelectSize,
    SelectOption as SelectOptionData,
} from './Select.types'
