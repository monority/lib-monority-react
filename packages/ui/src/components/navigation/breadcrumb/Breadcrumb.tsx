import { cn } from '@/lib/cn'
import type {
    BreadcrumbItemProps,
    BreadcrumbLinkProps,
    BreadcrumbListProps,
    BreadcrumbPageProps,
    BreadcrumbProps,
    BreadcrumbSeparatorProps,
} from './Breadcrumb.types'

export function Breadcrumb({ ref, items = [], className, children, ...props }: BreadcrumbProps) {
    return (
        <nav
            ref={ref}
            className={cn('mr-breadcrumb', className)}
            aria-label="Breadcrumb"
            {...props}
        >
            {children ? (
                children
            ) : (
                <ol className="mr-breadcrumb__list">
                    {items.map((item, index) => (
                        <li key={index} className="mr-breadcrumb__item">
                            {item.href ? (
                                <a href={item.href} className="mr-breadcrumb__link">
                                    {item.label}
                                </a>
                            ) : (
                                <span className="mr-breadcrumb__current" aria-current="page">
                                    {item.label}
                                </span>
                            )}
                            {index < items.length - 1 ? (
                                <span className="mr-breadcrumb__separator" aria-hidden="true">
                                    /
                                </span>
                            ) : null}
                        </li>
                    ))}
                </ol>
            )}
        </nav>
    )
}

function BreadcrumbList({ ref, className, children, ...props }: BreadcrumbListProps) {
    return (
        <ol ref={ref} className={cn('mr-breadcrumb__list', className)} {...props}>
            {children}
        </ol>
    )
}

function BreadcrumbItemComponent({ ref, className, children, ...props }: BreadcrumbItemProps) {
    return (
        <li ref={ref} className={cn('mr-breadcrumb__item', className)} {...props}>
            {children}
        </li>
    )
}

function BreadcrumbLink({ ref, className, children, ...props }: BreadcrumbLinkProps) {
    return (
        <a ref={ref} className={cn('mr-breadcrumb__link', className)} {...props}>
            {children}
        </a>
    )
}

function BreadcrumbPage({ ref, className, children, ...props }: BreadcrumbPageProps) {
    return (
        <span
            ref={ref}
            className={cn('mr-breadcrumb__current', className)}
            aria-current="page"
            {...props}
        >
            {children}
        </span>
    )
}

function BreadcrumbSeparator({
    ref,
    className,
    children = '/',
    ...props
}: BreadcrumbSeparatorProps) {
    return (
        <span
            ref={ref}
            className={cn('mr-breadcrumb__separator', className)}
            aria-hidden="true"
            {...props}
        >
            {children}
        </span>
    )
}

BreadcrumbList.displayName = 'Breadcrumb.List'
BreadcrumbItemComponent.displayName = 'Breadcrumb.Item'
BreadcrumbLink.displayName = 'Breadcrumb.Link'
BreadcrumbPage.displayName = 'Breadcrumb.Page'
BreadcrumbSeparator.displayName = 'Breadcrumb.Separator'

Breadcrumb.List = BreadcrumbList
Breadcrumb.Item = BreadcrumbItemComponent
Breadcrumb.Link = BreadcrumbLink
Breadcrumb.Page = BreadcrumbPage
Breadcrumb.Separator = BreadcrumbSeparator

export {
    BreadcrumbList,
    BreadcrumbItemComponent as BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
}

export type {
    BreadcrumbProps,
    BreadcrumbItemData,
    BreadcrumbListProps,
    BreadcrumbItemProps,
    BreadcrumbLinkProps,
    BreadcrumbPageProps,
    BreadcrumbSeparatorProps,
} from './Breadcrumb.types'
