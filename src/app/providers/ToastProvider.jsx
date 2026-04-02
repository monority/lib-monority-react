import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ToastContext } from '@/app/providers/toast-context'
import { Toast } from '@/components/ui'

let toastId = 0

function createToastId() {
    toastId += 1
    return `toast-${toastId}`
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const dismissToast = useCallback((id) => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
    }, [])

    const pushToast = useCallback(
        ({ duration = 3600, ...toast }) => {
            const id = toast.id ?? createToastId()

            setToasts((currentToasts) => [...currentToasts, { ...toast, id, duration }])

            return id
        },
        [],
    )

    useEffect(() => {
        if (!toasts.length) {
            return undefined
        }

        const timers = toasts
            .filter((toast) => toast.duration !== Infinity)
            .map((toast) =>
                window.setTimeout(() => {
                    dismissToast(toast.id)
                }, toast.duration),
            )

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer))
        }
    }, [dismissToast, toasts])

    const value = useMemo(
        () => ({
            pushToast,
            dismissToast,
        }),
        [dismissToast, pushToast],
    )

    return (
        <ToastContext.Provider value={value}>
            {children}
            {createPortal(
                <div className="ui-toast-viewport" aria-live="polite" aria-atomic="false">
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            title={toast.title}
                            description={toast.description}
                            tone={toast.tone}
                            onClose={() => dismissToast(toast.id)}
                        />
                    ))}
                </div>,
                document.body,
            )}
        </ToastContext.Provider>
    )
}
