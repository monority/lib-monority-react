import { createContext, useContext, useId } from 'react'
import { cn } from '@/lib/cn'
import { useControllableState } from '@/internal/use-controllable-state'
import type {
    SegmentedControlItemProps,
    SegmentedControlOption,
    SegmentedControlProps,
    SegmentedControlSize,
} from './SegmentedControl.types'

interface SegmentedControlContextValue {
    value: string
    onChange: (val: string) => void
    size?: SegmentedControlSize
    disabled?: boolean
    name?: string
}

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null)

export function SegmentedControlItem({
    ref,
    value: itemValue,
    disabled = false,
    className,
    children,
    ...props
}: SegmentedControlItemProps) {
    const context = useContext(SegmentedControlContext)
    const isSelected = context ? context.value === itemValue : false
    const isDisabled = (context?.disabled ?? false) || disabled

    return (
        <button
            ref={ref}
            type="button"
            role="radio"
            aria-checked={isSelected}
            data-selected={isSelected ? true : undefined}
            disabled={isDisabled}
            className={cn('mr-segmented-control__item', className)}
            onClick={() => {
                if (!isDisabled) {
                    context?.onChange(itemValue)
                }
            }}
            {...props}
        >
            {children}
        </button>
    )
}

export function SegmentedControl({
    ref,
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    size = 'md',
    fullWidth = false,
    disabled = false,
    name,
    children,
    className,
    ...props
}: SegmentedControlProps) {
    const generatedId = useId()
    const groupName = name ?? generatedId

    const initialDefault = defaultValue !== undefined ? defaultValue : (options?.[0]?.value ?? '')

    const [value, setValue] = useControllableState<string>({
        value: controlledValue,
        defaultValue: initialDefault,
        onChange,
    })

    const contextValue: SegmentedControlContextValue = {
        value,
        onChange: setValue,
        size,
        disabled,
        name: groupName,
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!options || options.length === 0) return
        const enabledOptions = options.filter((o) => !o.disabled && !disabled)
        if (enabledOptions.length === 0) return

        const currentIndex = enabledOptions.findIndex((o) => o.value === value)

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault()
            const nextIndex = (currentIndex + 1) % enabledOptions.length
            setValue(enabledOptions[nextIndex]!.value)
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault()
            const prevIndex = (currentIndex - 1 + enabledOptions.length) % enabledOptions.length
            setValue(enabledOptions[prevIndex]!.value)
        } else if (e.key === 'Home') {
            e.preventDefault()
            setValue(enabledOptions[0]!.value)
        } else if (e.key === 'End') {
            e.preventDefault()
            setValue(enabledOptions[enabledOptions.length - 1]!.value)
        }
    }

    return (
        <SegmentedControlContext.Provider value={contextValue}>
            <div
                ref={ref}
                role="radiogroup"
                data-size={size}
                data-full-width={fullWidth ? true : undefined}
                data-disabled={disabled ? true : undefined}
                className={cn('mr-segmented-control', className)}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {options
                    ? options.map((option: SegmentedControlOption) => (
                          <SegmentedControlItem
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                          >
                              {option.label}
                          </SegmentedControlItem>
                      ))
                    : children}
            </div>
        </SegmentedControlContext.Provider>
    )
}

SegmentedControl.Item = SegmentedControlItem

export type {
    SegmentedControlProps,
    SegmentedControlItemProps,
    SegmentedControlOption,
    SegmentedControlSize,
} from './SegmentedControl.types'
