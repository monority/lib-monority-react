import { Button } from '@/components/actions/button/Button'
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
    info: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 9v5M10 6h.01" />
        </svg>
    ),
    success: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="10" cy="10" r="8" />
            <path d="M6.5 10l2.5 2.5 4.5-4.5" />
        </svg>
    ),
    warning: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M10 3L2 17h16L10 3zM10 8v4M10 14h.01" />
        </svg>
    ),
    danger: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 7v4M10 13h.01" />
        </svg>
    ),
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
