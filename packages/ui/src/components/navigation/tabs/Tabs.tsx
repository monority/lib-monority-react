import { createContext, useCallback, useContext, useId, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import type {
    TabItem,
    TabsContentProps,
    TabsListProps,
    TabsProps,
    TabsSize,
    TabsTone,
    TabsTriggerProps,
} from './Tabs.types'

interface TabsContextValue {
    value: string
    setValue: (val: string) => void
    tone: TabsTone
    size: TabsSize
    disabled?: boolean
    fullWidth?: boolean
    instanceId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

export function Tabs({
    ref,
    tone = 'neutral',
    size = 'md',
    items,
    value,
    defaultValue,
    onChange,
    className,
    'aria-label': ariaLabel = 'Tabs',
    disabled = false,
    fullWidth = false,
    children,
    ...props
}: TabsProps) {
    const instanceId = useId()
    const resolvedTone = tone ?? 'neutral'
    const resolvedSize = size ?? 'md'

    const [internalValue, setInternalValue] = useState(defaultValue ?? items?.[0]?.value ?? '')
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

    const isItemDisabled = useCallback(
        (index: number) => disabled || items?.[index]?.disabled === true,
        [disabled, items]
    )

    const getNextEnabledIndex = useCallback(
        (currentIndex: number, direction: number) => {
            if (!items?.length) return -1
            let next = currentIndex
            for (let step = 0; step < items.length; step += 1) {
                next = (next + direction + items.length) % items.length
                if (!isItemDisabled(next)) return next
            }
            return -1
        },
        [items, isItemDisabled]
    )

    const getFirstEnabledIndex = useCallback(() => {
        if (!items?.length) return -1
        for (let index = 0; index < items.length; index += 1) {
            if (!isItemDisabled(index)) return index
        }
        return -1
    }, [items, isItemDisabled])

    const getLastEnabledIndex = useCallback(() => {
        if (!items?.length) return -1
        for (let index = items.length - 1; index >= 0; index -= 1) {
            if (!isItemDisabled(index)) return index
        }
        return -1
    }, [items, isItemDisabled])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent, index: number) => {
            if (!items?.length) return
            let nextIndex: number | null = null
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
                nextIndex = getNextEnabledIndex(index, 1)
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
                nextIndex = getNextEnabledIndex(index, -1)
            else if (e.key === 'Home') nextIndex = getFirstEnabledIndex()
            else if (e.key === 'End') nextIndex = getLastEnabledIndex()
            if (nextIndex === null || nextIndex < 0) return
            e.preventDefault()
            const nextItem = items[nextIndex]
            if (!nextItem) return
            handleChange(nextItem.value)
            document.getElementById(`${instanceId}-tab-${nextIndex}`)?.focus()
        },
        [
            items,
            handleChange,
            getNextEnabledIndex,
            getFirstEnabledIndex,
            getLastEnabledIndex,
            instanceId,
        ]
    )

    const contextValue: TabsContextValue = {
        value: resolvedValue,
        setValue: handleChange,
        tone: resolvedTone,
        size: resolvedSize,
        disabled,
        fullWidth,
        instanceId,
    }

    if (children) {
        return (
            <TabsContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cn('mr-tabs-root', className)}
                    data-tone={resolvedTone}
                    data-size={resolvedSize}
                    {...props}
                >
                    {children}
                </div>
            </TabsContext.Provider>
        )
    }

    return (
        <div
            ref={ref}
            className={cn('mr-tabs', className)}
            role="tablist"
            aria-label={ariaLabel}
            data-tone={resolvedTone}
            data-size={resolvedSize}
            data-disabled={disabled ? 'true' : undefined}
            data-full-width={fullWidth ? 'true' : undefined}
            {...props}
        >
            {items?.map((item, index) => {
                const isActive = item.value === resolvedValue
                const isTabDisabled = disabled || item.disabled === true
                const tabId = `${instanceId}-tab-${index}`

                return (
                    <button
                        key={item.value}
                        id={tabId}
                        type="button"
                        className={cn('mr-tabs__tab')}
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
}

function TabsList({
    ref,
    tone,
    size,
    disabled,
    fullWidth,
    className,
    children,
    onKeyDown,
    ...props
}: TabsListProps) {
    const context = useContext(TabsContext)
    const resolvedTone = tone ?? context?.tone ?? 'neutral'
    const resolvedSize = size ?? context?.size ?? 'md'
    const resolvedDisabled = disabled ?? context?.disabled ?? false
    const resolvedFullWidth = fullWidth ?? context?.fullWidth ?? false

    function handleListKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        onKeyDown?.(e)
        if (e.defaultPrevented) return
        const target = e.target as HTMLElement
        if (target.getAttribute('role') !== 'tab') return
        const tabs = Array.from(
            e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
        )
        if (!tabs.length) return
        const currentIndex = tabs.indexOf(target as HTMLButtonElement)
        let nextIndex: number | null = null
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % tabs.length
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
        } else if (e.key === 'Home') {
            nextIndex = 0
        } else if (e.key === 'End') {
            nextIndex = tabs.length - 1
        }
        if (nextIndex !== null) {
            const nextTab = tabs[nextIndex]
            if (nextTab) {
                e.preventDefault()
                nextTab.focus()
                nextTab.click()
            }
        }
    }

    return (
        <div
            ref={ref}
            role="tablist"
            className={cn('mr-tabs', className)}
            data-tone={resolvedTone}
            data-size={resolvedSize}
            data-disabled={resolvedDisabled ? 'true' : undefined}
            data-full-width={resolvedFullWidth ? 'true' : undefined}
            onKeyDown={handleListKeyDown}
            {...props}
        >
            {children}
        </div>
    )
}

function TabsTrigger({
    ref,
    value,
    disabled = false,
    className,
    children,
    onClick,
    ...props
}: TabsTriggerProps) {
    const context = useContext(TabsContext)
    const isActive = context ? context.value === value : false
    const isDisabled = disabled || context?.disabled

    return (
        <button
            ref={ref}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled || undefined}
            tabIndex={isActive ? 0 : -1}
            disabled={isDisabled}
            className={cn('mr-tabs__tab', className)}
            data-active={isActive ? 'true' : undefined}
            data-disabled={isDisabled ? 'true' : undefined}
            onClick={(e) => {
                onClick?.(e)
                if (!isDisabled && context) {
                    context.setValue(value)
                }
            }}
            {...props}
        >
            {children}
        </button>
    )
}

function TabsContent({
    ref,
    value,
    forceMount = false,
    className,
    children,
    ...props
}: TabsContentProps) {
    const context = useContext(TabsContext)
    const isActive = context ? context.value === value : true

    if (!isActive && !forceMount) {
        return null
    }

    return (
        <div
            ref={ref}
            role="tabpanel"
            tabIndex={0}
            hidden={!isActive}
            className={cn('mr-tabs__content', className)}
            {...props}
        >
            {children}
        </div>
    )
}

TabsList.displayName = 'Tabs.List'
TabsTrigger.displayName = 'Tabs.Trigger'
TabsContent.displayName = 'Tabs.Content'

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export { TabsList, TabsTrigger, TabsContent }
export type {
    TabsProps,
    TabsTone,
    TabsSize,
    TabItem,
    TabsListProps,
    TabsTriggerProps,
    TabsContentProps,
} from './Tabs.types'
