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

    const isItemDisabled = useCallback((index: number) => disabled || items[index]?.disabled === true, [disabled, items])

    const getNextEnabledIndex = useCallback(
        (currentIndex: number, direction: number) => {
            if (!items.length) return -1
            let next = currentIndex
            for (let step = 0; step < items.length; step += 1) {
                next = (next + direction + items.length) % items.length
                if (!isItemDisabled(next)) return next
            }
            return -1
        },
        [items.length, isItemDisabled]
    )

    const getFirstEnabledIndex = useCallback(() => {
        for (let index = 0; index < items.length; index += 1) {
            if (!isItemDisabled(index)) return index
        }
        return -1
    }, [items.length, isItemDisabled])

    const getLastEnabledIndex = useCallback(() => {
        for (let index = items.length - 1; index >= 0; index -= 1) {
            if (!isItemDisabled(index)) return index
        }
        return -1
    }, [items.length, isItemDisabled])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent, index: number) => {
            if (!items.length) return
            let nextIndex: number | null = null
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIndex = getNextEnabledIndex(index, 1)
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIndex = getNextEnabledIndex(index, -1)
            else if (e.key === 'Home') nextIndex = getFirstEnabledIndex()
            else if (e.key === 'End') nextIndex = getLastEnabledIndex()
            if (nextIndex === null || nextIndex < 0) return
            e.preventDefault()
            const nextItem = items[nextIndex]
            if (!nextItem) return
            handleChange(nextItem.value)
            // Roving tabindex: selection alone is not enough — keyboard focus
            // must follow, otherwise focus strands on a tab with tabIndex -1.
            document.getElementById(`${instanceId}-tab-${nextIndex}`)?.focus()
        },
        [items, handleChange, getNextEnabledIndex, getFirstEnabledIndex, getLastEnabledIndex, instanceId]
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
                const isTabDisabled = disabled || item.disabled === true
                const tabId = `${instanceId}-tab-${index}`

                return (
                    <button
                        key={item.value}
                        id={tabId}
                        type="button"
                        className={cn('mr-tabs__tab', isActive && 'mr-tabs__tab--active')}
                        role="tab"
                        aria-selected={isActive}
                        aria-disabled={isTabDisabled || undefined}
                        tabIndex={isActive ? 0 : -1}
                        disabled={isTabDisabled}
                        onClick={() => handleChange(item.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        data-active={isActive ? 'true' : undefined}
                        data-disabled={isTabDisabled ? 'true' : undefined}
                    >
                        {item.label}
                    </button>
                )
            })}
        </div>
    )
})

export type { TabsProps, TabsTone, TabsSize, TabItem } from './Tabs.types'
