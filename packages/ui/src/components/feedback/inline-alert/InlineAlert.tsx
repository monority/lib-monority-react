import { Button } from '@/components/actions/button/Button'
import { cn } from '@/lib/cn'
import type {
    InlineAlertActionProps,
    InlineAlertDescriptionProps,
    InlineAlertProps,
    InlineAlertTitleProps,
    InlineAlertTone,
} from './InlineAlert.types'

const roleByTone: Record<InlineAlertTone, string> = {
    info: 'status',
    success: 'status',
    warning: 'alert',
    danger: 'alert',
}

function InlineAlertTitle({ className, children, ref, ...props }: InlineAlertTitleProps) {
    return (
        <strong ref={ref} className={cn('mr-inline-alert__title', className)} {...props}>
            {children}
        </strong>
    )
}

function InlineAlertDescription({
    className,
    children,
    ref,
    ...props
}: InlineAlertDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-inline-alert__description', className)} {...props}>
            {children}
        </p>
    )
}

function InlineAlertAction({ className, children, ref, ...props }: InlineAlertActionProps) {
    return (
        <Button
            ref={ref}
            size="sm"
            variant="ghost"
            className={cn('mr-inline-alert__action', className)}
            {...props}
        >
            {children}
        </Button>
    )
}

export function InlineAlert({
    tone,
    title,
    description,
    actionLabel,
    onAction,
    className,
    children,
    role,
    ref,
    ...props
}: InlineAlertProps) {
    const resolvedTone = tone ?? 'info'
    const resolvedRole = role ?? roleByTone[resolvedTone]
    const hasStructuredProps = Boolean(title || description)

    return (
        <div
            ref={ref}
            className={cn('mr-inline-alert', className)}
            role={resolvedRole}
            data-tone={resolvedTone}
            {...props}
        >
            <div className="mr-inline-alert__marker" aria-hidden="true" />
            <div className="mr-inline-alert__body">
                {hasStructuredProps ? (
                    <>
                        {title ? <InlineAlertTitle>{title}</InlineAlertTitle> : null}
                        {description ? (
                            <InlineAlertDescription>{description}</InlineAlertDescription>
                        ) : null}
                        {children}
                    </>
                ) : (
                    children
                )}
            </div>
            {actionLabel ? (
                <InlineAlertAction onClick={onAction}>{actionLabel}</InlineAlertAction>
            ) : null}
        </div>
    )
}

InlineAlert.Title = InlineAlertTitle
InlineAlert.Description = InlineAlertDescription
InlineAlert.Action = InlineAlertAction

export type {
    InlineAlertActionProps,
    InlineAlertDescriptionProps,
    InlineAlertProps,
    InlineAlertTitleProps,
    InlineAlertTone,
} from './InlineAlert.types'
