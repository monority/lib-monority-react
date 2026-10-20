import {
    IconAlertCircle,
    IconAlertTriangle,
    IconBell,
    IconCheckCircle,
    IconClose,
    IconInfo,
    IconSparkles,
} from '@/icons'
import { usePresence } from '@/internal/use-presence'
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
    success: <IconCheckCircle size={20} />,
    warning: <IconAlertTriangle size={20} />,
    danger: <IconAlertCircle size={20} />,
    info: <IconInfo size={20} />,
    accent: <IconSparkles size={20} />,
    neutral: <IconBell size={20} />,
}

const defaultCloseIcon = <IconClose size={14} />

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
    open,
    tone,
    icon,
    title,
    description,
    onClose,
    onOpenChange,
    onExitComplete,
    className,
    children,
    role,
    ref,
    ...props
}: ToastProps) {
    const isControlled = open !== undefined
    const presence = usePresence(isControlled ? open : true, {
        durationMs: 150,
        onExitComplete,
    })

    const resolvedTone: ToastTone = tone ?? 'neutral'
    const resolvedRole = role ?? roleByTone[resolvedTone]
    const handleClose = () => {
        onClose?.()
        onOpenChange?.(false)
    }
    const hasClose = Boolean(onClose || onOpenChange)
    const hasStructuredProps = Boolean(title || description)
    const resolvedIcon = icon === null ? null : (icon ?? defaultIcons[resolvedTone])

    if (isControlled && !presence.isMounted) {
        return null
    }

    const handleRef = (node: HTMLDivElement | null) => {
        if (isControlled) {
            presence.ref(node)
        }
        if (typeof ref === 'function') {
            ref(node)
        } else if (ref && 'current' in ref) {
            ;(ref as { current: HTMLDivElement | null }).current = node
        }
    }

    return (
        <div
            ref={handleRef}
            className={cn('mr-toast', className)}
            role={resolvedRole}
            aria-live={ariaLiveByTone[resolvedTone]}
            data-tone={resolvedTone}
            {...(isControlled ? presence.presenceProps : {})}
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
