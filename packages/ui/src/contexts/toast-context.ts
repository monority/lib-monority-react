import { createContext } from 'react'

type ToastTone = 'neutral' | 'success' | 'danger'

export const ToastContext = createContext<{ pushToast: (toast: { title?: string; description?: string; tone?: ToastTone; duration?: number }) => string; dismissToast: (id: string) => void } | null>(null)
ToastContext.displayName = 'ToastContext'
