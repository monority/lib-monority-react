import { cn } from '@/lib/cn'
import { createContext, useCallback, useContext, useId, useRef, useState } from 'react'
import type {
    AccordionContentProps,
    AccordionItemData,
    AccordionItemProps,
    AccordionProps,
    AccordionSize,
    AccordionTriggerProps,
} from './Accordion.types'

interface AccordionContextValue {
    openValues: string[]
    toggle: (value: string) => void
    collapsible: boolean
    size: AccordionSize
}

interface AccordionItemContextValue {
    value: string
    isOpen: boolean
    isDisabled: boolean
    triggerId: string
    panelId: string
}

const AccordionContext = createContext<AccordionContextValue | null>(null)
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

export function Accordion({
    items = [],
    defaultValue,
    value: controlledValue,
    onChange,
    onValueChange,
    allowMultiple = false,
    collapsible = true,
    size = 'md',
    className,
    ref,
    children,
    ...props
}: AccordionProps) {
    const [internalValue, setInternalValue] = useState<string[]>(() => {
        if (defaultValue === undefined) return []
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    })

    const isControlled = controlledValue !== undefined
    const openValues = isControlled
        ? Array.isArray(controlledValue)
            ? controlledValue
            : [controlledValue]
        : internalValue

    const generatedId = useId()
    const firstEnabledIndex = Math.max(
        0,
        items.findIndex((item) => !item.disabled)
    )
    const [focusIndex, setFocusIndex] = useState(firstEnabledIndex)
    const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])

    const moveTo = useCallback((nextIndex: number) => {
        setFocusIndex(nextIndex)
        triggerRefs.current[nextIndex]?.focus()
    }, [])

    const handleTriggerKeyDown = useCallback(
        (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
            const enabledIndexes = items
                .map((item, i) => (item.disabled ? -1 : i))
                .filter((i) => i >= 0)
            const firstEnabled = enabledIndexes[0]
            if (firstEnabled === undefined) return

            switch (event.key) {
                case 'ArrowDown': {
                    event.preventDefault()
                    const position = enabledIndexes.indexOf(index)
                    const next = enabledIndexes[(position + 1) % enabledIndexes.length]
                    moveTo(next ?? firstEnabled)
                    break
                }
                case 'ArrowUp': {
                    event.preventDefault()
                    const position = enabledIndexes.indexOf(index)
                    const next =
                        enabledIndexes[
                            (position - 1 + enabledIndexes.length) % enabledIndexes.length
                        ]
                    moveTo(next ?? firstEnabled)
                    break
                }
                case 'Home': {
                    event.preventDefault()
                    moveTo(firstEnabled)
                    break
                }
                case 'End': {
                    event.preventDefault()
                    moveTo(enabledIndexes[enabledIndexes.length - 1] ?? firstEnabled)
                    break
                }
                default:
                    break
            }
        },
        [items, moveTo]
    )

    const toggle = useCallback(
        (itemValue: string) => {
            const newValues = openValues.includes(itemValue)
                ? openValues.filter((v) => v !== itemValue)
                : allowMultiple
                  ? [...openValues, itemValue]
                  : [itemValue]

            if (!isControlled) setInternalValue(newValues)
            const result = allowMultiple ? newValues : (newValues[0] ?? '')
            onChange?.(result as string | string[])
            onValueChange?.(result as string | string[])
        },
        [openValues, allowMultiple, isControlled, onChange, onValueChange]
    )

    const contextValue: AccordionContextValue = {
        openValues,
        toggle,
        collapsible,
        size,
    }

    if (children) {
        return (
            <AccordionContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cn('mr-accordion', className)}
                    data-size={size}
                    {...props}
                >
                    {children}
                </div>
            </AccordionContext.Provider>
        )
    }

    return (
        <div ref={ref} className={cn('mr-accordion', className)} data-size={size} {...props}>
            {items.map((item: AccordionItemData, index: number) => {
                const isOpen = openValues.includes(item.value)
                const panelId = `${generatedId}-panel-${item.value}`
                const triggerId = `${generatedId}-trigger-${item.value}`
                const isDisabled = item.disabled === true

                return (
                    <div
                        key={item.value}
                        className="mr-accordion__item"
                        data-open={isOpen ? true : undefined}
                        data-disabled={isDisabled ? true : undefined}
                    >
                        <button
                            id={triggerId}
                            ref={(node) => {
                                triggerRefs.current[index] = node
                            }}
                            type="button"
                            className="mr-accordion__trigger"
                            disabled={isDisabled}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            tabIndex={index === focusIndex ? 0 : -1}
                            onKeyDown={handleTriggerKeyDown(index)}
                            onClick={() => {
                                if (isDisabled) return
                                if (collapsible || !isOpen) toggle(item.value)
                            }}
                        >
                            <span className="mr-accordion__label">{item.title}</span>
                            <span className="mr-accordion__icon" aria-hidden="true" />
                        </button>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={triggerId}
                            className="mr-accordion__panel"
                            hidden={!isOpen}
                        >
                            <div className="mr-accordion__content">
                                <div className="mr-accordion__body">{item.content}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function AccordionItem({
    ref,
    value,
    disabled = false,
    className,
    children,
    ...props
}: AccordionItemProps) {
    const context = useContext(AccordionContext)
    const generatedId = useId()
    const triggerId = `${generatedId}-trigger-${value}`
    const panelId = `${generatedId}-panel-${value}`
    const isOpen = context ? context.openValues.includes(value) : false

    const itemContextValue: AccordionItemContextValue = {
        value,
        isOpen,
        isDisabled: disabled,
        triggerId,
        panelId,
    }

    return (
        <AccordionItemContext.Provider value={itemContextValue}>
            <div
                ref={ref}
                className={cn('mr-accordion__item', className)}
                data-open={isOpen ? true : undefined}
                data-disabled={disabled ? true : undefined}
                {...props}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    )
}

function AccordionTrigger({ ref, className, children, onClick, ...props }: AccordionTriggerProps) {
    const accordionContext = useContext(AccordionContext)
    const itemContext = useContext(AccordionItemContext)

    const isOpen = itemContext?.isOpen ?? false
    const isDisabled = itemContext?.isDisabled ?? false
    const triggerId = itemContext?.triggerId
    const panelId = itemContext?.panelId
    const value = itemContext?.value ?? ''

    return (
        <button
            ref={ref}
            id={triggerId}
            type="button"
            className={cn('mr-accordion__trigger', className)}
            disabled={isDisabled}
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={(e) => {
                onClick?.(e)
                if (isDisabled || !accordionContext) return
                if (accordionContext.collapsible || !isOpen) {
                    accordionContext.toggle(value)
                }
            }}
            {...props}
        >
            <span className="mr-accordion__label">{children}</span>
            <span className="mr-accordion__icon" aria-hidden="true" />
        </button>
    )
}

function AccordionContent({ ref, className, children, ...props }: AccordionContentProps) {
    const itemContext = useContext(AccordionItemContext)
    const isOpen = itemContext?.isOpen ?? false
    const triggerId = itemContext?.triggerId
    const panelId = itemContext?.panelId

    return (
        <div
            ref={ref}
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            className={cn('mr-accordion__panel', className)}
            hidden={!isOpen}
            {...props}
        >
            <div className="mr-accordion__content">
                <div className="mr-accordion__body">{children}</div>
            </div>
        </div>
    )
}

AccordionItem.displayName = 'Accordion.Item'
AccordionTrigger.displayName = 'Accordion.Trigger'
AccordionContent.displayName = 'Accordion.Content'

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export { AccordionItem, AccordionTrigger, AccordionContent }
export type {
    AccordionProps,
    AccordionItemData,
    AccordionSize,
    AccordionItemProps,
    AccordionTriggerProps,
    AccordionContentProps,
} from './Accordion.types'
