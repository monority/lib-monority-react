import { createElement } from 'react'
import { cn } from '@/lib/cn'
import type {
    PageHeaderActionsProps,
    PageHeaderDescriptionProps,
    PageHeaderKickerProps,
    PageHeaderMainProps,
    PageHeaderMetaProps,
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

function PageHeaderMain({ ref, className, children, ...props }: PageHeaderMainProps) {
    return (
        <div ref={ref} className={cn('mr-page-header__main', className)} {...props}>
            {children}
        </div>
    )
}

function PageHeaderActions({ ref, className, children, ...props }: PageHeaderActionsProps) {
    return (
        <div ref={ref} className={cn('mr-page-header__actions', className)} {...props}>
            {children}
        </div>
    )
}

function PageHeaderMeta({ ref, className, children, ...props }: PageHeaderMetaProps) {
    return (
        <div ref={ref} className={cn('mr-page-header__meta', className)} {...props}>
            {children}
        </div>
    )
}

PageHeader.Main = PageHeaderMain
PageHeader.Kicker = PageHeaderKicker
PageHeader.Eyebrow = PageHeaderKicker
PageHeader.Title = PageHeaderTitle
PageHeader.Description = PageHeaderDescription
PageHeader.Actions = PageHeaderActions
PageHeader.Meta = PageHeaderMeta

const PageHeaderEyebrow = PageHeaderKicker

export {
    PageHeaderKicker,
    PageHeaderEyebrow,
    PageHeaderTitle,
    PageHeaderDescription,
    PageHeaderActions,
    PageHeaderMain,
    PageHeaderMeta,
}

export type {
    PageHeaderActionsProps,
    PageHeaderDescriptionProps,
    PageHeaderKickerProps,
    PageHeaderMainProps,
    PageHeaderMetaProps,
    PageHeaderProps,
    PageHeaderTitleProps,
} from './PageHeader.types'
