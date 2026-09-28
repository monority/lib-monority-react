import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { SkeletonProps } from './Skeleton.types'

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
    { size, width, height, rounded = false, className, style, ...props },
    ref
) {
    const resolvedSize = size ?? 'md'

    return (
        <div
            ref={ref}
            className={cn('mr-skeleton', className)}
            aria-hidden="true"
            data-rounded={rounded ? 'true' : undefined}
            data-size={resolvedSize}
            style={{ width, height, ...style }}
            {...props}
        />
    )
})

export type { SkeletonProps, SkeletonSize } from './Skeleton.types'
