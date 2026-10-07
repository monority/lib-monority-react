import { cn } from '@/lib/cn'
import type {
    CalloutContentProps,
    CalloutDescriptionProps,
    CalloutProps,
    CalloutTitleProps,
} from './Callout.types'

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
    children,
    className,
    role = 'note',
    ref,
    ...props
}: CalloutProps) {
    const hasStructuredProps = Boolean(title || description)

    return (
        <div
            ref={ref}
            className={cn('mr-callout', className)}
            role={role}
            data-tone={tone}
            data-size={size}
            {...props}
        >
            <div className="mr-callout__indicator" aria-hidden="true" />
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

Callout.Title = CalloutTitle
Callout.Description = CalloutDescription
Callout.Content = CalloutContent

export type {
    CalloutContentProps,
    CalloutDescriptionProps,
    CalloutProps,
    CalloutSize,
    CalloutTitleProps,
    CalloutTone,
} from './Callout.types'
