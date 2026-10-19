import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import { cn } from '@/lib/cn'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type {
    DrawerBodyProps,
    DrawerCloseProps,
    DrawerDescriptionProps,
    DrawerFooterProps,
    DrawerHeaderProps,
    DrawerProps,
    DrawerTitleProps,
} from './Drawer.types'

export function Drawer({
    ref,
    open,
    title,
    description,
    footer,
    children,
    side = 'right',
    onClose,
    className,
    ...props
}: DrawerProps) {
    const generatedId = useId()
    const titleId = `${generatedId}-title`
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
            <div className="mr-drawer__backdrop-surface" aria-hidden="true" />
            <div
                ref={setPanelNode}
                className={cn('mr-drawer', 'mr-drawer__panel')}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                data-side={side}
                data-open={open ? true : undefined}
                data-closing={closing ? '' : undefined}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                {title || description ? (
                    <header className="mr-drawer__header">
                        <div className="mr-drawer__heading">
                            {title ? (
                                <h3 id={titleId} className="mr-drawer__title">
                                    {title}
                                </h3>
                            ) : null}
                            {description ? (
                                <p className="mr-drawer__description">{description}</p>
                            ) : null}
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
                ) : null}
                {title || description || footer ? (
                    <div className="mr-drawer__body">{children}</div>
                ) : (
                    children
                )}
                {footer ? <footer className="mr-drawer__footer">{footer}</footer> : null}
            </div>
        </div>,
        portalTarget
    )
}

function DrawerHeader({ ref, className, children, ...props }: DrawerHeaderProps) {
    return (
        <header ref={ref} className={cn('mr-drawer__header', className)} {...props}>
            {children}
        </header>
    )
}

function DrawerTitle({ ref, className, children, ...props }: DrawerTitleProps) {
    return (
        <h3 ref={ref} className={cn('mr-drawer__title', className)} {...props}>
            {children}
        </h3>
    )
}

function DrawerDescription({ ref, className, children, ...props }: DrawerDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-drawer__description', className)} {...props}>
            {children}
        </p>
    )
}

function DrawerBody({ ref, className, children, ...props }: DrawerBodyProps) {
    return (
        <div ref={ref} className={cn('mr-drawer__body', className)} {...props}>
            {children}
        </div>
    )
}

function DrawerFooter({ ref, className, children, ...props }: DrawerFooterProps) {
    return (
        <footer ref={ref} className={cn('mr-drawer__footer', className)} {...props}>
            {children}
        </footer>
    )
}

function DrawerClose({ ref, className, children = 'Fermer', onClose, ...props }: DrawerCloseProps) {
    return (
        <Button
            ref={ref}
            className={cn('mr-drawer__close', className)}
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Fermer le panneau"
            {...props}
        >
            {children}
        </Button>
    )
}

Drawer.Header = DrawerHeader
Drawer.Title = DrawerTitle
Drawer.Description = DrawerDescription
Drawer.Body = DrawerBody
Drawer.Footer = DrawerFooter
Drawer.Close = DrawerClose

export { DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose }

export type {
    DrawerProps,
    DrawerSide,
    DrawerHeaderProps,
    DrawerTitleProps,
    DrawerDescriptionProps,
    DrawerBodyProps,
    DrawerFooterProps,
    DrawerCloseProps,
} from './Drawer.types'
