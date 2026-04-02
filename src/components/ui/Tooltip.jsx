import { cloneElement, isValidElement, useId } from 'react'
import { cn } from '@/lib/cn'

export function Tooltip({ content, children, className }) {
    const tooltipId = useId()
    const trigger = isValidElement(children)
        ? cloneElement(children, {
              'aria-describedby': tooltipId,
          })
        : children

    return (
        <span className={cn('ui-tooltip', className)}>
            <span className="ui-tooltip__trigger">{trigger}</span>
            <span className="ui-tooltip__content" id={tooltipId} role="tooltip">
                {content}
            </span>
        </span>
    )
}
