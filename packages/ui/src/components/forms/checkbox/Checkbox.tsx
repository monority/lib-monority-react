import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { FormControl, useFormControl } from '@/primitives/form-control'
import { Field } from '@/components/forms/field/Field'
import type { CheckboxProps } from './Checkbox.types'

const checkboxVariants = cva({
  base: 'mr-checkbox',
  variants: {
    tone: {
      accent: 'mr-checkbox--accent',
      neutral: 'mr-checkbox--neutral',
      danger: 'mr-checkbox--danger',
    },
    size: {
      sm: 'mr-checkbox--sm',
      md: 'mr-checkbox--md',
      lg: 'mr-checkbox--lg',
    },
  },
  defaultVariants: { tone: 'accent', size: 'md' },
})

const CheckboxInner = forwardRef<HTMLInputElement, Omit<CheckboxProps, 'id'>>(function CheckboxInner(
  {
    tone,
    size,
    label,
    hint,
    error,
    className,
    checked,
    defaultChecked,
    onChange,
    disabled = false,
    required = false,
    invalid = false,
    indeterminate = false,
    ...props
  },
  ref,
) {
  const ctx = useFormControl()
  const resolvedTone = tone ?? 'accent'
  const resolvedSize = size ?? 'md'
  const isInvalid = invalid || Boolean(error)

  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
  const isControlled = checked !== undefined
  const resolvedChecked = isControlled ? checked : internalChecked

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked)
      }
      onChange?.(e)
    },
    [isControlled, onChange],
  )

  // Merge forwarded ref with internal ref (needed for indeterminate)
  const internalRef = useRef<HTMLInputElement>(null)
  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )

  // indeterminate is a DOM property, not an HTML attribute — set via ref
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <Field className={className} hint={hint} error={error}>
      <label
        className={cn(
          checkboxVariants({ tone: resolvedTone, size: resolvedSize }),
          resolvedChecked && 'mr-checkbox--checked',
          disabled && 'mr-checkbox--disabled',
          isInvalid && 'mr-checkbox--invalid',
          indeterminate && 'mr-checkbox--indeterminate',
        )}
        htmlFor={ctx.inputId}
        data-tone={resolvedTone}
        data-size={resolvedSize}
        data-checked={resolvedChecked ? true : undefined}
        data-disabled={disabled ? true : undefined}
        data-invalid={isInvalid ? true : undefined}
        data-required={required ? true : undefined}
        data-indeterminate={indeterminate ? true : undefined}
      >
        <input
          ref={setRefs}
          id={ctx.inputId}
          type="checkbox"
          className="mr-checkbox__input"
          checked={resolvedChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-invalid={isInvalid || undefined}
          aria-describedby={ctx.describedBy}
          {...props}
        />
        <span className="mr-checkbox__control" aria-hidden="true" />
        {label ? <span className="mr-checkbox__label">{label}</span> : null}
      </label>
    </Field>
  )
})

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  props,
  ref,
) {
  const { id, hint, error, ...rest } = props

  return (
    <FormControl
      id={id}
      hint={!!hint}
      error={!!error}
      disabled={rest.disabled}
      required={rest.required}
    >
      <CheckboxInner ref={ref} hint={hint} error={error} {...rest} />
    </FormControl>
  )
})

export type { CheckboxProps, CheckboxSize, CheckboxTone } from './Checkbox.types'
