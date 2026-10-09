import { useCallback } from 'react'
import { cn } from '@/lib/cn'
import type { ButtonLinkProps } from './ButtonLink.types'

export function ButtonLink({
    href,
    variant = 'secondary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    iconLeading,
    iconTrailing,
    children,
    className,
    onClick,
    onKeyDown,
    ref,
    ...props
}: ButtonLinkProps) {
    const isDisabled = disabled || loading

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            if (isDisabled) {
                event.preventDefault()
                return
            }
            onClick?.(event)
        },
        [isDisabled, onClick]
    )

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLAnchorElement>) => {
            if (isDisabled && event.key === 'Enter') {
                event.preventDefault()
                return
            }
            onKeyDown?.(event)
        },
        [isDisabled, onKeyDown]
    )

    return (
        <a
            ref={ref}
            href={href}
            className={cn('mr-btn', className)}
            aria-disabled={isDisabled ? true : undefined}
            aria-busy={loading ? true : undefined}
            data-variant={variant}
            data-size={size}
            data-disabled={isDisabled ? true : undefined}
            data-loading={loading ? true : undefined}
            data-full-width={fullWidth ? true : undefined}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...props}
        >
            {iconLeading ? (
                <span className="mr-btn__icon" key="leading">
                    {iconLeading}
                </span>
            ) : null}
            {children != null ? (
                <span className="mr-btn__label" key="label">
                    {children}
                </span>
            ) : null}
            {iconTrailing ? (
                <span className="mr-btn__icon" key="trailing">
                    {iconTrailing}
                </span>
            ) : null}
        </a>
    )
}

export type {
    ButtonLinkProps,
    ButtonLinkSize,
    ButtonLinkVariant,
} from './ButtonLink.types'
