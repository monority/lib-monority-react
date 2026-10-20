import { Button } from '@/components/actions/button/Button'
import { IconAlertCircle, IconAlertTriangle, IconCheckCircle, IconInfo } from '@/icons'
import { cn } from '@/lib/cn'
import type {
    InlineAlertActionProps,
    InlineAlertDescriptionProps,
    InlineAlertIconProps,
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

const defaultIcons: Record<InlineAlertTone, React.ReactElement> = {
    info: <IconInfo size={20} />,
    success: <IconCheckCircle size={20} />,
    warning: <IconAlertTriangle size={20} />,
    danger: <IconAlertCircle size={20} />,
}

function InlineAlertIcon({ className, children, ref, ...props }: InlineAlertIconProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-inline-alert__icon', className)}
            aria-hidden="true"
            {...props}
        >
            {children}
        </div>
    )
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
    icon,
    className,
    children,
    role,
    ref,
    ...props
}: InlineAlertProps) {
    const resolvedTone = tone ?? 'info'
    const resolvedRole = role ?? roleByTone[resolvedTone]
    const hasStructuredProps = Boolean(title || description)
    const showIcon = icon !== null

    return (
        <div
            ref={ref}
            className={cn('mr-inline-alert', className)}
            role={resolvedRole}
            data-tone={resolvedTone}
            {...props}
        >
            {showIcon ? (
                <div className="mr-inline-alert__icon" aria-hidden="true">
                    {icon ?? defaultIcons[resolvedTone]}
                </div>
            ) : null}
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

InlineAlert.Icon = InlineAlertIcon
InlineAlert.Title = InlineAlertTitle
InlineAlert.Description = InlineAlertDescription
InlineAlert.Action = InlineAlertAction

export type {
    InlineAlertActionProps,
    InlineAlertDescriptionProps,
    InlineAlertIconProps,
    InlineAlertProps,
    InlineAlertTitleProps,
    InlineAlertTone,
} from './InlineAlert.types'
