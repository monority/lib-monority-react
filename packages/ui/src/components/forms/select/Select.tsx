import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import type { SelectProps } from './Select.types'

const selectVariants = cva({
  base: 'mr-select',
  variants: {
    tone: {
      neutral: 'mr-select--neutral',
      accent: 'mr-select--accent',
      danger: 'mr-select--danger',
    },
    size: {
      sm: 'mr-select--sm',
      md: 'mr-select--md',
      lg: 'mr-select--lg',
    },
  },
  defaultVariants: { tone: 'neutral', size: 'md' },
})

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
  ref,
) {
  const generatedId = useId()
  const selectId = id || generatedId
  const hintId = hint ? `${selectId}-hint` : undefined
  const errorId = error ? `${selectId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const resolvedTone = tone ?? 'neutral'
  const resolvedSize = size ?? 'md'
  const isInvalid = invalid || Boolean(error)

  return (
    <Field
      className={className}
      htmlFor={selectId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      hintId={hintId}
      errorId={errorId}
    >
      <select
        ref={ref}
        id={selectId}
        className={cn(
          selectVariants({ tone: resolvedTone, size: resolvedSize }),
          disabled && 'mr-select--disabled',
          isInvalid && 'mr-select--invalid',
        )}
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        required={required}
        data-tone={resolvedTone}
        data-size={resolvedSize}
        data-disabled={disabled ? true : undefined}
        data-invalid={isInvalid ? true : undefined}
        data-required={required ? true : undefined}
        {...props}
      >
        {children}
      </select>
    </Field>
  )
})

export type { SelectProps, SelectTone, SelectSize } from './Select.types'
