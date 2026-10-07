import { cn } from '@/lib/cn'
import type {
    BannerActionsProps,
    BannerCloseProps,
    BannerDescriptionProps,
    BannerEyebrowProps,
    BannerProps,
    BannerTitleProps,
} from './Banner.types'

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

    return (
        <section
            ref={ref}
            className={cn('mr-banner', className)}
            data-tone={tone}
            role={resolvedRole}
            {...props}
        >
            <div className="mr-banner__marker" aria-hidden="true" />
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
    BannerProps,
    BannerTitleProps,
    BannerTone,
} from './Banner.types'
