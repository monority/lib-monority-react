import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { DataListProps } from './DataList.types'

export const DataList = forwardRef<HTMLDListElement, DataListProps>(function DataList(
    { items = [], columns, className, itemClassName, ...props },
    ref
) {
    return (
        <dl ref={ref} className={cn('mr-data-list', className)} data-columns={columns} {...props}>
            {items.map((item, index) => {
                const itemKey =
                    item.key ?? (typeof item.label === 'string' ? item.label : String(index))

                return (
                    <div
                        key={itemKey}
                        className={cn('mr-data-list__item', itemClassName)}
                        data-row-index={index}
                    >
                        <dt className="mr-data-list__label">{item.label}</dt>
                        <dd className="mr-data-list__value">
                            {item.render ? item.render(item.value, item, index) : item.value}
                        </dd>
                    </div>
                )
            })}
        </dl>
    )
})

export type { DataListProps, DataListItem, DataListColumns } from './DataList.types'
