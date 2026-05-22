import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'

type DrawerSide = 'left' | 'right' | 'top' | 'bottom'
interface DrawerProps { open: boolean; title: string; children: React.ReactNode; side?: DrawerSide; onClose: () => void }

export function Drawer({ open, title, children, side = 'right', onClose }: DrawerProps) {
  const titleId = useId(); const panelRef = useRef<HTMLDivElement>(null); const closeButtonRef = useRef<HTMLButtonElement>(null); const portalTarget = usePortalTarget()
  useBodyScrollLock(open); useFocusTrap({ active: open, containerRef: panelRef, initialFocusRef: closeButtonRef, onEscape: onClose })
  if (!open || !portalTarget) return null
  return createPortal(<div className="ui-modal" role="presentation"><div className="ui-modal__backdrop" onClick={onClose} aria-hidden="true" /><div ref={panelRef} className={cn('ui-drawer', `ui-drawer--${side}`)} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}><header className="ui-drawer__header"><h3 className={cn('ui-title', 'ui-drawer__title')} id={titleId}>{title}</h3><Button ref={closeButtonRef} variant="ghost" size="sm" onClick={onClose} aria-label="Fermer le panneau">Fermer</Button></header><div className="ui-drawer__body">{children}</div></div></div>, portalTarget)
}
