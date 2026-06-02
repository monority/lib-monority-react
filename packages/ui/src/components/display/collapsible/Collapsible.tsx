import { forwardRef, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { CollapsibleProps } from './Collapsible.types'

const collapsibleVariants = cva({
    base: 'mr-collapsible',
    variants: {
        size: {
            sm: 'mr-collapsible--sm',
            md: 'mr-collapsible--md',
            lg: 'mr-collapsible--lg',
        },
    },
    defaultVariants: { size: 'md' },
})

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
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : internalOpen
    const instanceId = useId()
    const state = isOpen ? 'open' : 'closed'

    function toggle() {
        if (!isControlled) setInternalOpen(!isOpen)
        onOpenChange?.(!isOpen)
    }

    return (
        <div
            ref={ref}
            className={cn(collapsibleVariants({ size }), className)}
            data-open={isOpen || undefined}
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
