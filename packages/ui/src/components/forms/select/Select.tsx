import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
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
  const resolvedTone = tone ?? 'neutral'
  const resolvedSize = size ?? 'md'
  const isInvalid = invalid || error != null

  return (
    <FormControl
      id={id}
      hint={hint != null}
      error={error != null}
      disabled={disabled}
      required={required}
      tone={resolvedTone}
      size={resolvedSize}
      invalid={isInvalid}
    >
      <Field className={className} label={label} hint={hint} error={error}>
        <InputBase
          as="select"
          ref={ref}
          className={cn(
            selectVariants({ tone: resolvedTone, size: resolvedSize }),
            disabled && 'mr-select--disabled',
            isInvalid && 'mr-select--invalid',
          )}
          {...props}
        >
          {children}
        </InputBase>
      </Field>
    </FormControl>
  )
})

export type { SelectProps, SelectTone, SelectSize } from './Select.types'
