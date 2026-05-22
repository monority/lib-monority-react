import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ToastContext } from '../contexts/toast-context'
import { Toast } from '../components/feedback/toast/Toast'
import { usePortalTarget } from '../internal/use-portal-target'

type ToastTone = 'neutral' | 'success' | 'danger'

interface ToastItem {
  id: string
  title?: string
  description?: string
  tone?: ToastTone
  duration?: number
}

interface ToastProviderProps {
  children: React.ReactNode
}

let toastId = 0

function createToastId() {
  toastId += 1
  return `toast-${toastId}`
}

interface ToastContextValue {
  pushToast: (toast: Partial<ToastItem> & { duration?: number }) => string
  dismissToast: (id: string) => void
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    ({ duration = 3600, ...toast }: Partial<ToastItem> & { duration?: number }) => {
      const id = toast.id ?? createToastId()
      setToasts((currentToasts) => [...currentToasts, { ...toast, id, duration } as ToastItem])
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

  const portalTarget = usePortalTarget()

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
      {portalTarget &&
        createPortal(
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
          portalTarget,
        )}
    </ToastContext.Provider>
  )
}
