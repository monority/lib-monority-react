import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { useFormControl } from '@/primitives/form-control'

// ─── Field (composite) ───────────────────────────────────────────────────────

export interface FieldProps {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  required?: boolean
  htmlFor?: string
  hintId?: string
  errorId?: string
  className?: string
  children?: ReactNode
}

export function Field({ label, hint, error, required, htmlFor, hintId, errorId, className, children }: FieldProps) {
  const ctx = useFormControl()
  const resolvedHtmlFor = htmlFor ?? ctx.inputId
  const resolvedHintId = hintId ?? ctx.hintId
  const resolvedErrorId = errorId ?? ctx.errorId
  const resolvedRequired = required ?? ctx.isRequired

  return (
    <div className={cn('mr-field', className)}>
      {label ? (
        <FieldLabel htmlFor={resolvedHtmlFor || undefined} required={resolvedRequired}>
          {label}
        </FieldLabel>
      ) : null}
      {children}
      {hint ? <FieldDescription id={resolvedHintId}>{hint}</FieldDescription> : null}
      {error ? <FieldError id={resolvedErrorId}>{error}</FieldError> : null}
    </div>
  )
}

// ─── FieldLabel ──────────────────────────────────────────────────────────────

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  children?: ReactNode
}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { required, className, children, ...props },
  ref,
) {
  return (
    <label ref={ref} className={cn('mr-field__label', className)} {...props}>
      {children}
      {required ? <span className="mr-field__required"> *</span> : null}
    </label>
  )
})

// ─── FieldContent ────────────────────────────────────────────────────────────

export interface FieldContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const FieldContent = forwardRef<HTMLDivElement, FieldContentProps>(function FieldContent(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('mr-field__content', className)} {...props}>
      {children}
    </div>
  )
})

// ─── FieldDescription ────────────────────────────────────────────────────────

export interface FieldDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
}

export const FieldDescription = forwardRef<HTMLSpanElement, FieldDescriptionProps>(function FieldDescription(
  { className, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn('mr-field__hint', className)} {...props}>
      {children}
    </span>
  )
})

// ─── FieldError ──────────────────────────────────────────────────────────────

export interface FieldErrorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
}

export const FieldError = forwardRef<HTMLSpanElement, FieldErrorProps>(function FieldError(
  { className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn('mr-field__error', className)}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      {children}
    </span>
  )
})

// ─── FieldGroup ──────────────────────────────────────────────────────────────

export interface FieldGroupProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  children?: ReactNode
}

export const FieldGroup = forwardRef<HTMLDivElement, FieldGroupProps>(function FieldGroup(
  { direction = 'column', className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('mr-field__group', `mr-field__group--${direction}`, className)}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── FieldLegend ─────────────────────────────────────────────────────────────

export interface FieldLegendProps extends HTMLAttributes<HTMLLegendElement> {
  required?: boolean
  children?: ReactNode
}

export const FieldLegend = forwardRef<HTMLLegendElement, FieldLegendProps>(function FieldLegend(
  { required, className, children, ...props },
  ref,
) {
  return (
    <legend ref={ref} className={cn('mr-field__legend', className)} {...props}>
      {children}
      {required ? <span className="mr-field__required"> *</span> : null}
    </legend>
  )
})

// ─── FieldSeparator ──────────────────────────────────────────────────────────

export interface FieldSeparatorProps extends HTMLAttributes<HTMLHRElement> {}

export const FieldSeparator = forwardRef<HTMLHRElement, FieldSeparatorProps>(function FieldSeparator(
  { className, ...props },
  ref,
) {
  return <hr ref={ref} className={cn('mr-field__separator', className)} {...props} />
})

// ─── FieldSet ────────────────────────────────────────────────────────────────

export interface FieldSetProps extends HTMLAttributes<HTMLFieldSetElement> {
  children?: ReactNode
}

export const FieldSet = forwardRef<HTMLFieldSetElement, FieldSetProps>(function FieldSet(
  { className, children, ...props },
  ref,
) {
  return (
    <fieldset ref={ref} className={cn('mr-field__set', className)} {...props}>
      {children}
    </fieldset>
  )
})

// ─── FieldTitle ──────────────────────────────────────────────────────────────

export interface FieldTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: ReactNode
}

export const FieldTitle = forwardRef<HTMLHeadingElement, FieldTitleProps>(function FieldTitle(
  { as: Tag = 'h3', className, children, ...props },
  ref,
) {
  return (
    <Tag ref={ref} className={cn('mr-field__title', className)} {...props}>
      {children}
    </Tag>
  )
})
