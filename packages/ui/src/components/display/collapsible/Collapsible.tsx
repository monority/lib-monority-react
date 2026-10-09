import { useId } from 'react'
import { cn } from '@/lib/cn'
import { useControllableState } from '@/internal/use-controllable-state'
import type { CollapsibleProps } from './Collapsible.types'

export function Collapsible({
    title,
    children,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    size = 'md',
    disabled = false,
    className,
    ref,
    ...props
}: CollapsibleProps) {
    const [isOpen, setIsOpen] = useControllableState<boolean>({
        value: controlledOpen,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    })

    const instanceId = useId()
    const state = isOpen ? 'open' : 'closed'

    function toggle() {
        if (disabled) return
        setIsOpen(!isOpen)
    }

    return (
        <div
            ref={ref}
            className={cn('mr-collapsible', className)}
            data-open={isOpen || undefined}
            data-size={size}
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
                disabled={disabled}
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
}

export type { CollapsibleProps } from './Collapsible.types'
