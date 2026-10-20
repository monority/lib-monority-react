import {
    IconAlertCircle,
    IconAlertTriangle,
    IconCheckCircle,
    IconInfo,
    IconSparkles,
} from '@/icons'
import { cn } from '@/lib/cn'
import type {
    CalloutContentProps,
    CalloutDescriptionProps,
    CalloutIconProps,
    CalloutProps,
    CalloutTitleProps,
    CalloutTone,
} from './Callout.types'

const defaultIcons: Record<CalloutTone, React.ReactElement> = {
    neutral: <IconInfo size={20} />,
    accent: <IconSparkles size={20} />,
    info: <IconInfo size={20} />,
    success: <IconCheckCircle size={20} />,
    warning: <IconAlertTriangle size={20} />,
    danger: <IconAlertCircle size={20} />,
}

function CalloutIcon({ className, children, ref, ...props }: CalloutIconProps) {
    return (
        <div ref={ref} className={cn('mr-callout__icon', className)} aria-hidden="true" {...props}>
            {children}
        </div>
    )
}

function CalloutTitle({ className, children, ref, ...props }: CalloutTitleProps) {
    return (
        <strong ref={ref} className={cn('mr-callout__title', className)} {...props}>
            {children}
        </strong>
    )
}

function CalloutDescription({ className, children, ref, ...props }: CalloutDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-callout__description', className)} {...props}>
            {children}
        </p>
    )
}

function CalloutContent({ className, children, ref, ...props }: CalloutContentProps) {
    return (
        <div ref={ref} className={cn('mr-callout__content', className)} {...props}>
            {children}
        </div>
    )
}

export function Callout({
    tone = 'neutral',
    size = 'md',
    title,
    description,
    icon,
    children,
    className,
    role = 'note',
    ref,
    ...props
}: CalloutProps) {
    const hasStructuredProps = Boolean(title || description)
    const showIcon = icon !== null

    return (
        <div
            ref={ref}
            className={cn('mr-callout', className)}
            role={role}
            data-tone={tone}
            data-size={size}
            {...props}
        >
            {showIcon ? (
                <div className="mr-callout__icon" aria-hidden="true">
                    {icon ?? defaultIcons[tone]}
                </div>
            ) : null}
            <div className="mr-callout__content">
                {hasStructuredProps ? (
                    <>
                        {title ? <CalloutTitle>{title}</CalloutTitle> : null}
                        {description ? (
                            <CalloutDescription>{description}</CalloutDescription>
                        ) : null}
                        {children}
                    </>
                ) : (
                    children
                )}
            </div>
        </div>
    )
}

Callout.Icon = CalloutIcon
Callout.Title = CalloutTitle
Callout.Description = CalloutDescription
Callout.Content = CalloutContent

export type {
    CalloutContentProps,
    CalloutDescriptionProps,
    CalloutIconProps,
    CalloutProps,
    CalloutSize,
    CalloutTitleProps,
    CalloutTone,
} from './Callout.types'
