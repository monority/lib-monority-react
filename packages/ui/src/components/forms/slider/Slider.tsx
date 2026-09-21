import { forwardRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { FormControl, useFormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import type { SliderProps } from './Slider.types'

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    size,
    label,
    hint,
    error,
    id,
    className,
    inputClassName,
    value,
    defaultValue = 50,
    min = 0,
    max = 100,
    step = 1,
    showValue = true,
    disabled = false,
    required = false,
    invalid = false,
    onChange,
    onValueChange,
    ...props
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const ctx = useFormControl()
  const isControlled = value !== undefined
  const isInvalid = invalid || Boolean(error)
  const displayValue = isControlled ? value : internalValue

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = Number(event.target.value)
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
    onChange?.(event)
  }

  return (
    <FormControl
      id={id}
      size={size}
      hint={!!hint}
      error={!!error}
      disabled={disabled}
      required={required}
      invalid={isInvalid}
    >
      <Field className={cn('mr-slider-field', className)} label={label} hint={hint} error={error}>
        <div className="mr-slider__row">
          <InputBase
            as="input"
            type="range"
            ref={ref}
            className={cn('mr-slider', isInvalid && 'mr-slider--error', inputClassName)}
            min={min}
            max={max}
            step={step}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            onChange={handleChange}
            {...props}
          />
          {showValue ? (
            <output className="mr-slider__value" htmlFor={ctx.inputId}>
              {displayValue}
            </output>
          ) : null}
        </div>
      </Field>
    </FormControl>
  )
})

export type { SliderProps, SliderSize } from './Slider.types'
