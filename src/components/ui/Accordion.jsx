import { useId, useState } from 'react'
import { cn } from '@/lib/cn'

export function Accordion({
    items = [],
    defaultValue,
    value,
    onChange,
    allowMultiple = false,
    collapsible = true,
    className,
}) {
    const generatedId = useId()
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(() => {
        if (allowMultiple) {
            return Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
        }

        return typeof defaultValue === 'string' ? defaultValue : null
    })

    const currentValue = isControlled
        ? value
        : internalValue

    function isOpen(itemValue) {
        if (allowMultiple) {
            return Array.isArray(currentValue) && currentValue.includes(itemValue)
        }

        return currentValue === itemValue
    }

    function updateValue(nextValue) {
        if (!isControlled) {
            setInternalValue(nextValue)
        }

        onChange?.(nextValue)
    }

    function handleToggle(itemValue) {
        if (allowMultiple) {
            const values = Array.isArray(currentValue) ? currentValue : []
            const nextValue = values.includes(itemValue)
                ? values.filter((valueItem) => valueItem !== itemValue)
                : [...values, itemValue]

            updateValue(nextValue)
            return
        }

        if (currentValue === itemValue) {
            updateValue(collapsible ? null : itemValue)
            return
        }

        updateValue(itemValue)
    }

    return (
        <div className={cn('ui-accordion', className)}>
            {items.map((item, index) => {
                const itemValue = item.value ?? `${generatedId}-item-${index}`
                const triggerId = `${generatedId}-trigger-${index}`
                const panelId = `${generatedId}-panel-${index}`
                const open = isOpen(itemValue)

                return (
                    <div key={itemValue} className={cn('ui-accordion__item', open && 'is-open')}>
                        <h3 className="ui-accordion__heading">
                            <button
                                id={triggerId}
                                type="button"
                                className="ui-accordion__trigger"
                                aria-expanded={open}
                                aria-controls={panelId}
                                onClick={() => handleToggle(itemValue)}
                            >
                                <span className="ui-accordion__label">{item.label}</span>
                                <span className="ui-accordion__icon" aria-hidden="true">
                                    +
                                </span>
                            </button>
                        </h3>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={triggerId}
                            className="ui-accordion__panel"
                            hidden={!open}
                        >
                            <div className="ui-accordion__content">{item.content}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
