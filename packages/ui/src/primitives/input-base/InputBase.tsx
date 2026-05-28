import { type ReactNode, type Ref } from 'react'
import { cn } from '@/lib/cn'
import { useFormControl } from '@/primitives/form-control/useFormControl'
import type { InputBaseProps } from './InputBase.types'

export function InputBase({
  as: Tag,
  size,
  tone,
  invalid,
  disabled,
  required,
  className,
  children,
  id,
  ref,
  ...props
}: InputBaseProps) {
  const ctx = useFormControl()

  const resolvedSize = size ?? ctx.size
  const resolvedTone = tone ?? ctx.tone
  const isInvalid = invalid ?? ctx.isInvalid
  const isDisabled = disabled ?? ctx.isDisabled
  const isRequired = required ?? ctx.isRequired
  const resolvedId = id || ctx.inputId

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const describedBy = ctx.describedBy || (props as Record<string, any>)['aria-describedby']

  // Remove ref from props before spreading
  const { ref: _ref, ...restProps } = props

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      id={resolvedId}
      className={cn('mr-input-base', className)}
      aria-invalid={isInvalid || undefined}
      aria-describedby={describedBy}
      disabled={isDisabled}
      required={isRequired}
      data-size={resolvedSize}
      data-tone={resolvedTone}
      data-invalid={isInvalid ? true : undefined}
      data-disabled={isDisabled ? true : undefined}
      data-required={isRequired ? true : undefined}
      {...restProps}
    >
      {children}
    </Tag>
  )
}
