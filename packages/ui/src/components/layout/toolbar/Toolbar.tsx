import { cn } from '@/lib/cn'
import type { ToolbarProps } from './Toolbar.types'

export function Toolbar({ ref, className, children, ...props }: ToolbarProps) {
    return (
        <div ref={ref} className={cn('mr-toolbar', className)} role="toolbar" {...props}>
            {children}
        </div>
    )
}

export type { ToolbarProps } from './Toolbar.types'
