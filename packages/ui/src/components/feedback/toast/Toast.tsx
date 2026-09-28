import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/actions/button/Button'
import type { ToastProps, ToastTone } from './Toast.types'

const roleByTone: Record<ToastTone, string> = {
    neutral: 'status',
    success: 'status',
    danger: 'alert',
}

const ariaLiveByTone: Record<ToastTone, 'polite' | 'assertive'> = {
    neutral: 'polite',
    success: 'polite',
    danger: 'assertive',
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
    { tone, title, description, onClose, className, ...props },
    ref
) {
    const resolvedTone = tone ?? 'neutral'

    return (
        <div
            ref={ref}
            className={cn('mr-toast', className)}
            role={roleByTone[resolvedTone]}
            aria-live={ariaLiveByTone[resolvedTone]}
            data-tone={resolvedTone}
            {...props}
        >
            <div className="mr-toast__body">
                <div className="mr-toast__header">
                    <div className="mr-toast__heading">
                        <strong className="mr-toast__title">{title}</strong>
                    </div>
                    {onClose ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mr-toast__close"
                            onClick={onClose}
                            aria-label="Close notification"
                        >
                            x
                        </Button>
                    ) : null}
                </div>
                {description ? <p className="mr-toast__description">{description}</p> : null}
            </div>
        </div>
    )
})

export type { ToastProps, ToastTone } from './Toast.types'
