import { forwardRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { FormControl, useFormControl } from '@/primitives/form-control'
import { Field } from '@/components/forms/field/Field'
import type { RadioGroupProps } from './RadioGroup.types'

const radioGroupVariants = cva({
  base: 'mr-radio-group',
  variants: {
    tone: {
      accent: 'mr-radio-group--accent',
      neutral: 'mr-radio-group--neutral',
      danger: 'mr-radio-group--danger',
    },
  },
  defaultVariants: { tone: 'accent' },
})

const RadioGroupInner = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroupInner(
  {
    tone,
    label,
    hint,
    error,
    className,
    items = [],
    value,
    defaultValue,
    onChange,
    name,
    ...props
  },
  ref,
) {
  const ctx = useFormControl()
  const groupName = name || `${ctx.inputId}-name`
  const resolvedTone = tone ?? 'accent'
  const isInvalid = ctx.isInvalid
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const selectedValue = isControlled ? value : internalValue

  function handleChange(nextValue: string) {
    if (!isControlled) setInternalValue(nextValue)
    onChange?.(nextValue)
  }

  return (
    <Field
      className={className}
      label={label}
      labelId={ctx.inputId ? `${ctx.inputId}-label` : undefined}
      htmlFor={items[0] ? `${ctx.inputId}-${items[0].value}` : undefined}
      hint={hint}
      error={error}
    >
      <div
        ref={ref}
        className={cn(
          radioGroupVariants({ tone: resolvedTone }),
          ctx.isDisabled && 'mr-radio-group--disabled',
          isInvalid && 'mr-radio-group--invalid',
        )}
        role="radiogroup"
        aria-invalid={isInvalid || undefined}
        aria-describedby={ctx.describedBy}
        aria-labelledby={label != null && ctx.inputId ? `${ctx.inputId}-label` : undefined}
        aria-disabled={ctx.isDisabled || undefined}
        data-tone={resolvedTone}
        data-disabled={ctx.isDisabled ? true : undefined}
        data-invalid={isInvalid ? true : undefined}
        data-required={ctx.isRequired ? true : undefined}
        {...props}
      >
        {items.map((item) => {
          const itemId = `${ctx.inputId}-${item.value}`
          const checked = selectedValue === item.value
          const isItemDisabled = ctx.isDisabled || item.disabled

          return (
            <label
              key={item.value}
              className={cn(
                'mr-radio',
                checked && 'mr-radio--checked',
                isItemDisabled && 'mr-radio--disabled',
              )}
              htmlFor={itemId}
              data-checked={checked ? true : undefined}
              data-disabled={isItemDisabled ? true : undefined}
            >
              <input
                className="mr-radio__input"
                id={itemId}
                name={groupName}
                type="radio"
                value={item.value}
                checked={checked}
                required={ctx.isRequired}
                onChange={() => handleChange(item.value)}
                disabled={isItemDisabled}
              />
              <span className="mr-radio__control" aria-hidden="true">
                <span className="mr-radio__dot" />
              </span>
              <span className="mr-radio__body">
                <span className="mr-radio__label">{item.label}</span>
                {item.description != null ? <span className="mr-radio__description">{item.description}</span> : null}
              </span>
            </label>
          )
        })}
      </div>
    </Field>
  )
})

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(props, ref) {
  const { id, hint, error, disabled, required, invalid, ...rest } = props
  return (
    <FormControl id={id} hint={hint != null} error={error != null} disabled={disabled} required={required} invalid={invalid}>
      <RadioGroupInner ref={ref} {...rest} hint={hint} error={error} />
    </FormControl>
  )
})

export type { RadioGroupProps, RadioItem, RadioGroupTone } from './RadioGroup.types'
