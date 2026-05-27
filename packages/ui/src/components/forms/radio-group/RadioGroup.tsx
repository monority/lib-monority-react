import { forwardRef, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
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
    size: {
      sm: 'mr-radio-group--sm',
      md: 'mr-radio-group--md',
      lg: 'mr-radio-group--lg',
    },
  },
  defaultVariants: { tone: 'accent', size: 'md' },
})

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    tone,
    size,
    label,
    hint,
    error,
    id,
    className,
    items = [],
    value,
    defaultValue,
    onChange,
    required = false,
    disabled = false,
    invalid = false,
    name,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const groupId = id || generatedId
  const groupName = name || `${groupId}-name`
  const hintId = hint ? `${groupId}-hint` : undefined
  const errorId = error ? `${groupId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const resolvedTone = tone ?? 'accent'
  const resolvedSize = size ?? 'md'
  const isInvalid = invalid || Boolean(error)
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
      hint={hint}
      error={error}
      required={required}
      hintId={hintId}
      errorId={errorId}
    >
      <div
        ref={ref}
        className={cn(
          radioGroupVariants({ tone: resolvedTone, size: resolvedSize }),
          disabled && 'mr-radio-group--disabled',
          isInvalid && 'mr-radio-group--invalid',
        )}
        role="radiogroup"
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedBy}
        data-tone={resolvedTone}
        data-size={resolvedSize}
        data-disabled={disabled ? true : undefined}
        data-invalid={isInvalid ? true : undefined}
        data-required={required ? true : undefined}
        {...props}
      >
        {items.map((item) => {
          const itemId = `${groupId}-${item.value}`
          const checked = selectedValue === item.value
          const isItemDisabled = disabled || item.disabled

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
                required={required}
                onChange={() => handleChange(item.value)}
                disabled={isItemDisabled}
              />
              <span className="mr-radio__control" aria-hidden="true">
                <span className="mr-radio__dot" />
              </span>
              <span className="mr-radio__body">
                <span className="mr-radio__label">{item.label}</span>
                {item.description ? <span className="mr-radio__description">{item.description}</span> : null}
              </span>
            </label>
          )
        })}
      </div>
    </Field>
  )
})

export type { RadioGroupProps, RadioItem, RadioGroupTone, RadioGroupSize } from './RadioGroup.types'
