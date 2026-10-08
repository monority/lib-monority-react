import { cn } from '@/lib/cn'
import { Input } from '@/components/forms/input/Input'
import type { PasswordInputProps } from './PasswordInput.types'

export function PasswordInput({
    ref,
    size,
    label,
    hint,
    error,
    id,
    className,
    inputClassName,
    disabled = false,
    required = false,
    showToggle = true,
    ...props
}: PasswordInputProps) {
    return (
        <Input
            ref={ref}
            type="password"
            size={size}
            label={label}
            hint={hint}
            error={error}
            id={id}
            className={cn('mr-password-input-field', className)}
            inputClassName={cn('mr-password-input', inputClassName)}
            disabled={disabled}
            required={required}
            showPasswordToggle={showToggle}
            autoComplete="current-password"
            {...props}
        />
    )
}

export type { PasswordInputProps, PasswordInputSize } from './PasswordInput.types'
