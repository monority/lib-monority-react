import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import type { InputProps } from './Input.types'

const inputVariants = cva({
  base: 'mr-input',
  variants: {
    tone: {
      neutral: 'mr-input--neutral',
      accent: 'mr-input--accent',
      danger: 'mr-input--danger',
    },
    size: {
      sm: 'mr-input--sm',
      md: 'mr-input--md',
      lg: 'mr-input--lg',
    },
  },
  defaultVariants: { tone: 'neutral', size: 'md' },
})

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      tone,
      size: density,
      label,
      hint,
      error,
      id,
      className,
      inputClassName,
      invalid = false,
      required = false,
      disabled = false,
      ...props
    },
    ref,
  ) {
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = density ?? 'md'
    const isInvalid = invalid || Boolean(error)

    return (
      <FormControl
        id={id}
        hint={!!hint}
        error={!!error}
        disabled={disabled}
        required={required}
        tone={resolvedTone}
        size={resolvedSize}
        invalid={isInvalid}
      >
        <Field className={className} label={label} hint={hint} error={error}>
          <InputBase
            as="input"
            ref={ref}
            className={cn(
              inputVariants({ tone: resolvedTone, size: resolvedSize }),
              isInvalid && 'mr-input--invalid',
              isInvalid && 'mr-input--error',
              inputClassName,
            )}
            {...props}
          />
        </Field>
      </FormControl>
    )
  },
)

export type { InputProps, InputTone, InputSize } from './Input.types'
