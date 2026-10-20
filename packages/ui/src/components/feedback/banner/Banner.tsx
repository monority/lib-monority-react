import {
    IconAlertCircle,
    IconAlertTriangle,
    IconCheckCircle,
    IconClose,
    IconInfo,
    IconSparkles,
} from '@/icons'
import { usePresence } from '@/internal/use-presence'
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
    neutral: <IconInfo size={20} />,
    accent: <IconSparkles size={20} />,
    info: <IconInfo size={20} />,
    success: <IconCheckCircle size={20} />,
    warning: <IconAlertTriangle size={20} />,
    danger: <IconAlertCircle size={20} />,
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
            {children ?? <IconClose size={14} />}
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
    const isControlled = open !== undefined
    const { isMounted, isClosing, presenceProps } = usePresence(open ?? true)

    if (isControlled && !isMounted) return null
    if (!isControlled && open === false) return null

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
            data-state={presenceProps['data-state']}
            data-closing={isClosing ? '' : undefined}
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
