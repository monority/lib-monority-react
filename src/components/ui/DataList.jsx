import { cn } from '@/lib/cn'

const columnsClassName = {
    auto: 'ui-data-list--auto',
    split: 'ui-data-list--split',
}

export function DataList({
    items = [],
    columns = 'auto',
    className,
    itemClassName,
}) {
    return (
        <dl className={cn('ui-data-list', columnsClassName[columns], className)}>
            {items.map((item, index) => (
                <div
                    key={item.key ?? item.label ?? index}
                    className={cn('ui-data-list__item', itemClassName)}
                >
                    <dt className="ui-data-list__label">{item.label}</dt>
                    <dd className="ui-data-list__value">
                        {item.render ? item.render(item.value, item, index) : item.value}
                    </dd>
                </div>
            ))}
        </dl>
    )
}
