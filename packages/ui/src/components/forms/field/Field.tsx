import { cn } from '@/lib/cn'
import { useFormControl } from '@/primitives/form-control'
import type {
    FieldContentProps,
    FieldDescriptionProps,
    FieldErrorProps,
    FieldGroupProps,
    FieldLabelProps,
    FieldLegendProps,
    FieldProps,
    FieldSeparatorProps,
    FieldSetProps,
    FieldTitleProps,
} from './Field.types'

// ─── Field (composite) ───────────────────────────────────────────────────────

export function Field({
    ref,
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
    ...props
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
            ref={ref}
            className={cn('mr-field', className)}
            data-has-hint={hasHint ? true : undefined}
            data-has-error={hasError ? true : undefined}
            data-required={resolvedRequired ? true : undefined}
            {...props}
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

export function FieldLabel({ ref, required, className, children, ...props }: FieldLabelProps) {
    return (
        <label ref={ref} className={cn('mr-field__label', className)} {...props}>
            {children}
            {required ? <span className="mr-field__required"> *</span> : null}
        </label>
    )
}

// ─── FieldContent ────────────────────────────────────────────────────────────

export function FieldContent({ ref, className, children, ...props }: FieldContentProps) {
    return (
        <div ref={ref} className={cn('mr-field__content', className)} {...props}>
            {children}
        </div>
    )
}

// ─── FieldDescription ────────────────────────────────────────────────────────

export function FieldDescription({ ref, className, children, ...props }: FieldDescriptionProps) {
    return (
        <span ref={ref} className={cn('mr-field__hint', className)} {...props}>
            {children}
        </span>
    )
}

// ─── FieldError ──────────────────────────────────────────────────────────────

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

export function FieldLegend({ ref, required, className, children, ...props }: FieldLegendProps) {
    return (
        <legend ref={ref} className={cn('mr-field__legend', className)} {...props}>
            {children}
            {required ? <span className="mr-field__required"> *</span> : null}
        </legend>
    )
}

// ─── FieldSeparator ──────────────────────────────────────────────────────────

export function FieldSeparator({ ref, className, ...props }: FieldSeparatorProps) {
    return <hr ref={ref} className={cn('mr-field__separator', className)} {...props} />
}

// ─── FieldSet ────────────────────────────────────────────────────────────────

export function FieldSet({ ref, className, children, ...props }: FieldSetProps) {
    return (
        <fieldset ref={ref} className={cn('mr-field__set', className)} {...props}>
            {children}
        </fieldset>
    )
}

// ─── FieldTitle ──────────────────────────────────────────────────────────────

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

Field.Label = FieldLabel
Field.Content = FieldContent
Field.Description = FieldDescription
Field.Error = FieldError
Field.Group = FieldGroup
Field.Legend = FieldLegend
Field.Separator = FieldSeparator
Field.Set = FieldSet
Field.Title = FieldTitle

export type {
    FieldProps,
    FieldLabelProps,
    FieldContentProps,
    FieldDescriptionProps,
    FieldErrorProps,
    FieldGroupProps,
    FieldLegendProps,
    FieldSeparatorProps,
    FieldSetProps,
    FieldTitleProps,
} from './Field.types'
