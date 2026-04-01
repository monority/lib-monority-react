import { cn } from '@/lib/cn'

export function Badge({ className, ...props }) {
    return <span className={cn('ui-badge', className)} {...props} />
}
