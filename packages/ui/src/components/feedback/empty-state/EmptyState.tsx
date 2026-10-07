import { Spinner } from '@/components/feedback/spinner/Spinner'
import { cn } from '@/lib/cn'
import type {
    EmptyStateActionsProps,
    EmptyStateDescriptionProps,
    EmptyStateIconProps,
    EmptyStateProps,
    EmptyStateStatus,
    EmptyStateTitleProps,
} from './EmptyState.types'

function EmptyStateIcon({ className, children, ref, ...props }: EmptyStateIconProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-empty-state__icon', className)}
            aria-hidden="true"
            {...props}
        >
            {children}
        </div>
    )
}

function EmptyStateTitle({ className, children, ref, ...props }: EmptyStateTitleProps) {
    return (
        <h3
            ref={ref as React.Ref<HTMLHeadingElement>}
            className={cn('mr-empty-state__title', className)}
            {...props}
        >
            {children}
        </h3>
    )
}

function EmptyStateDescription({ className, children, ref, ...props }: EmptyStateDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-empty-state__description', className)} {...props}>
            {children}
        </p>
    )
}

function EmptyStateActions({ className, children, ref, ...props }: EmptyStateActionsProps) {
    return (
        <div ref={ref} className={cn('mr-empty-state__actions', className)} {...props}>
            {children}
        </div>
    )
}

export function EmptyState({
    title,
    description,
    icon,
    action,
    secondaryAction,
    state = 'empty',
    className,
    children,
    role,
    ref,
    ...props
}: EmptyStateProps) {
    const resolvedRole = role ?? (state === 'error' ? 'alert' : 'status')
    const isLoading = state === 'loading'
    const hasStructuredProps = Boolean(title || description)

    const renderedIcon = isLoading ? (
        <EmptyStateIcon>
            <Spinner size="md" tone="muted" aria-hidden="true" />
        </EmptyStateIcon>
    ) : icon ? (
        <EmptyStateIcon>{icon}</EmptyStateIcon>
    ) : null

    return (
        <div
            ref={ref}
            className={cn('mr-empty-state', className)}
            role={resolvedRole}
            data-state={state}
            aria-busy={isLoading ? 'true' : undefined}
            data-has-icon={renderedIcon ? 'true' : undefined}
            data-has-actions={action || secondaryAction ? 'true' : undefined}
            {...props}
        >
            {renderedIcon}
            <div className="mr-empty-state__content">
                {hasStructuredProps ? (
                    <>
                        {title ? <EmptyStateTitle>{title}</EmptyStateTitle> : null}
                        {description ? (
                            <EmptyStateDescription>{description}</EmptyStateDescription>
                        ) : null}
                        {children}
                    </>
                ) : (
                    children
                )}
            </div>
            {action || secondaryAction ? (
                <EmptyStateActions>
                    {action}
                    {secondaryAction}
                </EmptyStateActions>
            ) : null}
        </div>
    )
}

EmptyState.Icon = EmptyStateIcon
EmptyState.Title = EmptyStateTitle
EmptyState.Description = EmptyStateDescription
EmptyState.Actions = EmptyStateActions

export type {
    EmptyStateActionsProps,
    EmptyStateDescriptionProps,
    EmptyStateIconProps,
    EmptyStateProps,
    EmptyStateStatus,
    EmptyStateTitleProps,
} from './EmptyState.types'
