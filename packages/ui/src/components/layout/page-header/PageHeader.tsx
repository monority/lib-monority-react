import { createElement } from 'react'
import { cn } from '@/lib/cn'
import type {
    PageHeaderActionsProps,
    PageHeaderDescriptionProps,
    PageHeaderKickerProps,
    PageHeaderProps,
    PageHeaderTitleProps,
} from './PageHeader.types'

export function PageHeader({ ref, className, children, ...props }: PageHeaderProps) {
    return (
        <header ref={ref} className={cn('mr-page-header', className)} {...props}>
            {children}
        </header>
    )
}

function PageHeaderKicker({ ref, className, children, ...props }: PageHeaderKickerProps) {
    return (
        <span ref={ref} className={cn('mr-page-header__kicker', className)} {...props}>
            {children}
        </span>
    )
}

function PageHeaderTitle({ ref, className, as = 'h1', children, ...props }: PageHeaderTitleProps) {
    return createElement(
        as,
        {
            ref,
            className: cn('mr-page-header__title', className),
            ...props,
        },
        children
    )
}

function PageHeaderDescription({ ref, className, children, ...props }: PageHeaderDescriptionProps) {
    return (
        <p ref={ref} className={cn('mr-page-header__description', className)} {...props}>
            {children}
        </p>
    )
}

function PageHeaderActions({ ref, className, children, ...props }: PageHeaderActionsProps) {
    return (
        <div ref={ref} className={cn('mr-page-header__actions', className)} {...props}>
            {children}
        </div>
    )
}

PageHeader.Kicker = PageHeaderKicker
PageHeader.Title = PageHeaderTitle
PageHeader.Description = PageHeaderDescription
PageHeader.Actions = PageHeaderActions

export type {
    PageHeaderActionsProps,
    PageHeaderDescriptionProps,
    PageHeaderKickerProps,
    PageHeaderProps,
    PageHeaderTitleProps,
} from './PageHeader.types'
