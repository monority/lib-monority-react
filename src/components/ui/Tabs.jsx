import { cn } from '@/lib/cn'

export function Tabs({ items, value, onChange, className }) {
    return (
        <div className={cn('ui-tabs', className)} role="tablist" aria-label="Tabs">
            {items.map((item) => {
                const isActive = item.value === value

                return (
                    <button
                        key={item.value}
                        type="button"
                        className={cn('ui-tabs__tab', isActive && 'is-active')}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(item.value)}
                    >
                        {item.label}
                    </button>
                )
            })}
        </div>
    )
}
