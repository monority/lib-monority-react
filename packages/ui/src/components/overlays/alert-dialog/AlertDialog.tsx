import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'

type AlertDialogTone = 'danger' | 'default'
interface AlertDialogProps { open: boolean; title: string; description?: string; confirmLabel?: string; cancelLabel?: string; tone?: AlertDialogTone; onConfirm?: () => void; onCancel?: () => void }

export function AlertDialog({ open, title, description, confirmLabel = 'Confirmer', cancelLabel = 'Annuler', tone = 'danger', onConfirm, onCancel }: AlertDialogProps) {
  const titleId = useId(); const descriptionId = useId(); const panelRef = useRef<HTMLDivElement>(null); const cancelButtonRef = useRef<HTMLButtonElement>(null); const portalTarget = usePortalTarget()
  useBodyScrollLock(open); useFocusTrap({ active: open, containerRef: panelRef, initialFocusRef: cancelButtonRef, onEscape: onCancel })
  if (!open || !portalTarget) return null
  return createPortal(<div className="ui-modal" role="presentation"><div className="ui-modal__backdrop" onClick={onCancel} aria-hidden="true" /><div ref={panelRef} className={cn('ui-modal__panel', 'ui-alert-dialog', tone === 'danger' && 'ui-alert-dialog--danger')} role="alertdialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} tabIndex={-1}><div className="stack-m"><header className="stack-s"><h3 className={cn('ui-title', 'ui-modal__title')} id={titleId}>{title}</h3>{description ? <p className="ui-alert-dialog__description" id={descriptionId}>{description}</p> : null}</header><div className="cluster ui-alert-dialog__actions"><Button ref={cancelButtonRef} variant="ghost" onClick={onCancel}>{cancelLabel}</Button><Button className={cn(tone === 'danger' && 'ui-alert-dialog__confirm')} onClick={onConfirm}>{confirmLabel}</Button></div></div></div></div>, portalTarget)
}
