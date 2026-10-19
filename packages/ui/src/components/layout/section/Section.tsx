import { cn } from '@/lib/cn'
import { createElement } from 'react'
import type {
    SectionContentProps,
    SectionDescriptionProps,
    SectionHeaderProps,
    SectionProps,
    SectionTitleProps,
} from './Section.types'

export function SectionHeader({ ref, className, children, ...props }: SectionHeaderProps) {
    return (
        <header ref={ref} className={cn('mr-section__header', className)} {...props}>
            {children}
        </header>
    )
}

export function SectionTitle({ ref, as = 'h2', className, children, ...props }: SectionTitleProps) {
    return createElement(
        as,
        {
            ref,
            className: cn('mr-section__title', className),
            ...props,
        },
        children
    )
}

export function SectionDescription({
    ref,
    className,
    children,
    ...props
}: SectionDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-section__description', className)} {...props}>
            {children}
        </p>
    )
}

export function SectionContent({ ref, className, children, ...props }: SectionContentProps) {
    return (
        <div ref={ref} className={cn('mr-section__content', className)} {...props}>
            {children}
        </div>
    )
}

export function Section({
    ref,
    className,
    spacing = 'md',
    variant = 'default',
    as,
    title,
    titleAs: TitleTag = 'h2',
    children,
    ...props
}: SectionProps) {
    const Component = as ?? 'section'

    return (
        <Component
            ref={ref}
            className={cn('mr-section', className)}
            data-spacing={spacing}
            data-variant={variant}
            {...props}
        >
            {title != null && <TitleTag className="mr-section__title">{title}</TitleTag>}
            {children}
        </Component>
    )
}

Section.Header = SectionHeader
Section.Title = SectionTitle
Section.Description = SectionDescription
Section.Content = SectionContent

export type {
    SectionProps,
    SectionSpacing,
    SectionVariant,
    SectionHeaderProps,
    SectionTitleProps,
    SectionDescriptionProps,
    SectionContentProps,
} from './Section.types'
