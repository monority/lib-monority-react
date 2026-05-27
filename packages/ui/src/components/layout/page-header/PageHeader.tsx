import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { PageHeaderProps } from './PageHeader.types'

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('mr-page-header', className)} {...props}>
      {children}
    </div>
  )
})

export type { PageHeaderProps } from './PageHeader.types'
