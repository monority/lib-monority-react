import { forwardRef, useId, cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/cn'
import type { TooltipProps } from './Tooltip.types'

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip({ content, children, className, ...props }, ref) {
    const generatedId = useId()

    return (
      <div ref={ref} className={cn('mr-tooltip', className)} {...props}>
        {isValidElement(children)
          ? cloneElement(children, { 'aria-describedby': generatedId } as Record<string, unknown>)
          : children}
        <div className="mr-tooltip__content" id={generatedId} role="tooltip">
          {content}
        </div>
      </div>
    )
  },
)

export type { TooltipProps } from './Tooltip.types'
