import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import './Modal.css'

interface ModalProps { open: boolean; title: string; children: React.ReactNode; onClose: () => void }

export function Modal({ open, title, children, onClose }: ModalProps) {
  const titleId = useId(); const panelRef = useRef<HTMLDivElement>(null); const closeButtonRef = useRef<HTMLButtonElement>(null); const portalTarget = usePortalTarget()
  useBodyScrollLock(open); useFocusTrap({ active: open, containerRef: panelRef, initialFocusRef: closeButtonRef, onEscape: onClose })
  if (!open || !portalTarget) return null
  return createPortal(<div className="ui-modal" role="presentation"><div className="ui-modal__backdrop" onClick={onClose} aria-hidden="true" /><div ref={panelRef} className="ui-modal__panel" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}><header className="ui-modal__header"><h3 className={cn('ui-title', 'ui-modal__title')} id={titleId}>{title}</h3><Button ref={closeButtonRef} variant="ghost" size="sm" onClick={onClose} aria-label="Fermer la fenetre">Fermer</Button></header><div className="ui-modal__body">{children}</div></div></div>, portalTarget)
}

export type { ModalProps }
