import { Button } from '@/components/actions/button/Button'
import { cn } from '@/lib/cn'
import type {
    ToastCloseProps,
    ToastDescriptionProps,
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
        <Button
            ref={ref}
            variant="ghost"
            size="sm"
            className={cn('mr-toast__close', className)}
            onClick={onClick}
            aria-label="Close notification"
            {...props}
        >
            {children ?? '×'}
        </Button>
    )
}

export function Toast({
    tone,
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

    return (
        <div
            ref={ref}
            className={cn('mr-toast', className)}
            role={resolvedRole}
            aria-live={ariaLiveByTone[resolvedTone]}
            data-tone={resolvedTone}
            {...props}
        >
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

Toast.Title = ToastTitle
Toast.Description = ToastDescription
Toast.Close = ToastClose

export type {
    ToastCloseProps,
    ToastDescriptionProps,
    ToastProps,
    ToastTitleProps,
    ToastTone,
} from './Toast.types'
