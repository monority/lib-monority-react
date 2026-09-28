import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { BadgeProps } from './Badge.types'

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    { className, variant, ...props },
    ref
) {
    const resolvedVariant = variant ?? 'default'

    return (
        <span
            ref={ref}
            className={cn('mr-badge', className)}
            {...props}
            data-variant={resolvedVariant}
        />
    )
})

export type { BadgeProps, BadgeVariant } from './Badge.types'
