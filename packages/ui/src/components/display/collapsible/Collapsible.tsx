import { forwardRef, useId } from 'react'
import { cn } from '@/lib/cn'
import { useControllableState } from '@/internal/use-controllable-state'
import type { CollapsibleProps } from './Collapsible.types'

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(
    {
        title,
        children,
        defaultOpen = false,
        open: controlledOpen,
        onOpenChange,
        size,
        className,
        ...props
    },
    ref
) {
    const [isOpen, setOpen] = useControllableState({
        value: controlledOpen,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    })
    const instanceId = useId()
    const state = isOpen ? 'open' : 'closed'
    const resolvedSize = size ?? 'md'

    function toggle() {
        setOpen(!isOpen)
    }

    return (
        <div
            ref={ref}
            className={cn('mr-collapsible', className)}
            data-open={isOpen || undefined}
            data-size={resolvedSize}
            data-state={state}
            {...props}
        >
            <button
                id={`${instanceId}-trigger`}
                type="button"
                className="mr-collapsible__trigger"
                aria-expanded={isOpen}
                aria-controls={`${instanceId}-panel`}
                onClick={toggle}
                data-state={state}
            >
                <span className="mr-collapsible__label">{title}</span>
                <span className="mr-collapsible__icon" aria-hidden="true" />
            </button>
            <div
                id={`${instanceId}-panel`}
                role="region"
                aria-labelledby={`${instanceId}-trigger`}
                className="mr-collapsible__panel"
                aria-hidden={!isOpen}
                data-state={state}
            >
                <div className="mr-collapsible__content">{children}</div>
            </div>
        </div>
    )
})

export type { CollapsibleProps } from './Collapsible.types'
