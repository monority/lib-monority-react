import { useControllableState } from '@/internal/use-controllable-state'
import { cn } from '@/lib/cn'
import { createContext, useCallback, useContext, useId, useMemo } from 'react'
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
    size: 'sm' | 'md' | 'lg'
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
            data-disabled={disabled ? true : undefined}
            {...props}
        >
            <span className="mr-collapsible__label mr-accordion__label">{children}</span>
            <span className="mr-collapsible__icon mr-accordion__icon" aria-hidden="true" />
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
            hidden={!isOpen ? ('until-found' as unknown as boolean) : undefined}
            data-state={state}
            {...props}
        >
            <div className="mr-collapsible__content mr-accordion__content">
                <div className="mr-collapsible__body mr-accordion__body">{children}</div>
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

    const toggle = useCallback(() => {
        if (disabled) return
        setIsOpen(!isOpen)
    }, [disabled, isOpen, setIsOpen])

    const contextValue = useMemo<CollapsibleContextValue>(
        () => ({
            isOpen,
            toggle,
            disabled,
            state,
            size,
            instanceId,
        }),
        [isOpen, toggle, disabled, state, size, instanceId]
    )

    return (
        <CollapsibleContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cn('mr-collapsible', className)}
                data-open={isOpen ? true : undefined}
                data-state={state}
                data-size={size}
                data-disabled={disabled ? true : undefined}
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
                            data-disabled={disabled ? true : undefined}
                        >
                            <span className="mr-collapsible__label mr-accordion__label">
                                {title}
                            </span>
                            <span
                                className="mr-collapsible__icon mr-accordion__icon"
                                aria-hidden="true"
                            />
                        </button>
                        <div
                            id={`${instanceId}-panel`}
                            role="region"
                            aria-labelledby={`${instanceId}-trigger`}
                            className="mr-collapsible__panel"
                            aria-hidden={!isOpen}
                            hidden={!isOpen ? ('until-found' as unknown as boolean) : undefined}
                            data-state={state}
                        >
                            <div className="mr-collapsible__content mr-accordion__content">
                                <div className="mr-collapsible__body mr-accordion__body">
                                    {children}
                                </div>
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
