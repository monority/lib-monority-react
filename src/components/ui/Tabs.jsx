import { useId } from 'react'
import { cn } from '@/lib/cn'

export function Tabs({ items, value, onChange, className, ariaLabel = 'Tabs' }) {
    const instanceId = useId()

    function getNextIndex(currentIndex, direction) {
        return (currentIndex + direction + items.length) % items.length
    }

    function handleKeyDown(event, index) {
        if (!items.length) {
            return
        }

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault()
            onChange(items[getNextIndex(index, 1)].value)
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault()
            onChange(items[getNextIndex(index, -1)].value)
        }

        if (event.key === 'Home') {
            event.preventDefault()
            onChange(items[0].value)
        }

        if (event.key === 'End') {
            event.preventDefault()
            onChange(items[items.length - 1].value)
        }
    }

    return (
        <div className={cn('ui-tabs', className)} role="tablist" aria-label={ariaLabel}>
            {items.map((item, index) => {
                const isActive = item.value === value
                const tabId = `${instanceId}-tab-${index}`
                const panelId = `${instanceId}-panel-${index}`

                return (
                    <button
                        key={item.value}
                        id={tabId}
                        type="button"
                        className={cn('ui-tabs__tab', isActive && 'is-active')}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={panelId}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => onChange(item.value)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                    >
                        {item.label}
                    </button>
                )
            })}
        </div>
    )
}
