import { cn } from '@/lib/cn'
import { useFormControl } from '@/primitives/form-control'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import type { FileTriggerProps } from './FileTrigger.types'

export const FileTrigger = forwardRef<HTMLInputElement, FileTriggerProps>(function FileTrigger(
    {
        accept,
        id,
        multiple = false,
        onSelect,
        onChange,
        name,
        directory = false,
        disabled = false,
        required = false,
        invalid = false,
        children,
        className,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-labelledby': ariaLabelledBy,
        ...props
    },
    ref
) {
    const inputRef = useRef<HTMLInputElement>(null)
    const ctx = useFormControl()
    const resolvedId = id ?? ctx.inputId

    useImperativeHandle(ref, () => inputRef.current!, [])

    const handleClick = useCallback(() => {
        if (disabled) return
        inputRef.current?.click()
    }, [disabled])

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files ?? [])
            onSelect?.(files)
            onChange?.(e)
            if (!name) e.target.value = ''
        },
        [name, onChange, onSelect]
    )

    const acceptString = Array.isArray(accept) ? accept.join(',') : accept
    const isInvalid = invalid || ctx.isInvalid
    const actionId = resolvedId ? `${resolvedId}-action` : undefined
    const requiredId = required && resolvedId ? `${resolvedId}-required` : undefined
    const describedBy =
        [ariaDescribedBy ?? ctx.describedBy, requiredId].filter(Boolean).join(' ') || undefined
    const labelledBy = [ariaLabelledBy, actionId].filter(Boolean).join(' ') || undefined

    return (
        <>
            <input
                ref={inputRef}
                id={resolvedId}
                type="file"
                accept={acceptString}
                multiple={multiple}
                disabled={disabled}
                required={required}
                name={name}
                {...(directory ? { webkitdirectory: '' as unknown as string } : {})}
                {...props}
                onChange={handleChange}
                className="mr-file-trigger__input"
                tabIndex={-1}
                aria-label={ariaLabel}
                aria-labelledby={labelledBy}
                aria-describedby={describedBy}
                aria-invalid={isInvalid || undefined}
                aria-required={required || undefined}
                aria-hidden="true"
            />
            <button
                type="button"
                disabled={disabled}
                onClick={handleClick}
                className={cn(
                    'mr-file-trigger',
                    children == null && 'mr-file-trigger--default',
                    className
                )}
                aria-label={ariaLabel}
                aria-labelledby={labelledBy}
                aria-describedby={describedBy}
                aria-invalid={isInvalid || undefined}
                aria-required={required || undefined}
                aria-disabled={disabled || undefined}
                aria-controls={resolvedId}
                data-size={ctx.size}
            >
                <span id={actionId} className="mr-file-trigger__label">
                    {children ?? 'Choose file'}
                </span>
            </button>
            {requiredId ? (
                <span id={requiredId} className="sr-only">
                    Required
                </span>
            ) : null}
        </>
    )
})

export type { FileTriggerProps } from './FileTrigger.types'
