import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from './Button'

export function AlertDialog({
    open,
    title,
    description,
    confirmLabel = 'Confirmer',
    cancelLabel = 'Annuler',
    tone = 'danger',
    onConfirm,
    onCancel,
}) {
    const titleId = useId()
    const descriptionId = useId()
    const panelRef = useRef(null)
    const cancelButtonRef = useRef(null)

    useEffect(() => {
        if (!open) {
            return undefined
        }

        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'

        const frameId = window.requestAnimationFrame(() => {
            cancelButtonRef.current?.focus()
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
            <div className="ui-modal__backdrop" onClick={onCancel} aria-hidden="true" />
            <div
                ref={panelRef}
                className={cn('ui-modal__panel', 'ui-alert-dialog', tone === 'danger' && 'ui-alert-dialog--danger')}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={description ? descriptionId : undefined}
                tabIndex={-1}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                        event.preventDefault()
                        onCancel?.()
                    }
                }}
            >
                <div className="stack-m">
                    <header className="stack-s">
                        <h3 className={cn('ui-title', 'ui-modal__title')} id={titleId}>
                            {title}
                        </h3>
                        {description ? (
                            <p className="ui-alert-dialog__description" id={descriptionId}>
                                {description}
                            </p>
                        ) : null}
                    </header>

                    <div className="cluster ui-alert-dialog__actions">
                        <Button
                            ref={cancelButtonRef}
                            variant="ghost"
                            onClick={onCancel}
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            className={cn(tone === 'danger' && 'ui-alert-dialog__confirm')}
                            onClick={onConfirm}
                        >
                            {confirmLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    )
}
