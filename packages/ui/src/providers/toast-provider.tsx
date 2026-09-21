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

/**
 * Owns its own auto-dismiss timer so that adding or removing another toast
 * never resets an existing countdown.
 */
function TimedToast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  const { id, title, description, tone, duration } = toast

  useEffect(() => {
    if (duration === Infinity) {
      return undefined
    }
    const timer = window.setTimeout(() => onDismiss(id), duration)
    return () => window.clearTimeout(timer)
  }, [duration, id, onDismiss])

  return (
    <Toast
      title={title}
      description={description}
      tone={tone}
      onClose={() => onDismiss(id)}
    />
  )
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
          <div className="mr-toast-viewport" aria-live="polite" aria-atomic="false">
            {toasts.map((toast) => (
              <TimedToast key={toast.id} toast={toast} onDismiss={dismissToast} />
            ))}
          </div>,
          portalTarget,
        )}
    </ToastContext.Provider>
  )
}
