import { cn } from '@/lib/cn'
import type { SkeletonLineProps, SkeletonProps } from './Skeleton.types'

function SkeletonLine({ className, ref, ...props }: SkeletonLineProps) {
    return <div ref={ref} className={cn('mr-skeleton', className)} aria-hidden="true" {...props} />
}

export function Skeleton({
    size,
    width,
    height,
    rounded = false,
    circle = false,
    lines = 1,
    className,
    style,
    ref,
    ...props
}: SkeletonProps) {
    const resolvedSize = size ?? 'md'
    const isRounded = rounded || circle

    if (lines > 1) {
        return (
            <div ref={ref} className={cn('mr-skeleton__group', className)} aria-hidden="true">
                {Array.from({ length: lines }).map((_, i) => {
                    const isLast = i === lines - 1
                    return (
                        <div
                            key={i}
                            className="mr-skeleton"
                            data-size={resolvedSize}
                            data-rounded={isRounded ? 'true' : undefined}
                            data-circle={circle ? 'true' : undefined}
                            style={{
                                inlineSize: isLast && width == null ? '60%' : width,
                                blockSize: height,
                                ...style,
                            }}
                            {...props}
                        />
                    )
                })}
            </div>
        )
    }

    return (
        <div
            ref={ref}
            className={cn('mr-skeleton', className)}
            aria-hidden="true"
            data-rounded={isRounded ? 'true' : undefined}
            data-circle={circle ? 'true' : undefined}
            data-size={resolvedSize}
            style={{ inlineSize: width, blockSize: height, ...style }}
            {...props}
        />
    )
}

Skeleton.Line = SkeletonLine

export type { SkeletonLineProps, SkeletonProps, SkeletonSize } from './Skeleton.types'
