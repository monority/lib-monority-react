import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import type { TextareaProps } from './Textarea.types'

const textareaVariants = cva({
  base: 'mr-textarea',
  variants: {
    tone: {
      neutral: 'mr-textarea--neutral',
      accent: 'mr-textarea--accent',
      danger: 'mr-textarea--danger',
    },
    size: {
      sm: 'mr-textarea--sm',
      md: 'mr-textarea--md',
      lg: 'mr-textarea--lg',
    },
  },
  defaultVariants: { tone: 'neutral', size: 'md' },
})

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
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
    rows = 5,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const textareaId = id || generatedId
  const hintId = hint ? `${textareaId}-hint` : undefined
  const errorId = error ? `${textareaId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const resolvedTone = tone ?? 'neutral'
  const resolvedSize = size ?? 'md'
  const isInvalid = invalid || Boolean(error)

  return (
    <Field
      className={className}
      htmlFor={textareaId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      hintId={hintId}
      errorId={errorId}
    >
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          textareaVariants({ tone: resolvedTone, size: resolvedSize }),
          disabled && 'mr-textarea--disabled',
          isInvalid && 'mr-textarea--invalid',
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
      />
    </Field>
  )
})

export type { TextareaProps, TextareaTone, TextareaSize } from './Textarea.types'
