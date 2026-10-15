import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { Field } from '@/components/forms/field/Field'
import { cn } from '@/lib/cn'
import { FormControl, useFormControl } from '@/primitives/form-control'
import type {
    RadioGroupDescriptionProps,
    RadioGroupItemProps,
    RadioGroupLabelProps,
    RadioGroupProps,
} from './RadioGroup.types'

interface RadioGroupContextValue {
    selectedValue: string
    groupName: string
    handleChange: (nextValue: string) => void
    isDisabled: boolean
    isRequired: boolean
    inputId: string
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export function RadioGroupLabel({ ref, className, children, ...props }: RadioGroupLabelProps) {
    return (
        <span ref={ref} className={cn('mr-radio__label', className)} {...props}>
            {children}
        </span>
    )
}

export function RadioGroupDescription({
    ref,
    className,
    children,
    ...props
}: RadioGroupDescriptionProps) {
    return (
        <span ref={ref} className={cn('mr-radio__description', className)} {...props}>
            {children}
        </span>
    )
}

export function RadioGroupItem({
    ref,
    value,
    label,
    description,
    disabled = false,
    id,
    className,
    children,
    ...props
}: RadioGroupItemProps) {
    const ctx = useContext(RadioGroupContext)
    const itemId = id ?? `${ctx?.inputId ?? 'radio'}-${value}`
    const checked = ctx ? ctx.selectedValue === value : false
    const isItemDisabled = (ctx?.isDisabled ?? false) || disabled

    return (
        <label
            ref={ref}
            className={cn('mr-radio', className)}
            htmlFor={itemId}
            data-checked={checked ? true : undefined}
            data-disabled={isItemDisabled ? true : undefined}
            {...props}
        >
            <input
                className="mr-radio__input"
                id={itemId}
                name={ctx?.groupName}
                type="radio"
                value={value}
                checked={checked}
                required={ctx?.isRequired}
                onChange={() => ctx?.handleChange(value)}
                disabled={isItemDisabled}
            />
            <span className="mr-radio__control" aria-hidden="true">
                <span className="mr-radio__dot" />
            </span>
            <span className="mr-radio__body">
                {children ?? (
                    <>
                        {label != null ? <span className="mr-radio__label">{label}</span> : null}
                        {description != null ? (
                            <span className="mr-radio__description">{description}</span>
                        ) : null}
                    </>
                )}
            </span>
        </label>
    )
}

function RadioGroupInner({
    ref,
    tone,
    label,
    hint,
    error,
    className,
    items,
    children,
    value,
    defaultValue,
    onChange,
    name,
    ...props
}: RadioGroupProps) {
    const ctx = useFormControl()
    const groupName = name || `${ctx.inputId}-name`
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = ctx.size
    const isInvalid = ctx.isInvalid
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const selectedValue = isControlled ? value : internalValue

    function handleChange(nextValue: string) {
        if (!isControlled) setInternalValue(nextValue)
        onChange?.(nextValue)
    }

    const contextValue: RadioGroupContextValue = {
        selectedValue,
        groupName,
        handleChange,
        isDisabled: ctx.isDisabled,
        isRequired: ctx.isRequired,
        inputId: ctx.inputId,
    }

    const hasItems = Array.isArray(items) && items.length > 0
    const firstValue = items?.[0]?.value

    return (
        <RadioGroupContext.Provider value={contextValue}>
            <Field
                className={className}
                label={label}
                labelId={ctx.inputId ? `${ctx.inputId}-label` : undefined}
                htmlFor={firstValue ? `${ctx.inputId}-${firstValue}` : undefined}
                hint={hint}
                error={error}
            >
                <div
                    ref={ref}
                    className={cn('mr-radio-group')}
                    role="radiogroup"
                    aria-invalid={isInvalid || undefined}
                    aria-describedby={ctx.describedBy}
                    aria-labelledby={
                        label != null && ctx.inputId ? `${ctx.inputId}-label` : undefined
                    }
                    aria-disabled={ctx.isDisabled || undefined}
                    data-tone={resolvedTone}
                    data-size={resolvedSize}
                    data-disabled={ctx.isDisabled ? true : undefined}
                    data-invalid={isInvalid ? true : undefined}
                    data-required={ctx.isRequired ? true : undefined}
                    {...props}
                >
                    {hasItems
                        ? items.map((item) => (
                              <RadioGroupItem
                                  key={item.value}
                                  value={item.value}
                                  label={item.label}
                                  description={item.description}
                                  disabled={item.disabled}
                              />
                          ))
                        : children}
                </div>
            </Field>
        </RadioGroupContext.Provider>
    )
}

export function RadioGroup(props: RadioGroupProps) {
    const { id, hint, error, disabled, required, invalid, size, ref, ...rest } = props
    return (
        <FormControl
            id={id}
            hint={hint != null}
            error={error != null}
            disabled={disabled}
            required={required}
            invalid={invalid}
            size={size}
        >
            <RadioGroupInner ref={ref} {...rest} hint={hint} error={error} />
        </FormControl>
    )
}

RadioGroup.Item = RadioGroupItem
RadioGroup.Label = RadioGroupLabel
RadioGroup.Description = RadioGroupDescription

export type {
    RadioGroupProps,
    RadioItem,
    RadioGroupItemProps,
    RadioGroupLabelProps,
    RadioGroupDescriptionProps,
    RadioGroupSize,
    RadioGroupTone,
} from './RadioGroup.types'
