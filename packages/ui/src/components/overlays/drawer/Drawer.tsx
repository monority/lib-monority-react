import { forwardRef, useEffect, useId, useRef, useState } from 'react'
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
    const [closing, setClosing] = useState(false)

    useBodyScrollLock(open && !closing)
    useFocusTrap({ active: open && !closing, containerRef: panelRef, initialFocusRef: closeButtonRef, onEscape: handleClose })
    const portalTarget = usePortalTarget()

    function handleClose() {
      setClosing(true)
    }

    function setPanelNode(node: HTMLDivElement | null) {
      panelRef.current = node

      if (!ref) return
      if (typeof ref === 'function') {
        ref(node)
        return
      }

      ref.current = node
    }

    useEffect(() => {
      if (!closing) return
      const timer = setTimeout(() => {
        setClosing(false)
        onClose?.()
      }, 200)
      return () => clearTimeout(timer)
    }, [closing, onClose])

    if ((!open && !closing) || !portalTarget) return null

    return createPortal(
      <div
        className={cn('mr-drawer__backdrop', className)}
        data-open={open ? true : undefined}
        data-side={side}
        data-closing={closing ? '' : undefined}
        onClick={handleClose}
        {...props}
      >
        <div
          className="mr-drawer__backdrop-surface"
          aria-hidden="true"
        />
        <div
          ref={setPanelNode}
          className={cn(drawerVariants({ side }), 'mr-drawer__panel')}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-side={side}
          data-open={open ? true : undefined}
          data-closing={closing ? '' : undefined}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          <header className="mr-drawer__header">
            <div className="mr-drawer__heading">
              <h3 id={titleId} className="mr-drawer__title">{title}</h3>
            </div>
            <Button
              ref={closeButtonRef}
              className="mr-drawer__close"
              variant="ghost"
              size="sm"
              onClick={handleClose}
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
