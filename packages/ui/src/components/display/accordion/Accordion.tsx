import { forwardRef, useCallback, useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { AccordionItem, AccordionProps } from './Accordion.types'

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

/**
 * Accordion with WAI-ARIA APG keyboard behavior:
 * - triggers form a roving tabindex
 * - ArrowUp / ArrowDown move focus between enabled triggers (wrapping)
 * - Home / End jump to the first / last enabled trigger
 * - Enter / Space toggle the focused trigger (native button behavior)
 */
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
    const firstEnabledIndex = Math.max(
      0,
      items.findIndex((item) => !item.disabled),
    )
    const [focusIndex, setFocusIndex] = useState(firstEnabledIndex)
    const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])

    const moveTo = useCallback(
      (nextIndex: number) => {
        setFocusIndex(nextIndex)
        triggerRefs.current[nextIndex]?.focus()
      },
      [],
    )

    const handleTriggerKeyDown = useCallback(
      (index: number) =>
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
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
                enabledIndexes[(position - 1 + enabledIndexes.length) % enabledIndexes.length]
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
      [items, moveTo],
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
        {items.map((item: AccordionItem, index: number) => {
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
                <div className="mr-accordion__content">{item.content}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
)

export type { AccordionItem, AccordionProps, AccordionSize } from './Accordion.types'
