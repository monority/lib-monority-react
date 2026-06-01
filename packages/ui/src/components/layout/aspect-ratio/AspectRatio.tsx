import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { AspectRatioProps } from './AspectRatio.types'

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ ratio = 16 / 9, children, className, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('mr-aspect-ratio', className)}
        style={{ ...style, paddingBottom: `${100 / ratio}%` }}
        {...props}
      >
        <div className="mr-aspect-ratio__content">
          {children}
        </div>
      </div>
    )
  },
)

export type { AspectRatioProps } from './AspectRatio.types'
