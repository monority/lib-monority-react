import { forwardRef, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { AlertDialogProps } from './AlertDialog.types'

const alertDialogVariants = cva({
  base: 'mr-alert-dialog',
  variants: {
    tone: {
      default: 'mr-alert-dialog--default',
      danger: 'mr-alert-dialog--danger',
    },
  },
  defaultVariants: { tone: 'default' },
})

export const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(
  function AlertDialog(
    {
      open,
      title,
      description,
      confirmLabel = 'Confirmer',
      cancelLabel = 'Annuler',
      tone = 'default',
      onConfirm,
      onCancel,
      className,
      ...props
    },
    ref,
  ) {
    const generatedId = useId()
    const titleId = `${generatedId}-title`
    const descriptionId = description ? `${generatedId}-description` : undefined
    const panelRef = useRef<HTMLDivElement>(null)
    const cancelButtonRef = useRef<HTMLButtonElement>(null)

    useBodyScrollLock(open)
    useFocusTrap({ active: open, containerRef: panelRef, initialFocusRef: cancelButtonRef, onEscape: onCancel })
    const portalTarget = usePortalTarget()

    useEffect(() => {
      if (open) cancelButtonRef.current?.focus()
    }, [open])

    if (!open || !portalTarget) return null

    return createPortal(
      <div
        ref={ref}
        className={cn('mr-alert-dialog__backdrop', className)}
        data-open={open ? true : undefined}
        {...props}
      >
        <div
          className="mr-alert-dialog__backdrop-surface"
          onClick={onCancel}
          aria-hidden="true"
        />
        <div
          ref={panelRef}
          className={cn(alertDialogVariants({ tone }), 'mr-alert-dialog__panel')}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          data-tone={tone}
          data-open={open ? true : undefined}
          tabIndex={-1}
        >
          <div className="mr-alert-dialog__header">
            <h2 id={titleId} className="mr-alert-dialog__title">{title}</h2>
          </div>
          {description ? (
            <p id={descriptionId} className="mr-alert-dialog__description">{description}</p>
          ) : null}
          <div className="mr-alert-dialog__actions">
            <Button ref={cancelButtonRef} variant="ghost" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button
              variant={tone === 'danger' ? 'danger' : 'primary'}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>,
      portalTarget,
    )
  },
)

export type { AlertDialogProps, AlertDialogTone } from './AlertDialog.types'
