import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { DataListProps, DataListItem } from './DataList.types'

const dataListVariants = cva({
  base: 'mr-data-list',
  variants: {
    columns: {
      auto: 'mr-data-list--auto',
      split: 'mr-data-list--split',
    },
  },
  defaultVariants: { columns: 'auto' },
})

export const DataList = forwardRef<HTMLDListElement, DataListProps>(
  function DataList(
    { items = [], columns, className, itemClassName, ...props },
    ref,
  ) {
    return (
      <dl
        ref={ref}
        className={cn(dataListVariants({ columns }), className)}
        data-columns={columns}
        {...props}
      >
        {items.map((item, index) => (
          <div
            key={item.key ?? (typeof item.label === 'string' ? item.label : String(index))}
            className={cn('mr-data-list__item', itemClassName)}
          >
            <dt className="mr-data-list__label">{item.label}</dt>
            <dd className="mr-data-list__value">
              {item.render ? item.render(item.value, item, index) : item.value}
            </dd>
          </div>
        ))}
      </dl>
    )
  },
)

export type { DataListProps, DataListItem, DataListColumns } from './DataList.types'
