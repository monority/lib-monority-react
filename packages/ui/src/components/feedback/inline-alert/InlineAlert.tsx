import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Button } from '@/components/actions/button/Button'
import type { InlineAlertProps, InlineAlertTone } from './InlineAlert.types'

const inlineAlertVariants = cva({
  base: 'mr-inline-alert',
  variants: {
    tone: {
      info: 'mr-inline-alert--info',
      success: 'mr-inline-alert--success',
      warning: 'mr-inline-alert--warning',
      danger: 'mr-inline-alert--danger',
    },
  },
  defaultVariants: { tone: 'info' },
})

const roleByTone: Record<InlineAlertTone, string> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  danger: 'alert',
}

export const InlineAlert = forwardRef<HTMLDivElement, InlineAlertProps>(
  function InlineAlert(
    { tone, title, description, actionLabel, onAction, className, ...props },
    ref,
  ) {
    const resolvedTone = tone ?? 'info'

    return (
      <div
        ref={ref}
        className={cn(inlineAlertVariants({ tone: resolvedTone }), className)}
        role={roleByTone[resolvedTone]}
        data-tone={resolvedTone}
        {...props}
      >
        <div className="mr-inline-alert__marker" aria-hidden="true" />
        <div className="mr-inline-alert__body">
          {title ? <strong className="mr-inline-alert__title">{title}</strong> : null}
          {description ? <p className="mr-inline-alert__description">{description}</p> : null}
        </div>
        {actionLabel ? (
          <Button size="sm" variant="ghost" onClick={onAction} className="mr-inline-alert__action">
            {actionLabel}
          </Button>
        ) : null}
      </div>
    )
  },
)

export type { InlineAlertProps, InlineAlertTone } from './InlineAlert.types'
