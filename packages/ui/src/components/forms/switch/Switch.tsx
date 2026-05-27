import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { SwitchProps } from './Switch.types'

const switchVariants = cva({
  base: 'mr-switch',
  variants: {
    tone: {
      accent: 'mr-switch--accent',
      neutral: 'mr-switch--neutral',
      danger: 'mr-switch--danger',
    },
    size: {
      sm: 'mr-switch--sm',
      md: 'mr-switch--md',
      lg: 'mr-switch--lg',
    },
  },
  defaultVariants: { tone: 'accent', size: 'md' },
})

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    tone,
    size,
    label,
    id,
    className,
    checked = false,
    disabled = false,
    required = false,
    invalid = false,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const switchId = id || generatedId
  const resolvedTone = tone ?? 'accent'
  const resolvedSize = size ?? 'md'

  return (
    <label
      className={cn(
        switchVariants({ tone: resolvedTone, size: resolvedSize }),
        checked && 'mr-switch--checked',
        disabled && 'mr-switch--disabled',
        invalid && 'mr-switch--invalid',
        className,
      )}
      htmlFor={switchId}
      data-tone={resolvedTone}
      data-size={resolvedSize}
      data-checked={checked ? true : undefined}
      data-disabled={disabled ? true : undefined}
      data-invalid={invalid ? true : undefined}
      data-required={required ? true : undefined}
    >
      <input
        ref={ref}
        id={switchId}
        type="checkbox"
        className="mr-switch__input"
        checked={checked}
        disabled={disabled}
        required={required}
        aria-invalid={invalid || undefined}
        role="switch"
        {...props}
      />
      <span className="mr-switch__control" aria-hidden="true">
        <span className="mr-switch__thumb" />
      </span>
      {label ? <span className="mr-switch__label">{label}</span> : null}
    </label>
  )
})

export type { SwitchProps, SwitchSize, SwitchTone } from './Switch.types'
