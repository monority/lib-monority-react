import { cn } from '@/lib/cn'
import { Button } from './Button'
import { Text } from './Text'

export function FilterBar({
    leading,
    filters = [],
    resultsCount,
    onReset,
    resetLabel = 'Reset',
    className,
}) {
    const hasFilters = filters.length > 0

    return (
        <div className={cn('ui-filter-bar', className)}>
            <div className="ui-filter-bar__main">
                {leading ? <div className="ui-filter-bar__leading">{leading}</div> : null}
                {hasFilters ? (
                    <div className="ui-filter-bar__chips">
                        {filters.map((filter, index) => (
                            <span
                                key={filter.key ?? filter.label ?? index}
                                className="ui-filter-bar__chip"
                            >
                                {filter.label}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="ui-filter-bar__meta">
                {typeof resultsCount === 'number' ? (
                    <Text tone="muted" size="sm">
                        {resultsCount} results
                    </Text>
                ) : null}
                {hasFilters && onReset ? (
                    <Button size="sm" variant="ghost" onClick={onReset}>
                        {resetLabel}
                    </Button>
                ) : null}
            </div>
        </div>
    )
}
