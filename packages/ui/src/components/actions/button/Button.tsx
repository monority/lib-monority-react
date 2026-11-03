import { IconCheck, IconCopy } from '@/icons'
import { cn } from '@/lib/cn'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ButtonProps } from './Button.types'

/* -- Variants -- */

// Les variantes, tailles et états sont portés par les attributs `data-*`
// (`data-variant`, `data-size`, `data-loading`, `data-full-width`,
// `data-icon-only`, `data-copied`) : plus aucun modifier BEM émis.
// Voir docs/conventions.md ("Un seul jeu de sélecteurs").

/* -- Component -- */

export function Button({
    ref,
    as: Component = 'button',
    variant,
    size,
    className,
    type = 'button',
    fullWidth = false,
    loading = false,
    iconLeading,
    iconTrailing,
    children,
    disabled,
    // Copy mode props
    copyValue,
    copiedLabel = 'Copied!',
    duration = 2000,
    // Icon-only mode props
    iconOnly,
    onClick,
    'aria-label': ariaLabel,
    ...props
}: ButtonProps) {
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    useEffect(() => () => clearTimeout(timeoutRef.current), [])

    const isDisabled = disabled || loading
    const resolvedVariant = variant ?? 'primary'
    const resolvedSize = size ?? 'md'

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            if (isDisabled) {
                event.preventDefault()
                return
            }
            if (copyValue && !copied) {
                navigator.clipboard.writeText(copyValue)
                setCopied(true)
                timeoutRef.current = setTimeout(() => setCopied(false), duration)
            }
            onClick?.(event)
        },
        [isDisabled, copyValue, duration, copied, onClick]
    )

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isDisabled && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault()
                return
            }
            props.onKeyDown?.(event)
        },
        [isDisabled, props.onKeyDown]
    )

    // -- Copy mode icon --
    const showCopyIcon = !!copyValue
    const copyIconEl = showCopyIcon ? (
        <span className="mr-btn__icon" key="copy-icon">
            {copied ? <IconCheck /> : <IconCopy />}
        </span>
    ) : null

    // Label content: only show text if children exist
    const labelContent = showCopyIcon && copied && children ? copiedLabel : children

    // Aria-label for copied state when icon-only (no children text)
    const resolvedAriaLabel = showCopyIcon && copied && !children ? copiedLabel : ariaLabel

    // Leading content: copy icon > iconLeading
    const leadingContent =
        copyIconEl ||
        (iconLeading ? (
            <span className="mr-btn__icon" key="leading">
                {iconLeading}
            </span>
        ) : null)

    return (
        <Component
            ref={ref}
            className={cn('mr-btn', className)}
            type={Component === 'button' ? type : undefined}
            disabled={Component === 'button' ? disabled : undefined}
            aria-disabled={isDisabled ? true : undefined}
            aria-busy={loading || undefined}
            aria-label={resolvedAriaLabel}
            data-variant={resolvedVariant}
            data-size={resolvedSize}
            data-disabled={isDisabled ? true : undefined}
            data-loading={loading ? true : undefined}
            data-full-width={fullWidth ? true : undefined}
            data-icon-only={iconOnly || (showCopyIcon && !children) ? true : undefined}
            data-copied={copied ? true : undefined}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...props}
        >
            {iconOnly || (showCopyIcon && !children) ? (
                <>
                    {copyIconEl}
                    {children != null && (
                        <span className="mr-btn__icon" key="icon">
                            {children}
                        </span>
                    )}
                </>
            ) : (
                <>
                    {leadingContent}
                    {labelContent != null && (
                        <span className="mr-btn__label" key="label">
                            {labelContent}
                        </span>
                    )}
                    {iconTrailing ? (
                        <span className="mr-btn__icon" key="trailing">
                            {iconTrailing}
                        </span>
                    ) : null}
                </>
            )}
        </Component>
    )
}

export type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types'
