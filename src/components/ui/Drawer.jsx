import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from './Button'

export function Drawer({
    open,
    title,
    children,
    side = 'right',
    onClose,
}) {
    const titleId = useId()
    const panelRef = useRef(null)

    useEffect(() => {
        if (!open) {
            return undefined
        }

        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'

        const frameId = window.requestAnimationFrame(() => {
            panelRef.current?.focus()
        })

        return () => {
            window.cancelAnimationFrame(frameId)
            document.body.style.overflow = overflow
        }
    }, [open])

    if (!open) {
        return null
    }

    return createPortal(
        <div className="ui-modal" role="presentation">
            <div className="ui-modal__backdrop" onClick={onClose} aria-hidden="true" />
            <div
                ref={panelRef}
                className={cn('ui-drawer', `ui-drawer--${side}`)}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                        event.preventDefault()
                        onClose?.()
                    }
                }}
            >
                <header className="ui-drawer__header">
                    <h3 className={cn('ui-title', 'ui-drawer__title')} id={titleId}>
                        {title}
                    </h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        aria-label="Fermer le panneau"
                    >
                        Fermer
                    </Button>
                </header>
                <div className="ui-drawer__body">{children}</div>
            </div>
        </div>,
        document.body,
    )
}
