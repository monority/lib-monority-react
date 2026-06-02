import { forwardRef, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { ModalProps } from './Modal.types'

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal({ open, title, children, onClose, className, ...props }, ref) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const portalTarget = usePortalTarget()

  useBodyScrollLock(open)
  useFocusTrap({ active: open, containerRef: panelRef, initialFocusRef: closeButtonRef, onEscape: onClose })

  if (!open || !portalTarget) return null

  return createPortal(
    <div
      ref={ref}
      className={cn('mr-modal', className)}
      role="presentation"
      data-open={open ? true : undefined}
      {...props}
    >
      <div className="mr-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="mr-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="mr-modal__header">
          <div className="mr-modal__heading">
            <h3 className={cn('mr-title', 'mr-modal__title')} id={titleId}>
              {title}
            </h3>
          </div>
          <Button
            ref={closeButtonRef}
            className="mr-modal__close"
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Fermer la fenetre"
          >
            Fermer
          </Button>
        </header>
        <div className="mr-modal__body">{children}</div>
      </div>
    </div>,
    portalTarget,
  )
})

export type { ModalProps } from './Modal.types'
