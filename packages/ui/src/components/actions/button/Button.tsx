import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { ButtonProps } from './Button.types'

/* -- Inline SVG icons (Lucide-style, no deps) -- */

function CopyIcon() {
  return (
    <svg
      width="1em" height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="1em" height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/* -- Variants -- */

const buttonVariants = cva({
  base: 'mr-btn',
  variants: {
    variant: {
      primary: 'mr-btn--primary',
      secondary: 'mr-btn--secondary',
      muted: 'mr-btn--muted',
      ghost: 'mr-btn--ghost',
      subtle: 'mr-btn--subtle',
      danger: 'mr-btn--danger',
    },
    size: { sm: 'mr-btn--sm', md: 'mr-btn--md', lg: 'mr-btn--lg' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

/* -- Component -- */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
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
  },
  ref,
) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const isDisabled = disabled || loading
  const resolvedVariant = variant ?? 'primary'
  const resolvedSize = size ?? 'md'

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (copyValue && !copied) {
        navigator.clipboard.writeText(copyValue)
        setCopied(true)
        timeoutRef.current = setTimeout(() => setCopied(false), duration)
      }
      onClick?.(event)
    },
    [copyValue, duration, copied, onClick],
  )

  // -- Copy mode icon --
  const showCopyIcon = !!copyValue
  const copyIconEl = showCopyIcon ? (
    <span className="mr-btn__icon" key="copy-icon">
      {copied ? <CheckIcon /> : <CopyIcon />}
    </span>
  ) : null

  // Label content: only show text if children exist
  const labelContent = showCopyIcon && copied && children ? copiedLabel : children

  // Aria-label for copied state when icon-only (no children text)
  const resolvedAriaLabel = showCopyIcon && copied && !children ? copiedLabel : ariaLabel

  // Leading content: copy icon > iconLeading
  const leadingContent = copyIconEl || (iconLeading ? <span className="mr-btn__icon" key="leading">{iconLeading}</span> : null)

  return (
    <Component
      ref={ref}
      className={cn(
        buttonVariants({ variant: resolvedVariant, size: resolvedSize }),
        fullWidth && 'mr-btn--full-width',
        loading && 'mr-btn--loading',
        (iconOnly || (showCopyIcon && !children)) && 'mr-btn--icon-only',
        copied && 'mr-btn--copied',
        className,
      )}
      type={Component === 'button' ? type : undefined}
      disabled={Component === 'button' ? isDisabled : undefined}
      aria-disabled={Component !== 'button' && isDisabled ? true : undefined}
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
      {...props}
    >
      {iconOnly || (showCopyIcon && !children) ? (
        <>{copyIconEl}{children}</>
      ) : (
        <>
          {leadingContent}
          {labelContent != null && <span className="mr-btn__label" key="label">{labelContent}</span>}
          {iconTrailing ? <span className="mr-btn__icon" key="trailing">{iconTrailing}</span> : null}
        </>
      )}
    </Component>
  )
})

export type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types'
