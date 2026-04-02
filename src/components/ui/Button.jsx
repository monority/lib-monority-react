import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

const variantClassName = {
    primary: 'ui-btn--primary',
    ghost: 'ui-btn--ghost',
    subtle: 'ui-btn--subtle',
}

const sizeClassName = {
    sm: 'ui-btn--sm',
    md: 'ui-btn--md',
    lg: 'ui-btn--lg',
}

export const Button = forwardRef(function Button({
    as: Component = 'button',
    variant = 'primary',
    size = 'md',
    className,
    type = 'button',
    fullWidth = false,
    loading = false,
    iconLeading,
    iconTrailing,
    children,
    disabled,
    ...props
}, ref) {
    const isDisabled = disabled || loading

    return (
        <Component
            ref={ref}
            className={cn(
                'ui-btn',
                variantClassName[variant],
                sizeClassName[size],
                fullWidth && 'ui-btn--full-width',
                loading && 'ui-btn--loading',
                className,
            )}
            type={Component === 'button' ? type : undefined}
            disabled={Component === 'button' ? isDisabled : undefined}
            aria-disabled={Component !== 'button' && isDisabled ? true : undefined}
            aria-busy={loading || undefined}
            {...props}
        >
            {iconLeading ? <span className="ui-btn__icon">{iconLeading}</span> : null}
            <span className="ui-btn__label">{children}</span>
            {iconTrailing ? <span className="ui-btn__icon">{iconTrailing}</span> : null}
        </Component>
    )
})
