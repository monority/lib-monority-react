import { cn } from '@/lib/cn'
import type { TopbarProps } from './Topbar.types'

export function Topbar({ ref, className, children, ...props }: TopbarProps) {
    return (
        <header ref={ref} className={cn('mr-topbar', className)} {...props}>
            {children}
        </header>
    )
}

export type { TopbarProps } from './Topbar.types'
