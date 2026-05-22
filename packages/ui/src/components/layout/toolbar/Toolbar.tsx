import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {}
export function Toolbar({ className, ...props }: ToolbarProps) { return <div className={cn('ui-toolbar', className)} {...props} /> }
