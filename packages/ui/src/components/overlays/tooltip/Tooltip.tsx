import { cloneElement, isValidElement, useId } from 'react'
import { cn } from '@/lib/cn'

interface TooltipProps { content: React.ReactNode; children: React.ReactNode; className?: string }

export function Tooltip({ content, children, className }: TooltipProps) {
  const tooltipId = useId()
  const trigger = isValidElement(children) ? cloneElement(children as React.ReactElement, { 'aria-describedby': tooltipId } as React.HTMLAttributes<HTMLElement>) : children
  return <span className={cn('ui-tooltip', className)}><span className="ui-tooltip__trigger">{trigger}</span><span className="ui-tooltip__content" id={tooltipId} role="tooltip">{content}</span></span>
}
