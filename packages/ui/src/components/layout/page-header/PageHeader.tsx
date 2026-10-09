import { cn } from '@/lib/cn'
import type { PageHeaderProps } from './PageHeader.types'

export function PageHeader({ ref, className, children, ...props }: PageHeaderProps) {
    return (
        <header ref={ref} className={cn('mr-page-header', className)} {...props}>
            {children}
        </header>
    )
}

export type { PageHeaderProps } from './PageHeader.types'
