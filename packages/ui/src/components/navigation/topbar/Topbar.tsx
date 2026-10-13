import { cn } from '@/lib/cn'
import type {
    TopbarActionsProps,
    TopbarBrandMarkProps,
    TopbarBrandProps,
    TopbarLinkProps,
    TopbarMetaProps,
    TopbarNavProps,
    TopbarProps,
    TopbarStatusProps,
} from './Topbar.types'

export function Topbar({ ref, className, children, ...props }: TopbarProps) {
    return (
        <header ref={ref} className={cn('mr-topbar', className)} {...props}>
            {children}
        </header>
    )
}

function TopbarBrand({ ref, className, children, ...props }: TopbarBrandProps) {
    return (
        <div ref={ref} className={cn('mr-topbar__brand', className)} {...props}>
            {children}
        </div>
    )
}

function TopbarBrandMark({ ref, className, children, ...props }: TopbarBrandMarkProps) {
    return (
        <div ref={ref} className={cn('mr-topbar__brand-mark', className)} {...props}>
            {children}
        </div>
    )
}

function TopbarNav({
    ref,
    className,
    children,
    'aria-label': ariaLabel = 'Navigation principale',
    ...props
}: TopbarNavProps) {
    return (
        <nav
            ref={ref}
            className={cn('mr-topbar__navigation', className)}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </nav>
    )
}

function TopbarLink({ ref, className, children, active, href = '#', ...props }: TopbarLinkProps) {
    return (
        <a
            ref={ref}
            href={href}
            className={cn('mr-topbar__link', className)}
            aria-current={active ? 'page' : undefined}
            data-active={active ? 'true' : undefined}
            {...props}
        >
            {children}
        </a>
    )
}

function TopbarActions({ ref, className, children, ...props }: TopbarActionsProps) {
    return (
        <div ref={ref} className={cn('mr-topbar__actions', className)} {...props}>
            {children}
        </div>
    )
}

function TopbarMeta({ ref, className, children, ...props }: TopbarMetaProps) {
    return (
        <div ref={ref} className={cn('mr-topbar__meta', className)} {...props}>
            {children}
        </div>
    )
}

function TopbarStatus({ ref, className, children, tone = 'info', ...props }: TopbarStatusProps) {
    return (
        <div ref={ref} className={cn('mr-topbar__status', className)} data-tone={tone} {...props}>
            <span className="mr-topbar__status-dot" aria-hidden="true" />
            <span>{children}</span>
        </div>
    )
}

Topbar.Brand = TopbarBrand
Topbar.BrandMark = TopbarBrandMark
Topbar.Nav = TopbarNav
Topbar.Link = TopbarLink
Topbar.Actions = TopbarActions
Topbar.Meta = TopbarMeta
Topbar.Status = TopbarStatus

export type {
    TopbarActionsProps,
    TopbarBrandMarkProps,
    TopbarBrandProps,
    TopbarLinkProps,
    TopbarMetaProps,
    TopbarNavProps,
    TopbarProps,
    TopbarStatusProps,
    TopbarStatusTone,
} from './Topbar.types'
