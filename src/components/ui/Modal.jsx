import { useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from './Button'

export function Modal({ open, title, children, onClose }) {
    const titleId = useId()

    if (!open) {
        return null
    }

    return createPortal(
        <div className="ui-modal" role="presentation">
            <div className="ui-modal__backdrop" onClick={onClose} aria-hidden="true" />
            <div
                className="ui-modal__panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                        event.preventDefault()
                        onClose()
                    }
                }}
            >
                <header className="ui-modal__header">
                    <h3 className={cn('ui-title', 'ui-modal__title')} id={titleId}>
                        {title}
                    </h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        aria-label="Fermer la fenetre"
                        autoFocus
                    >
                        Fermer
                    </Button>
                </header>
                <div className="ui-modal__body">{children}</div>
            </div>
        </div>,
        document.body,
    )
}
