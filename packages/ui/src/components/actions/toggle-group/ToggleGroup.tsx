import { forwardRef, useState, useEffect } from 'react'
import { cn } from '@/lib/cn'
import { Toggle } from '../toggle'
import type { ToggleGroupProps } from './ToggleGroup.types'

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(
    {
      type = 'single',
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled = false,
      orientation = 'horizontal',
      variant,
      size,
      items,
      className,
      ...props
    },
    ref,
  ) {
    const initialValue = defaultValue ?? (type === 'single' ? '' : [])
    const [internalValue, setInternalValue] = useState<string | string[]>(initialValue)
    const value = controlledValue ?? internalValue

    useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue)
      }
    }, [controlledValue])

    const isSelected = (itemValue: string) => {
      if (type === 'single') return value === itemValue
      return Array.isArray(value) && value.includes(itemValue)
    }

    const handleToggle = (itemValue: string) => {
      let newValue: string | string[]
      if (type === 'single') {
        newValue = value === itemValue ? '' : itemValue
      } else {
        const arr = Array.isArray(value) ? [...value] : []
        const idx = arr.indexOf(itemValue)
        if (idx >= 0) arr.splice(idx, 1)
        else arr.push(itemValue)
        newValue = arr
      }
      if (controlledValue === undefined) setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    const isItemDisabled = (itemValue: string) => {
      return disabled || items.find(i => i.value === itemValue)?.disabled
    }

    return (
      <div
        ref={ref}
        role={type === 'multiple' ? 'toolbar' : 'group'}
        aria-orientation={orientation}
        data-orientation={orientation}
        className={cn(
          'mr-toggle-group',
          `mr-toggle-group--${orientation}`,
          className,
        )}
        {...props}
      >
        {items.map(item => (
          <Toggle
            key={item.value}
            pressed={isSelected(item.value)}
            onPressedChange={() => handleToggle(item.value)}
            disabled={isItemDisabled(item.value)}
            variant={variant}
            size={size}
            className={cn(
              'mr-toggle-group__item',
              isSelected(item.value) && 'mr-toggle-group__item--active',
            )}
          >
            {item.label}
          </Toggle>
        ))}
      </div>
    )
  },
)

export type {
  ToggleGroupProps,
  ToggleGroupItem,
  ToggleGroupType,
  ToggleGroupOrientation,
  ToggleGroupVariant,
  ToggleGroupSize,
} from './ToggleGroup.types'
