import { forwardRef, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { DrawerProps } from './Drawer.types'

const drawerVariants = cva({
  base: 'mr-drawer',
  variants: {
    side: {
      left: 'mr-drawer--left',
      right: 'mr-drawer--right',
      top: 'mr-drawer--top',
      bottom: 'mr-drawer--bottom',
    },
  },
  defaultVariants: { side: 'right' },
})

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  function Drawer(
    { open, title, children, side = 'right', onClose, className, ...props },
    ref,
  ) {
    const generatedId = useId()
    const titleId = `${generatedId}-title`
    const panelRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useBodyScrollLock(open)
    useFocusTrap({ active: open, containerRef: panelRef, initialFocusRef: closeButtonRef, onEscape: onClose })
    const portalTarget = usePortalTarget()

    if (!open || !portalTarget) return null

    return createPortal(
      <div
        ref={ref}
        className={cn('mr-drawer__backdrop', className)}
        data-open={open ? true : undefined}
        data-side={side}
        {...props}
      >
        <div
          className="mr-drawer__backdrop-surface"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          ref={panelRef}
          className={cn(drawerVariants({ side }), 'mr-drawer__panel')}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-side={side}
          data-open={open ? true : undefined}
          tabIndex={-1}
        >
          <header className="mr-drawer__header">
            <h3 id={titleId} className="mr-drawer__title">{title}</h3>
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Fermer le panneau"
            >
              Fermer
            </Button>
          </header>
          <div className="mr-drawer__body">{children}</div>
        </div>
      </div>,
      portalTarget,
    )
  },
)

export type { DrawerProps, DrawerSide } from './Drawer.types'
