import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import type { ModalProps } from './Modal.types'

export function Modal({
    ref,
    open,
    title,
    description,
    footer,
    children,
    onClose,
    className,
    ...props
}: ModalProps) {
    const titleId = useId()
    const descriptionId = useId()
    const panelRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const portalTarget = usePortalTarget()

    useBodyScrollLock(open)
    useFocusTrap({
        active: open,
        containerRef: panelRef,
        initialFocusRef: closeButtonRef,
        onEscape: onClose,
    })

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
                aria-describedby={description ? descriptionId : undefined}
                tabIndex={-1}
            >
                <header className="mr-modal__header">
                    <div className="mr-modal__heading">
                        <h3 className={cn('mr-title', 'mr-modal__title')} id={titleId}>
                            {title}
                        </h3>
                        {description ? (
                            <p className="mr-modal__description" id={descriptionId}>
                                {description}
                            </p>
                        ) : null}
                    </div>
                    <Button
                        ref={closeButtonRef}
                        className="mr-modal__close"
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        aria-label="Fermer la fenetre"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M4 4l8 8M12 4l-8 8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </Button>
                </header>
                <div className="mr-modal__body">{children}</div>
                {footer ? <footer className="mr-modal__footer">{footer}</footer> : null}
            </div>
        </div>,
        portalTarget
    )
}

export type { ModalProps } from './Modal.types'
