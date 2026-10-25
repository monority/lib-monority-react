import { Button } from '@/components/actions/button/Button'
import { useBodyScrollLock } from '@/internal/use-body-scroll-lock'
import { useFocusTrap } from '@/internal/use-focus-trap'
import { usePortalTarget } from '@/internal/use-portal-target'
import { usePresence } from '@/internal/use-presence'
import { cn } from '@/lib/cn'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import type {
    AlertDialogCancelProps,
    AlertDialogConfirmProps,
    AlertDialogDescriptionProps,
    AlertDialogFooterProps,
    AlertDialogHeaderProps,
    AlertDialogProps,
    AlertDialogTitleProps,
} from './AlertDialog.types'

export function AlertDialog({
    ref,
    open,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    tone = 'default',
    onConfirm,
    onCancel,
    children,
    className,
    ...props
}: AlertDialogProps) {
    const generatedId = useId()
    const titleId = `${generatedId}-title`
    const descriptionId = description ? `${generatedId}-description` : undefined
    const panelRef = useRef<HTMLDivElement>(null)
    const cancelButtonRef = useRef<HTMLButtonElement>(null)

    useBodyScrollLock(open)
    useFocusTrap({
        active: open,
        containerRef: panelRef,
        initialFocusRef: cancelButtonRef,
        onEscape: onCancel,
    })
    const portalTarget = usePortalTarget()
    const { isMounted, presenceProps, ref: presenceRef } = usePresence(open, { durationMs: 200 })

    useEffect(() => {
        if (open) cancelButtonRef.current?.focus()
    }, [open])

    if (!isMounted || !portalTarget) return null

    return createPortal(
        <div
            ref={ref}
            className={cn('mr-alert-dialog__backdrop', className)}
            data-open={open ? true : undefined}
            {...presenceProps}
            {...props}
        >
            <div
                className="mr-alert-dialog__backdrop-surface"
                onClick={onCancel}
                aria-hidden="true"
                data-state={presenceProps['data-state']}
            />
            <div
                ref={(node) => {
                    panelRef.current = node
                    presenceRef(node)
                }}
                className={cn('mr-alert-dialog', 'mr-alert-dialog__panel')}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={descriptionId}
                data-tone={tone}
                data-open={open ? true : undefined}
                data-state={presenceProps['data-state']}
                data-closing={presenceProps['data-closing']}
                tabIndex={-1}
            >
                {children ? (
                    children
                ) : (
                    <>
                        <div className="mr-alert-dialog__header">
                            <div className="mr-alert-dialog__heading">
                                <h2 id={titleId} className="mr-alert-dialog__title">
                                    {title}
                                </h2>
                            </div>
                        </div>
                        {description ? (
                            <p id={descriptionId} className="mr-alert-dialog__description">
                                {description}
                            </p>
                        ) : null}
                        <div className="mr-alert-dialog__actions">
                            <Button
                                ref={cancelButtonRef}
                                className="mr-alert-dialog__cancel"
                                variant="ghost"
                                onClick={onCancel}
                            >
                                {cancelLabel}
                            </Button>
                            <Button
                                className="mr-alert-dialog__confirm"
                                variant={tone === 'danger' ? 'danger' : 'primary'}
                                onClick={onConfirm}
                            >
                                {confirmLabel}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>,
        portalTarget
    )
}

function AlertDialogHeader({ ref, className, children, ...props }: AlertDialogHeaderProps) {
    return (
        <header ref={ref} className={cn('mr-alert-dialog__header', className)} {...props}>
            {children}
        </header>
    )
}

function AlertDialogTitle({ ref, className, children, ...props }: AlertDialogTitleProps) {
    return (
        <h2 ref={ref} className={cn('mr-alert-dialog__title', className)} {...props}>
            {children}
        </h2>
    )
}

function AlertDialogDescription({
    ref,
    className,
    children,
    ...props
}: AlertDialogDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-alert-dialog__description', className)} {...props}>
            {children}
        </p>
    )
}

function AlertDialogFooter({ ref, className, children, ...props }: AlertDialogFooterProps) {
    return (
        <footer
            ref={ref}
            className={cn('mr-alert-dialog__actions', 'mr-alert-dialog__footer', className)}
            {...props}
        >
            {children}
        </footer>
    )
}

function AlertDialogCancel({
    ref,
    className,
    children = 'Cancel',
    variant = 'ghost',
    ...props
}: AlertDialogCancelProps) {
    return (
        <Button
            ref={ref}
            variant={variant}
            className={cn('mr-alert-dialog__cancel', className)}
            {...props}
        >
            {children}
        </Button>
    )
}

function AlertDialogConfirm({
    ref,
    className,
    children = 'Confirm',
    variant = 'primary',
    ...props
}: AlertDialogConfirmProps) {
    return (
        <Button
            ref={ref}
            variant={variant}
            className={cn('mr-alert-dialog__confirm', className)}
            {...props}
        >
            {children}
        </Button>
    )
}

AlertDialogHeader.displayName = 'AlertDialog.Header'
AlertDialogTitle.displayName = 'AlertDialog.Title'
AlertDialogDescription.displayName = 'AlertDialog.Description'
AlertDialogFooter.displayName = 'AlertDialog.Footer'
AlertDialogCancel.displayName = 'AlertDialog.Cancel'
AlertDialogConfirm.displayName = 'AlertDialog.Confirm'

AlertDialog.Header = AlertDialogHeader
AlertDialog.Title = AlertDialogTitle
AlertDialog.Description = AlertDialogDescription
AlertDialog.Footer = AlertDialogFooter
AlertDialog.Actions = AlertDialogFooter
AlertDialog.Cancel = AlertDialogCancel
AlertDialog.Confirm = AlertDialogConfirm

export {
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogFooter as AlertDialogActions,
    AlertDialogCancel,
    AlertDialogConfirm,
}

export type {
    AlertDialogProps,
    AlertDialogTone,
    AlertDialogHeaderProps,
    AlertDialogTitleProps,
    AlertDialogDescriptionProps,
    AlertDialogFooterProps,
    AlertDialogActionsProps,
    AlertDialogCancelProps,
    AlertDialogConfirmProps,
} from './AlertDialog.types'
