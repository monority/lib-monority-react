import { cn } from '@/lib/cn'
import type {
    CalloutContentProps,
    CalloutDescriptionProps,
    CalloutIconProps,
    CalloutProps,
    CalloutSize,
    CalloutTitleProps,
    CalloutTone,
} from './Callout.types'

const defaultIcons: Record<CalloutTone, React.ReactElement> = {
    neutral: (
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
    accent: (
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
            <path d="M10 2l1.66 4.34L16 8l-4.34 1.66L10 14l-1.66-4.34L4 8l4.34-1.66L10 2z" />
        </svg>
    ),
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
