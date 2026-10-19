import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import { cn } from '@/lib/cn'
import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import type {
    ModalBodyProps,
    ModalCloseProps,
    ModalDescriptionProps,
    ModalFooterProps,
    ModalHeaderProps,
    ModalProps,
    ModalTitleProps,
} from './Modal.types'

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
                {title || description ? (
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
                ) : null}
                {title || description || footer ? (
                    <div className="mr-modal__body">{children}</div>
                ) : (
                    children
                )}
                {footer ? <footer className="mr-modal__footer">{footer}</footer> : null}
            </div>
        </div>,
        portalTarget
    )
}

function ModalHeader({ ref, className, children, ...props }: ModalHeaderProps) {
    return (
        <header ref={ref} className={cn('mr-modal__header', className)} {...props}>
            {children}
        </header>
    )
}

function ModalTitle({ ref, className, children, ...props }: ModalTitleProps) {
    return (
        <h3 ref={ref} className={cn('mr-title', 'mr-modal__title', className)} {...props}>
            {children}
        </h3>
    )
}

function ModalDescription({ ref, className, children, ...props }: ModalDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-modal__description', className)} {...props}>
            {children}
        </p>
    )
}

function ModalBody({ ref, className, children, ...props }: ModalBodyProps) {
    return (
        <div ref={ref} className={cn('mr-modal__body', className)} {...props}>
            {children}
        </div>
    )
}

function ModalFooter({ ref, className, children, ...props }: ModalFooterProps) {
    return (
        <footer ref={ref} className={cn('mr-modal__footer', className)} {...props}>
            {children}
        </footer>
    )
}

function ModalClose({ ref, className, children, onClose, ...props }: ModalCloseProps) {
    return (
        <Button
            ref={ref}
            className={cn('mr-modal__close', className)}
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Fermer la fenetre"
            {...props}
        >
            {children ?? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                        d="M4 4l8 8M12 4l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            )}
        </Button>
    )
}

Modal.Header = ModalHeader
Modal.Title = ModalTitle
Modal.Description = ModalDescription
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.Close = ModalClose

export { ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose }

export type {
    ModalProps,
    ModalHeaderProps,
    ModalTitleProps,
    ModalDescriptionProps,
    ModalBodyProps,
    ModalFooterProps,
    ModalCloseProps,
} from './Modal.types'
