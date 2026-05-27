import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Button } from '@/components/actions/button/Button'
import type { ToastProps, ToastTone } from './Toast.types'

const toastVariants = cva({
  base: 'mr-toast',
  variants: {
    tone: {
      neutral: 'mr-toast--neutral',
      success: 'mr-toast--success',
      danger: 'mr-toast--danger',
    },
  },
  defaultVariants: { tone: 'neutral' },
})

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
  ref,
) {
  const resolvedTone = tone ?? 'neutral'

  return (
    <div
      ref={ref}
      className={cn(toastVariants({ tone: resolvedTone }), className)}
      role={roleByTone[resolvedTone]}
      aria-live={ariaLiveByTone[resolvedTone]}
      data-tone={resolvedTone}
      {...props}
    >
      <div className="mr-toast__body">
        <div className="mr-toast__header">
          <strong className="mr-toast__title">{title}</strong>
          {onClose ? (
            <Button
              variant="ghost"
              size="sm"
              className="mr-toast__close"
              onClick={onClose}
              aria-label="Close notification"
            >
              ×
            </Button>
          ) : null}
        </div>
        {description ? <p className="mr-toast__description">{description}</p> : null}
      </div>
    </div>
  )
})

export type { ToastProps, ToastTone } from './Toast.types'
