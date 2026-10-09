import { cn } from '@/lib/cn'
import type {
    ToastCloseProps,
    ToastDescriptionProps,
    ToastIconProps,
    ToastProps,
    ToastTitleProps,
    ToastTone,
} from './Toast.types'

const roleByTone: Record<ToastTone, string> = {
    neutral: 'status',
    accent: 'status',
    info: 'status',
    success: 'status',
    warning: 'alert',
    danger: 'alert',
}

const ariaLiveByTone: Record<ToastTone, 'polite' | 'assertive'> = {
    neutral: 'polite',
    accent: 'polite',
    info: 'polite',
    success: 'polite',
    warning: 'assertive',
    danger: 'assertive',
}

const defaultIcons: Record<ToastTone, React.ReactElement> = {
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
            <path d="M10 2.5L2 16.5h16L10 2.5z" />
            <path d="M10 7.5v4" />
            <circle cx="10" cy="14" r="0.75" fill="currentColor" stroke="none" />
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
            <path d="M10 6.5v4.5" />
            <circle cx="10" cy="14" r="0.75" fill="currentColor" stroke="none" />
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
            <path d="M10 9v4.5M10 6.5h.01" />
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
            <path d="M10 2v16M2 10h16M4.5 4.5l11 11M15.5 4.5l-11 11" />
        </svg>
    ),
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
            <path d="M15 13.5H5c.5-1 1.5-2.5 1.5-5a3.5 3.5 0 017 0c0 2.5 1 4 1.5 5z" />
            <path d="M8.5 16a1.5 1.5 0 003 0" />
        </svg>
    ),
}

const defaultCloseIcon = (
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M11 3L3 11M3 3l8 8" />
    </svg>
)

function ToastIcon({ className, children, ref, ...props }: ToastIconProps) {
    return (
        <div ref={ref} className={cn('mr-toast__icon', className)} aria-hidden="true" {...props}>
            {children}
        </div>
    )
}

function ToastTitle({ className, children, ref, ...props }: ToastTitleProps) {
    return (
        <strong ref={ref} className={cn('mr-toast__title', className)} {...props}>
            {children}
        </strong>
    )
}

function ToastDescription({ className, children, ref, ...props }: ToastDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-toast__description', className)} {...props}>
            {children}
        </p>
    )
}

function ToastClose({ className, children, ref, onClick, ...props }: ToastCloseProps) {
    return (
        <button
            ref={ref}
            type="button"
            className={cn('mr-toast__close', className)}
            onClick={onClick}
            aria-label="Fermer la notification"
            {...props}
        >
            {children ?? defaultCloseIcon}
        </button>
    )
}

export function Toast({
    tone,
    icon,
    title,
    description,
    onClose,
    onOpenChange,
    className,
    children,
    role,
    ref,
    ...props
}: ToastProps) {
    const resolvedTone: ToastTone = tone ?? 'neutral'
    const resolvedRole = role ?? roleByTone[resolvedTone]
    const handleClose = () => {
        onClose?.()
        onOpenChange?.(false)
    }
    const hasClose = Boolean(onClose || onOpenChange)
    const hasStructuredProps = Boolean(title || description)
    const resolvedIcon = icon === null ? null : (icon ?? defaultIcons[resolvedTone])

    return (
        <div
            ref={ref}
            className={cn('mr-toast', className)}
            role={resolvedRole}
            aria-live={ariaLiveByTone[resolvedTone]}
            data-tone={resolvedTone}
            {...props}
        >
            {resolvedIcon ? <ToastIcon>{resolvedIcon}</ToastIcon> : null}
            <div className="mr-toast__body">
                {hasStructuredProps ? (
                    <>
                        <div className="mr-toast__header">
                            <div className="mr-toast__heading">
                                {title ? <ToastTitle>{title}</ToastTitle> : null}
                            </div>
                            {hasClose ? <ToastClose onClick={handleClose} /> : null}
                        </div>
                        {description ? <ToastDescription>{description}</ToastDescription> : null}
                        {children}
                    </>
                ) : (
                    <>
                        {children}
                        {hasClose ? <ToastClose onClick={handleClose} /> : null}
                    </>
                )}
            </div>
        </div>
    )
}

Toast.Icon = ToastIcon
Toast.Title = ToastTitle
Toast.Description = ToastDescription
Toast.Close = ToastClose

export type {
    ToastCloseProps,
    ToastDescriptionProps,
    ToastIconProps,
    ToastProps,
    ToastTitleProps,
    ToastTone,
} from './Toast.types'
