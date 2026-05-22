import { cn } from '@/lib/cn'
import './DataList.css'

type DataListColumns = 'auto' | 'split'
interface DataListItem { key?: string; label: React.ReactNode; value: React.ReactNode; render?: (value: React.ReactNode, item: DataListItem, index: number) => React.ReactNode }
interface DataListProps { items?: DataListItem[]; columns?: DataListColumns; className?: string; itemClassName?: string }
const cc: Record<DataListColumns, string> = { auto: 'ui-data-list--auto', split: 'ui-data-list--split' }

export function DataList({ items = [], columns = 'auto', className, itemClassName }: DataListProps) {
  return <dl className={cn('ui-data-list', cc[columns], className)}>{items.map((item, index) => <div key={item.key ?? (typeof item.label === 'string' ? item.label : String(index))} className={cn('ui-data-list__item', itemClassName)}><dt className="ui-data-list__label">{item.label}</dt><dd className="ui-data-list__value">{item.render ? item.render(item.value, item, index) : item.value as React.ReactNode}</dd></div>)}</dl>
}
