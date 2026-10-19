import { cn } from '@/lib/cn'
import type {
    DataListItemProps,
    DataListLabelProps,
    DataListProps,
    DataListValueProps,
} from './DataList.types'

export function DataListItemComponent({ ref, className, children, ...props }: DataListItemProps) {
    return (
        <div ref={ref} className={cn('mr-data-list__item', className)} {...props}>
            {children}
        </div>
    )
}

export function DataListLabel({ ref, className, children, ...props }: DataListLabelProps) {
    return (
        <dt ref={ref} className={cn('mr-data-list__label', className)} {...props}>
            {children}
        </dt>
    )
}

export function DataListValue({ ref, className, children, ...props }: DataListValueProps) {
    return (
        <dd ref={ref} className={cn('mr-data-list__value', className)} {...props}>
            {children}
        </dd>
    )
}

export function DataList({
    ref,
    items,
    children,
    columns,
    className,
    itemClassName,
    ...props
}: DataListProps) {
    return (
        <dl ref={ref} className={cn('mr-data-list', className)} data-columns={columns} {...props}>
            {items
                ? items.map((item, index) => {
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
                  })
                : children}
        </dl>
    )
}

DataList.Item = DataListItemComponent
DataList.Label = DataListLabel
DataList.Value = DataListValue

export type {
    DataListProps,
    DataListItem,
    DataListItemData,
    DataListColumns,
    DataListItemProps,
    DataListLabelProps,
    DataListValueProps,
} from './DataList.types'
