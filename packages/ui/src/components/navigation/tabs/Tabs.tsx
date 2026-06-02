import { forwardRef, useCallback, useId } from 'react'
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
    onChange,
    className,
    'aria-label': ariaLabel = 'Tabs',
    disabled = false,
    fullWidth = false,
    ...props
  },
  ref,
) {
  const instanceId = useId()
  const resolvedTone = tone ?? 'neutral'
  const resolvedSize = size ?? 'md'

  const getNextIndex = useCallback(
    (currentIndex: number, direction: number) =>
      (currentIndex + direction + items.length) % items.length,
    [items.length],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, index: number) => {
      if (!items.length) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        const nextItem = items[getNextIndex(index, 1)]
        if (nextItem) onChange(nextItem.value)
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const nextItem = items[getNextIndex(index, -1)]
        if (nextItem) onChange(nextItem.value)
      }
      if (e.key === 'Home' && items[0]) {
        e.preventDefault()
        onChange(items[0].value)
      }
      const lastItem = items[items.length - 1]
      if (e.key === 'End' && lastItem) {
        e.preventDefault()
        onChange(lastItem.value)
      }
    },
    [items, onChange, getNextIndex],
  )

  return (
    <div
      ref={ref}
      className={cn(
        tabsVariants({ tone: resolvedTone, size: resolvedSize }),
        fullWidth && 'mr-tabs--full-width',
        disabled && 'mr-tabs--disabled',
        className,
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
        const isActive = item.value === value
        const tabId = `${instanceId}-tab-${index}`
        const panelId = `${instanceId}-panel-${index}`

        return (
          <button
            key={item.value}
            id={tabId}
            type="button"
            className={cn('mr-tabs__tab', isActive && 'mr-tabs__tab--active')}
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            onClick={() => onChange(item.value)}
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
