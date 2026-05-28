import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import type { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      hint,
      error,
      id,
      className,
      inputClassName,
      required = false,
      disabled = false,
      size: _htmlSize,
      ...props
    },
    ref,
  ) {
    return (
      <FormControl id={id} hint={!!hint} error={!!error} disabled={disabled} required={required}>
        <Field className={className} label={label} hint={hint} error={error}>
          <InputBase
            as="input"
            ref={ref}
            className={cn('mr-input', error ? 'mr-input--error' : undefined, inputClassName)}
            {...props}
          />
        </Field>
      </FormControl>
    )
  },
)

export type { InputProps } from './Input.types'
