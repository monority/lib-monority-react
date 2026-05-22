import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export function PageHeader({ className, ...props }: PageHeaderProps) { return <div className={cn('ui-page-header', className)} {...props} /> }
