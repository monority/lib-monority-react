import type { HTMLAttributes, LabelHTMLAttributes, ReactNode, Ref } from 'react'
import { cn } from '@/lib/cn'
import { useFormControl } from '@/primitives/form-control'

// ─── Field (composite) ───────────────────────────────────────────────────────

export interface FieldProps {
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    required?: boolean
    htmlFor?: string
    labelId?: string
    hintId?: string
    errorId?: string
    className?: string
    children?: ReactNode
}

export function Field({
    label,
    hint,
    error,
    required,
    htmlFor,
    labelId,
    hintId,
    errorId,
    className,
    children,
}: FieldProps) {
    const ctx = useFormControl()
    const resolvedHtmlFor = htmlFor ?? ctx.inputId
    const resolvedHintId = hintId ?? ctx.hintId
    const resolvedErrorId = errorId ?? ctx.errorId
    const resolvedRequired = required ?? ctx.isRequired
    const hasHint = Boolean(hint)
    const hasError = Boolean(error)

    return (
        <div
            className={cn('mr-field', className)}
            data-has-hint={hasHint ? true : undefined}
            data-has-error={hasError ? true : undefined}
            data-required={resolvedRequired ? true : undefined}
        >
            {label != null ? (
                <FieldLabel
                    id={labelId}
                    htmlFor={resolvedHtmlFor || undefined}
                    required={resolvedRequired}
                >
                    {label}
                </FieldLabel>
            ) : null}
            {children}
            {hasHint ? <FieldDescription id={resolvedHintId}>{hint}</FieldDescription> : null}
            {hasError ? <FieldError id={resolvedErrorId}>{error}</FieldError> : null}
        </div>
    )
}

// ─── FieldLabel ──────────────────────────────────────────────────────────────

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    ref?: Ref<HTMLLabelElement>
    required?: boolean
    children?: ReactNode
}

export function FieldLabel({ ref, required, className, children, ...props }: FieldLabelProps) {
    return (
        <label ref={ref} className={cn('mr-field__label', className)} {...props}>
            {children}
            {required ? <span className="mr-field__required"> *</span> : null}
        </label>
    )
}

// ─── FieldContent ────────────────────────────────────────────────────────────

export interface FieldContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export function FieldContent({ ref, className, children, ...props }: FieldContentProps) {
    return (
        <div ref={ref} className={cn('mr-field__content', className)} {...props}>
            {children}
        </div>
    )
}

// ─── FieldDescription ────────────────────────────────────────────────────────

export interface FieldDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    children?: ReactNode
}

export function FieldDescription({ ref, className, children, ...props }: FieldDescriptionProps) {
    return (
        <span ref={ref} className={cn('mr-field__hint', className)} {...props}>
            {children}
        </span>
    )
}

// ─── FieldError ──────────────────────────────────────────────────────────────

export interface FieldErrorProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    children?: ReactNode
}

export function FieldError({ ref, className, children, ...props }: FieldErrorProps) {
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
}

// ─── FieldGroup ──────────────────────────────────────────────────────────────

export interface FieldGroupProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    direction?: 'row' | 'column'
    children?: ReactNode
}

export function FieldGroup({
    ref,
    direction = 'column',
    className,
    children,
    ...props
}: FieldGroupProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-field__group', `mr-field__group--${direction}`, className)}
            {...props}
        >
            {children}
        </div>
    )
}

// ─── FieldLegend ─────────────────────────────────────────────────────────────

export interface FieldLegendProps extends HTMLAttributes<HTMLLegendElement> {
    ref?: Ref<HTMLLegendElement>
    required?: boolean
    children?: ReactNode
}

export function FieldLegend({ ref, required, className, children, ...props }: FieldLegendProps) {
    return (
        <legend ref={ref} className={cn('mr-field__legend', className)} {...props}>
            {children}
            {required ? <span className="mr-field__required"> *</span> : null}
        </legend>
    )
}

// ─── FieldSeparator ──────────────────────────────────────────────────────────

export interface FieldSeparatorProps extends HTMLAttributes<HTMLHRElement> {
    ref?: Ref<HTMLHRElement>
}

export function FieldSeparator({ ref, className, ...props }: FieldSeparatorProps) {
    return <hr ref={ref} className={cn('mr-field__separator', className)} {...props} />
}

// ─── FieldSet ────────────────────────────────────────────────────────────────

export interface FieldSetProps extends HTMLAttributes<HTMLFieldSetElement> {
    ref?: Ref<HTMLFieldSetElement>
    children?: ReactNode
}

export function FieldSet({ ref, className, children, ...props }: FieldSetProps) {
    return (
        <fieldset ref={ref} className={cn('mr-field__set', className)} {...props}>
            {children}
        </fieldset>
    )
}

// ─── FieldTitle ──────────────────────────────────────────────────────────────

export interface FieldTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>
    as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    children?: ReactNode
}

export function FieldTitle({
    ref,
    as: Tag = 'h3',
    className,
    children,
    ...props
}: FieldTitleProps) {
    return (
        <Tag ref={ref} className={cn('mr-field__title', className)} {...props}>
            {children}
        </Tag>
    )
}
