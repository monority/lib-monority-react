import { createContext, useContext, useId } from 'react'
import { cn } from '@/lib/cn'
import { useControllableState } from '@/internal/use-controllable-state'
import type {
    CollapsibleContentProps,
    CollapsibleProps,
    CollapsibleTriggerProps,
} from './Collapsible.types'

interface CollapsibleContextValue {
    isOpen: boolean
    toggle: () => void
    disabled: boolean
    state: 'open' | 'closed'
    instanceId: string
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null)

export function CollapsibleTrigger({
    ref,
    children,
    className,
    onClick,
    ...props
}: CollapsibleTriggerProps) {
    const ctx = useContext(CollapsibleContext)
    const isOpen = ctx?.isOpen ?? false
    const state = ctx?.state ?? 'closed'
    const disabled = ctx?.disabled ?? false
    const instanceId = ctx?.instanceId ?? ''

    return (
        <button
            ref={ref}
            id={`${instanceId}-trigger`}
            type="button"
            className={cn('mr-collapsible__trigger', className)}
            aria-expanded={isOpen}
            aria-controls={`${instanceId}-panel`}
            onClick={(e) => {
                onClick?.(e)
                ctx?.toggle()
            }}
            disabled={disabled}
            data-state={state}
            {...props}
        >
            <span className="mr-collapsible__label">{children}</span>
            <span className="mr-collapsible__icon" aria-hidden="true" />
        </button>
    )
}

export function CollapsibleContent({
    ref,
    children,
    className,
    ...props
}: CollapsibleContentProps) {
    const ctx = useContext(CollapsibleContext)
    const isOpen = ctx?.isOpen ?? false
    const state = ctx?.state ?? 'closed'
    const instanceId = ctx?.instanceId ?? ''

    return (
        <div
            ref={ref}
            id={`${instanceId}-panel`}
            role="region"
            aria-labelledby={`${instanceId}-trigger`}
            className={cn('mr-collapsible__panel', className)}
            aria-hidden={!isOpen}
            data-state={state}
            {...props}
        >
            <div className="mr-collapsible__content">
                <div className="mr-collapsible__body">{children}</div>
            </div>
        </div>
    )
}

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

    const contextValue: CollapsibleContextValue = {
        isOpen,
        toggle,
        disabled,
        state,
        instanceId,
    }

    return (
        <CollapsibleContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cn('mr-collapsible', className)}
                data-open={isOpen || undefined}
                data-size={size}
                data-state={state}
                {...props}
            >
                {title !== undefined ? (
                    <>
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
                            <div className="mr-collapsible__content">
                                <div className="mr-collapsible__body">{children}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    children
                )}
            </div>
        </CollapsibleContext.Provider>
    )
}

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent

export type {
    CollapsibleProps,
    CollapsibleTriggerProps,
    CollapsibleContentProps,
} from './Collapsible.types'
