import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import type {
    SheetBodyProps,
    SheetCloseProps,
    SheetDescriptionProps,
    SheetFooterProps,
    SheetHeaderProps,
    SheetProps,
    SheetTitleProps,
} from './Sheet.types'

export function Sheet({
    ref,
    open,
    title,
    description,
    children,
    side = 'right',
    footer,
    onClose,
    className,
    ...props
}: SheetProps) {
    const generatedId = useId()
    const titleId = `${generatedId}-title`
    const descriptionId = `${generatedId}-description`
    const panelRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const [closing, setClosing] = useState(false)

    useBodyScrollLock(open && !closing)
    useFocusTrap({
        active: open && !closing,
        containerRef: panelRef,
        initialFocusRef: closeButtonRef,
        onEscape: handleClose,
    })
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

        if ('current' in ref) {
            ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
    }

    useEffect(() => {
        if (!closing) return
        const timer = setTimeout(() => {
            setClosing(false)
            onClose?.()
        }, 150)
        return () => clearTimeout(timer)
    }, [closing, onClose])

    if ((!open && !closing) || !portalTarget) return null

    return createPortal(
        <div
            className={cn('mr-sheet__backdrop', className)}
            data-open={open ? true : undefined}
            data-side={side}
            data-closing={closing ? '' : undefined}
            onClick={handleClose}
            {...props}
        >
            <div className="mr-sheet__backdrop-surface" aria-hidden="true" />
            <div
                ref={setPanelNode}
                className={cn('mr-sheet', 'mr-sheet__panel')}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={description ? descriptionId : undefined}
                data-side={side}
                data-open={open ? true : undefined}
                data-closing={closing ? '' : undefined}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                {title || description ? (
                    <header className="mr-sheet__header">
                        <div className="mr-sheet__heading">
                            {title ? (
                                <h3 id={titleId} className="mr-sheet__title">
                                    {title}
                                </h3>
                            ) : null}
                            {description ? (
                                <p id={descriptionId} className="mr-sheet__description">
                                    {description}
                                </p>
                            ) : null}
                        </div>
                        <Button
                            ref={closeButtonRef}
                            className="mr-sheet__close"
                            variant="ghost"
                            size="sm"
                            onClick={handleClose}
                            aria-label="Fermer le volet"
                        >
                            Fermer
                        </Button>
                    </header>
                ) : null}
                <div className="mr-sheet__body">{children}</div>
                {footer ? <footer className="mr-sheet__footer">{footer}</footer> : null}
            </div>
        </div>,
        portalTarget
    )
}

function SheetHeader({ ref, className, children, ...props }: SheetHeaderProps) {
    return (
        <header ref={ref} className={cn('mr-sheet__header', className)} {...props}>
            {children}
        </header>
    )
}

function SheetTitle({ ref, className, children, ...props }: SheetTitleProps) {
    return (
        <h3 ref={ref} className={cn('mr-sheet__title', className)} {...props}>
            {children}
        </h3>
    )
}

function SheetDescription({ ref, className, children, ...props }: SheetDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-sheet__description', className)} {...props}>
            {children}
        </p>
    )
}

function SheetBody({ ref, className, children, ...props }: SheetBodyProps) {
    return (
        <div ref={ref} className={cn('mr-sheet__body', className)} {...props}>
            {children}
        </div>
    )
}

function SheetFooter({ ref, className, children, ...props }: SheetFooterProps) {
    return (
        <footer ref={ref} className={cn('mr-sheet__footer', className)} {...props}>
            {children}
        </footer>
    )
}

function SheetClose({ ref, className, children = 'Fermer', onClose, ...props }: SheetCloseProps) {
    return (
        <Button
            ref={ref}
            variant="ghost"
            size="sm"
            className={cn('mr-sheet__close', className)}
            onClick={onClose}
            aria-label="Fermer le volet"
            {...props}
        >
            {children}
        </Button>
    )
}

Sheet.Header = SheetHeader
Sheet.Title = SheetTitle
Sheet.Description = SheetDescription
Sheet.Body = SheetBody
Sheet.Footer = SheetFooter
Sheet.Close = SheetClose

export { SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter, SheetClose }
