import { forwardRef, useCallback, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { AccordionProps, AccordionItem } from './Accordion.types'

const accordionVariants = cva({
  base: 'mr-accordion',
  variants: {
    size: {
      sm: 'mr-accordion--sm',
      md: 'mr-accordion--md',
      lg: 'mr-accordion--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    {
      items = [],
      defaultValue,
      value: controlledValue,
      onChange,
      allowMultiple = false,
      collapsible = false,
      size,
      className,
      ...props
    },
    ref,
  ) {
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
      },
      [openValues, allowMultiple, isControlled, onChange],
    )

    return (
      <div
        ref={ref}
        className={cn(accordionVariants({ size }), className)}
        data-size={size}
        {...props}
      >
        {items.map((item: AccordionItem) => {
          const isOpen = openValues.includes(item.value)
          const panelId = `${generatedId}-panel-${item.value}`
          const triggerId = `${generatedId}-trigger-${item.value}`

          return (
            <div
              key={item.value}
              className="mr-accordion__item"
              data-open={isOpen ? true : undefined}
            >
              <button
                id={triggerId}
                type="button"
                className="mr-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  collapsible || !isOpen ? toggle(item.value) : undefined
                }
              >
                {item.title}
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="mr-accordion__panel"
                hidden={!isOpen}
              >
                {item.content}
              </div>
            </div>
          )
        })}
      </div>
    )
  },
)

export type { AccordionProps, AccordionItem, AccordionSize } from './Accordion.types'
