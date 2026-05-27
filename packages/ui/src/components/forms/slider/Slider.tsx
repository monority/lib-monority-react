import { forwardRef, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import type { SliderProps } from './Slider.types'

const sliderVariants = cva({
  base: 'mr-slider',
  variants: {
    size: {
      sm: 'mr-slider--sm',
      md: 'mr-slider--md',
      lg: 'mr-slider--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

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
    onChange,
    onValueChange,
    ...props
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const generatedId = useId()
  const sliderId = id || generatedId
  const hintId = hint ? `${sliderId}-hint` : undefined
  const errorId = error ? `${sliderId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const isControlled = value !== undefined
  const displayValue = isControlled ? value : internalValue
  const resolvedSize = size ?? 'md'
  const isInvalid = Boolean(error)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalValue(event.target.value)
    onValueChange?.(event.target.value)
    onChange?.(event)
  }

  return (
    <Field
      className={cn('mr-slider-field', className)}
      htmlFor={sliderId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      hintId={hintId}
      errorId={errorId}
    >
      <div className="mr-slider__row">
        <input
          ref={ref}
          id={sliderId}
          type="range"
          className={cn(
            sliderVariants({ size: resolvedSize }),
            disabled && 'mr-slider--disabled',
            isInvalid && 'mr-slider--error',
            inputClassName,
          )}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          data-size={resolvedSize}
          data-disabled={disabled ? true : undefined}
          data-invalid={isInvalid ? true : undefined}
          data-required={required ? true : undefined}
          {...props}
        />
        {showValue ? (
          <output className="mr-slider__value" htmlFor={sliderId}>
            {displayValue}
          </output>
        ) : null}
      </div>
    </Field>
  )
})

export type { SliderProps, SliderSize } from './Slider.types'
