import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
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

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    tone,
    size,
    label,
    id,
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
  const generatedId = useId()
  const checkboxId = id || generatedId
  const internalRef = useRef<HTMLInputElement>(null)
  const resolvedTone = tone ?? 'accent'
  const resolvedSize = size ?? 'md'

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
    <label
      className={cn(
        checkboxVariants({ tone: resolvedTone, size: resolvedSize }),
        resolvedChecked && 'mr-checkbox--checked',
        disabled && 'mr-checkbox--disabled',
        invalid && 'mr-checkbox--invalid',
        indeterminate && 'mr-checkbox--indeterminate',
        className,
      )}
      htmlFor={checkboxId}
      data-tone={resolvedTone}
      data-size={resolvedSize}
      data-checked={resolvedChecked ? true : undefined}
      data-disabled={disabled ? true : undefined}
      data-invalid={invalid ? true : undefined}
      data-required={required ? true : undefined}
      data-indeterminate={indeterminate ? true : undefined}
    >
      <input
        ref={setRefs}
        id={checkboxId}
        type="checkbox"
        className="mr-checkbox__input"
        checked={resolvedChecked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        aria-invalid={invalid || undefined}
        {...props}
      />
      <span className="mr-checkbox__control" aria-hidden="true" />
      {label ? <span className="mr-checkbox__label">{label}</span> : null}
    </label>
  )
})

export type { CheckboxProps, CheckboxSize, CheckboxTone } from './Checkbox.types'
