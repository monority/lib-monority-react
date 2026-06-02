import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { PageHeaderProps } from './PageHeader.types'

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
    { className, children, ...props },
    ref
) {
    return (
        <header ref={ref} className={cn('mr-page-header', className)} {...props}>
            {children}
        </header>
    )
})

export type { PageHeaderProps } from './PageHeader.types'
