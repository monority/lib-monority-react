import { forwardRef, useCallback, useId, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { TabsProps } from './Tabs.types'

const tabsVariants = cva({
    base: 'mr-tabs',
    variants: {
        tone: {
            neutral: 'mr-tabs--neutral',
            accent: 'mr-tabs--accent',
            danger: 'mr-tabs--danger',
        },
        size: {
            sm: 'mr-tabs--sm',
            md: 'mr-tabs--md',
            lg: 'mr-tabs--lg',
        },
    },
    defaultVariants: { tone: 'neutral', size: 'md' },
})

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
    {
        tone,
        size,
        items,
        value,
        defaultValue,
        onChange,
        className,
        'aria-label': ariaLabel = 'Tabs',
        disabled = false,
        fullWidth = false,
        ...props
    },
    ref
) {
    const instanceId = useId()
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = size ?? 'md'

    const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? '')
    const isControlled = value !== undefined
    const resolvedValue = isControlled ? value : internalValue

    const handleChange = useCallback(
        (next: string) => {
            if (!isControlled) {
                setInternalValue(next)
            }
            onChange?.(next)
        },
        [isControlled, onChange]
    )

    const getNextIndex = useCallback(
        (currentIndex: number, direction: number) =>
            (currentIndex + direction + items.length) % items.length,
        [items.length]
    )

    const handleKeyDown = useCallback(
        (e: KeyboardEvent, index: number) => {
            if (!items.length) return
            let nextIndex: number | null = null
            if (e.key === 'ArrowRight') nextIndex = getNextIndex(index, 1)
            else if (e.key === 'ArrowLeft') nextIndex = getNextIndex(index, -1)
            else if (e.key === 'Home') nextIndex = 0
            else if (e.key === 'End') nextIndex = items.length - 1
            if (nextIndex === null) return
            e.preventDefault()
            const nextItem = items[nextIndex]
            if (!nextItem) return
            handleChange(nextItem.value)
            // Roving tabindex: selection alone is not enough — keyboard focus
            // must follow, otherwise focus strands on a tab with tabIndex -1.
            document.getElementById(`${instanceId}-tab-${nextIndex}`)?.focus()
        },
        [items, handleChange, getNextIndex, instanceId]
    )

    return (
        <div
            ref={ref}
            className={cn(
                tabsVariants({ tone: resolvedTone, size: resolvedSize }),
                fullWidth && 'mr-tabs--full-width',
                disabled && 'mr-tabs--disabled',
                className
            )}
            role="tablist"
            aria-label={ariaLabel}
            data-tone={resolvedTone}
            data-size={resolvedSize}
            data-disabled={disabled ? 'true' : undefined}
            data-full-width={fullWidth ? 'true' : undefined}
            {...props}
        >
            {items.map((item, index) => {
                const isActive = item.value === resolvedValue
                const tabId = `${instanceId}-tab-${index}`

                return (
                    <button
                        key={item.value}
                        id={tabId}
                        type="button"
                        className={cn('mr-tabs__tab', isActive && 'mr-tabs__tab--active')}
                        role="tab"
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                        disabled={disabled}
                        onClick={() => handleChange(item.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        data-active={isActive ? 'true' : undefined}
                        data-disabled={disabled ? 'true' : undefined}
                    >
                        {item.label}
                    </button>
                )
            })}
        </div>
    )
})

export type { TabsProps, TabsTone, TabsSize, TabItem } from './Tabs.types'
