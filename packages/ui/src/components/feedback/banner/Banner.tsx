import { cn } from '@/lib/cn'
import type {
    BannerActionsProps,
    BannerCloseProps,
    BannerDescriptionProps,
    BannerEyebrowProps,
    BannerIconProps,
    BannerProps,
    BannerTitleProps,
    BannerTone,
} from './Banner.types'

const defaultIcons: Record<BannerTone, React.ReactElement> = {
    neutral: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 9v5M10 6h.01" />
        </svg>
    ),
    accent: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M10 2l1.66 4.34L16 8l-4.34 1.66L10 14l-1.66-4.34L4 8l4.34-1.66L10 2z" />
        </svg>
    ),
    info: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 9v5M10 6h.01" />
        </svg>
    ),
    success: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="10" cy="10" r="8" />
            <path d="M6.5 10l2.5 2.5 4.5-4.5" />
        </svg>
    ),
    warning: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M10 3L2 17h16L10 3zM10 8v4M10 14h.01" />
        </svg>
    ),
    danger: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 7v4M10 13h.01" />
        </svg>
    ),
}

function BannerIcon({ className, children, ref, ...props }: BannerIconProps) {
    return (
        <div ref={ref} className={cn('mr-banner__icon', className)} aria-hidden="true" {...props}>
            {children}
        </div>
    )
}

function BannerTitle({ className, children, ref, ...props }: BannerTitleProps) {
    return (
        <strong ref={ref} className={cn('mr-banner__title', className)} {...props}>
            {children}
        </strong>
    )
}

function BannerDescription({ className, children, ref, ...props }: BannerDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-banner__description', className)} {...props}>
            {children}
        </p>
    )
}

function BannerEyebrow({ className, children, ref, ...props }: BannerEyebrowProps) {
    return (
        <span ref={ref} className={cn('mr-banner__eyebrow', className)} {...props}>
            {children}
        </span>
    )
}

function BannerActions({ className, children, ref, ...props }: BannerActionsProps) {
    return (
        <div ref={ref} className={cn('mr-banner__actions', className)} {...props}>
            {children}
        </div>
    )
}

function BannerClose({ className, children, ref, onClick, ...props }: BannerCloseProps) {
    return (
        <button
            ref={ref}
            type="button"
            className={cn('mr-banner__close', className)}
            aria-label="Fermer l'annonce"
            onClick={onClick}
            {...props}
        >
            {children ?? '×'}
        </button>
    )
}

export function Banner({
    tone = 'info',
    icon,
    eyebrow,
    title,
    description,
    actions,
    dismissible,
    onDismiss,
    open,
    className,
    children,
    role,
    ref,
    ...props
}: BannerProps) {
    if (open === false) return null

    const resolvedRole = role ?? (tone === 'danger' ? 'alert' : 'status')
    const hasStructuredProps = Boolean(eyebrow || title || description)
    const showDismiss = dismissible || Boolean(onDismiss)
    const hasIcon = icon !== false
    const renderedIcon =
        icon && typeof icon !== 'boolean' ? icon : (defaultIcons[tone] ?? defaultIcons.info)

    return (
        <section
            ref={ref}
            className={cn('mr-banner', className)}
            data-tone={tone}
            role={resolvedRole}
            {...props}
        >
            {hasIcon ? <BannerIcon>{renderedIcon}</BannerIcon> : null}
            <div className="mr-banner__body">
                {hasStructuredProps ? (
                    <>
                        {eyebrow ? <BannerEyebrow>{eyebrow}</BannerEyebrow> : null}
                        {title ? <BannerTitle>{title}</BannerTitle> : null}
                        {description ? <BannerDescription>{description}</BannerDescription> : null}
                        {children}
                    </>
                ) : typeof children === 'string' || typeof children === 'number' ? (
                    <BannerDescription>{children}</BannerDescription>
                ) : (
                    children
                )}
            </div>
            {actions || showDismiss ? (
                <BannerActions>
                    {actions}
                    {showDismiss ? <BannerClose onClick={onDismiss} /> : null}
                </BannerActions>
            ) : null}
        </section>
    )
}

Banner.Icon = BannerIcon
Banner.Title = BannerTitle
Banner.Description = BannerDescription
Banner.Eyebrow = BannerEyebrow
Banner.Actions = BannerActions
Banner.Close = BannerClose

export type {
    BannerActionsProps,
    BannerCloseProps,
    BannerDescriptionProps,
    BannerEyebrowProps,
    BannerIconProps,
    BannerProps,
    BannerTitleProps,
    BannerTone,
} from './Banner.types'
