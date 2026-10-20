import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Toast } from '../components/feedback/toast/Toast'
import { ToastContext } from '../contexts/toast-context'
import { usePortalTarget } from '../internal/use-portal-target'

type ToastTone = 'neutral' | 'success' | 'danger'

interface ToastItem {
    id: string
    title?: string
    description?: string
    tone?: ToastTone
    duration?: number
    closing?: boolean
}

interface ToastProviderProps {
    children: React.ReactNode
}

let toastId = 0

function createToastId() {
    toastId += 1
    return `toast-${toastId}`
}

/**
 * Owns its own auto-dismiss timer so that adding or removing another toast
 * never resets an existing countdown.
 * Coordinates smooth exit animation before removing the toast from DOM.
 */
function TimedToast({
    toast,
    onDismiss,
    onRemove,
}: {
    toast: ToastItem
    onDismiss: (id: string) => void
    onRemove: (id: string) => void
}) {
    const { id, title, description, tone, duration, closing } = toast
    const [localClosing, setLocalClosing] = useState(false)
    const isClosing = Boolean(closing || localClosing)

    useEffect(() => {
        if (duration === Number.POSITIVE_INFINITY || isClosing) {
            return undefined
        }
        const timer = window.setTimeout(() => {
            setLocalClosing(true)
            onDismiss(id)
        }, duration)
        return () => window.clearTimeout(timer)
    }, [duration, id, isClosing, onDismiss])

    const handleClose = useCallback(() => {
        setLocalClosing(true)
        onDismiss(id)
    }, [id, onDismiss])

    const handleExitComplete = useCallback(() => {
        onRemove(id)
    }, [id, onRemove])

    return (
        <Toast
            open={!isClosing}
            title={title}
            description={description}
            tone={tone}
            onClose={handleClose}
            onExitComplete={handleExitComplete}
        />
    )
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const dismissToast = useCallback((id: string) => {
        setToasts((currentToasts) =>
            currentToasts.map((toast) => (toast.id === id ? { ...toast, closing: true } : toast))
        )
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
    }, [])

    const pushToast = useCallback(
        ({ duration = 3600, ...toast }: Partial<ToastItem> & { duration?: number }) => {
            const id = toast.id ?? createToastId()
            setToasts((currentToasts) => [
                ...currentToasts,
                { ...toast, id, duration } as ToastItem,
            ])
            return id
        },
        []
    )

    const portalTarget = usePortalTarget()

    const value = useMemo(
        () => ({
            pushToast,
            dismissToast,
        }),
        [dismissToast, pushToast]
    )

    return (
        <ToastContext.Provider value={value}>
            {children}
            {portalTarget &&
                createPortal(
                    <div className="mr-toast-viewport" aria-live="polite" aria-atomic="false">
                        {toasts.map((toast) => (
                            <TimedToast
                                key={toast.id}
                                toast={toast}
                                onDismiss={dismissToast}
                                onRemove={removeToast}
                            />
                        ))}
                    </div>,
                    portalTarget
                )}
        </ToastContext.Provider>
    )
}
