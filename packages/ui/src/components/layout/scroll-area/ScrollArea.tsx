import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { ScrollAreaProps } from './ScrollArea.types'

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea({ orientation = 'vertical', hideScrollbar = false, children, className, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'mr-scroll-area',
          `mr-scroll-area--${orientation}`,
          hideScrollbar && 'mr-scroll-area--hide',
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    )
  },
)

export type { ScrollAreaProps } from './ScrollArea.types'
