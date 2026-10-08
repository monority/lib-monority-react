import { cn } from '@/lib/cn'
import type {
    CardContentProps,
    CardDescriptionProps,
    CardFooterProps,
    CardHeaderProps,
    CardPadding,
    CardProps,
    CardTitleProps,
} from './Card.types'

function CardHeader({ className, children, ref, ...props }: CardHeaderProps) {
    return (
        <div ref={ref} className={cn('mr-card__header', className)} {...props}>
            {children}
        </div>
    )
}

function CardTitle({ className, children, ref, ...props }: CardTitleProps) {
    return (
        <strong ref={ref} className={cn('mr-card__title', className)} {...props}>
            {children}
        </strong>
    )
}

function CardDescription({ className, children, ref, ...props }: CardDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-card__description', className)} {...props}>
            {children}
        </p>
    )
}

function CardContent({ className, children, ref, ...props }: CardContentProps) {
    return (
        <div ref={ref} className={cn('mr-card__content', className)} {...props}>
            {children}
        </div>
    )
}

function CardFooter({ className, children, ref, ...props }: CardFooterProps) {
    return (
        <div ref={ref} className={cn('mr-card__footer', className)} {...props}>
            {children}
        </div>
    )
}

export function Card({
    padding = 'md',
    interactive = false,
    className,
    children,
    ref,
    tabIndex,
    role,
    ...props
}: CardProps) {
    return (
        <div
            ref={ref}
            className={cn('mr-card', className)}
            data-padding={padding}
            data-interactive={interactive ? true : undefined}
            tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
            role={interactive ? (role ?? 'button') : role}
            {...props}
        >
            {children}
        </div>
    )
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export type {
    CardContentProps,
    CardDescriptionProps,
    CardFooterProps,
    CardHeaderProps,
    CardPadding,
    CardProps,
    CardTitleProps,
} from './Card.types'
