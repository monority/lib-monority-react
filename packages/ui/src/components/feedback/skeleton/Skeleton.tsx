import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { SkeletonProps } from './Skeleton.types'

const skeletonVariants = cva({
  base: 'mr-skeleton',
  variants: {
    size: {
      sm: 'mr-skeleton--sm',
      md: 'mr-skeleton--md',
      lg: 'mr-skeleton--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    { size, width, height, rounded = false, className, style, ...props },
    ref,
  ) {
    const resolvedSize = size ?? 'md'

    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ size: resolvedSize }),
          rounded && 'mr-skeleton--rounded',
          className,
        )}
        aria-hidden="true"
        data-size={resolvedSize}
        style={{ width, height, ...style }}
        {...props}
      />
    )
  },
)

export type { SkeletonProps, SkeletonSize } from './Skeleton.types'
