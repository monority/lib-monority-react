import { createContext, useContext } from 'react'
import { cn } from '@/lib/cn'
import { useControllableState } from '@/internal/use-controllable-state'
import { Toggle } from '../toggle'
import type {
    ToggleGroupProps,
    ToggleGroupItemProps,
    ToggleGroupType,
    ToggleGroupSize,
    ToggleGroupVariant,
    ToggleGroupTone,
} from './ToggleGroup.types'

interface ToggleGroupContextValue {
    type: ToggleGroupType
    value: string | string[]
    onToggle: (itemValue: string) => void
    disabled?: boolean
    size?: ToggleGroupSize
    variant?: ToggleGroupVariant
    tone?: ToggleGroupTone
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null)

export function ToggleGroupItem({
    value: itemValue,
    disabled = false,
    className,
    children,
    ref,
    ...props
}: ToggleGroupItemProps) {
    const context = useContext(ToggleGroupContext)
    const isSelected = context
        ? context.type === 'single'
            ? context.value === itemValue
            : Array.isArray(context.value) && context.value.includes(itemValue)
        : false

    const isDisabled = (context?.disabled ?? false) || disabled

    return (
        <Toggle
            ref={ref}
            pressed={isSelected}
            onPressedChange={() => context?.onToggle(itemValue)}
            disabled={isDisabled}
            variant={context?.variant}
            size={context?.size}
            tone={context?.tone}
            className={cn(
                'mr-toggle-group__item',
                isSelected && 'mr-toggle-group__item--active',
                className
            )}
            {...props}
        >
            {children}
        </Toggle>
    )
}

export function ToggleGroup({
    type = 'single',
    value: controlledValue,
    defaultValue,
    onValueChange,
    disabled = false,
    orientation = 'horizontal',
    variant,
    size,
    tone = 'neutral',
    items,
    children,
    className,
    ref,
    ...props
}: ToggleGroupProps) {
    const initialDefault = defaultValue !== undefined ? defaultValue : type === 'single' ? '' : []

    const [value, setValue] = useControllableState<string | string[]>({
        value: controlledValue,
        defaultValue: initialDefault,
        onChange: onValueChange,
    })

    const handleToggle = (itemValue: string) => {
        let nextValue: string | string[]
        if (type === 'single') {
            nextValue = value === itemValue ? '' : itemValue
        } else {
            const arr = Array.isArray(value) ? [...value] : []
            const idx = arr.indexOf(itemValue)
            if (idx >= 0) {
                arr.splice(idx, 1)
            } else {
                arr.push(itemValue)
            }
            nextValue = arr
        }
        setValue(nextValue)
    }

    const contextValue: ToggleGroupContextValue = {
        type,
        value,
        onToggle: handleToggle,
        disabled,
        size,
        variant,
        tone,
    }

    return (
        <ToggleGroupContext.Provider value={contextValue}>
            <div
                ref={ref}
                role={type === 'multiple' ? 'toolbar' : 'group'}
                aria-orientation={type === 'multiple' ? orientation : undefined}
                data-orientation={orientation}
                data-size={size}
                data-tone={tone}
                className={cn('mr-toggle-group', className)}
                {...props}
            >
                {items?.map((item) => (
                    <ToggleGroupItem key={item.value} value={item.value} disabled={item.disabled}>
                        {item.label}
                    </ToggleGroupItem>
                ))}
                {children}
            </div>
        </ToggleGroupContext.Provider>
    )
}

ToggleGroup.Item = ToggleGroupItem

export type {
    ToggleGroupProps,
    ToggleGroupItemProps,
    ToggleGroupItem as ToggleGroupItemData,
    ToggleGroupType,
    ToggleGroupOrientation,
    ToggleGroupVariant,
    ToggleGroupSize,
    ToggleGroupTone,
} from './ToggleGroup.types'
