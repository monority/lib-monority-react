import { cn } from '@/lib/cn'
import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { Collapsible } from '../collapsible/Collapsible'
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
}

const AccordionContext = createContext<AccordionContextValue | null>(null)
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

function AccordionItem({
    ref,
    value,
    disabled = false,
    className,
    children,
    ...props
}: AccordionItemProps) {
    const accordionContext = useContext(AccordionContext)
    const isOpen = accordionContext ? accordionContext.openValues.includes(value) : false
    const size = accordionContext?.size ?? 'md'

    const handleToggle = useCallback(() => {
        if (disabled || !accordionContext) return
        if (accordionContext.collapsible || !isOpen) {
            accordionContext.toggle(value)
        }
    }, [disabled, accordionContext, isOpen, value])

    const itemContextValue: AccordionItemContextValue = {
        value,
        isOpen,
        isDisabled: disabled,
    }

    return (
        <AccordionItemContext.Provider value={itemContextValue}>
            <Collapsible
                ref={ref}
                className={cn('mr-accordion__item', className)}
                open={isOpen}
                onOpenChange={handleToggle}
                size={size}
                disabled={disabled}
                data-value={value}
                {...props}
            >
                {children}
            </Collapsible>
        </AccordionItemContext.Provider>
    )
}

function AccordionTrigger({ ref, className, children, onClick, ...props }: AccordionTriggerProps) {
    return (
        <Collapsible.Trigger
            ref={ref}
            className={cn('mr-accordion__trigger', className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </Collapsible.Trigger>
    )
}

function AccordionContent({ ref, className, children, ...props }: AccordionContentProps) {
    return (
        <Collapsible.Content ref={ref} className={cn('mr-accordion__panel', className)} {...props}>
            {children}
        </Collapsible.Content>
    )
}

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

    return (
        <AccordionContext.Provider value={contextValue}>
            <div ref={ref} className={cn('mr-accordion', className)} data-size={size} {...props}>
                {children ??
                    items.map((item: AccordionItemData, index: number) => (
                        <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
                            <AccordionTrigger
                                ref={(node) => {
                                    triggerRefs.current[index] = node
                                }}
                                tabIndex={index === focusIndex ? 0 : -1}
                                onKeyDown={handleTriggerKeyDown(index)}
                            >
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent>{item.content}</AccordionContent>
                        </AccordionItem>
                    ))}
            </div>
        </AccordionContext.Provider>
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
