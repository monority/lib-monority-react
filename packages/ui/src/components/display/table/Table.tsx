import { cn } from '@/lib/cn'
import { EmptyState } from '@/components/feedback/empty-state/EmptyState'

interface Column { key: string; header: React.ReactNode; align?: 'left' | 'center' | 'right'; render?: (value: React.ReactNode, row: Record<string, React.ReactNode>, index: number) => React.ReactNode }
interface TableProps { columns?: Column[]; rows?: Record<string, React.ReactNode>[]; getRowId?: (row: Record<string, React.ReactNode>, index: number) => string; emptyState?: React.ReactNode; className?: string; tableClassName?: string }

export function Table({ columns = [], rows = [], getRowId, emptyState, className, tableClassName }: TableProps) {
  const hasRows = rows.length > 0
  return <div className={cn('ui-table-wrap', className)}>{hasRows ? <table className={cn('ui-table', tableClassName)}><thead><tr>{columns.map((col) => <th key={col.key} scope="col" className={cn(col.align && `ui-table__cell--${col.align}`)}>{col.header}</th>)}</tr></thead><tbody>{rows.map((row, index) => (<tr key={getRowId?.(row, index) ?? (row as { id?: string }).id ?? index}>{columns.map((col) => (<td key={col.key} className={cn(col.align && `ui-table__cell--${col.align}`)}>{col.render ? col.render((row as Record<string, unknown>)[col.key] as React.ReactNode, row, index) : (row as Record<string, unknown>)[col.key] as React.ReactNode}</td>))}</tr>))}</tbody></table> : (emptyState ?? <EmptyState title="Aucune ligne" description="Ajoute des donnees pour alimenter ce tableau." />)}</div>
}
