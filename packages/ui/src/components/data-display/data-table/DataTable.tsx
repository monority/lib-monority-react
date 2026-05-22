import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { EmptyState } from '@/components/feedback/empty-state/EmptyState'
import './DataTable.css'

type SortDirection = 'asc' | 'desc'
interface Column<T = unknown> { key: string; header: React.ReactNode; align?: 'left' | 'center' | 'right'; sortable?: boolean; sortFn?: (left: T, right: T) => number; accessor?: (row: T) => React.ReactNode; render?: (value: React.ReactNode, row: T, index: number) => React.ReactNode }
interface Sort { key: string; direction: SortDirection }
interface DataTableProps<T = unknown> { columns?: Column<T>[]; rows?: T[]; getRowId?: (row: T, index: number) => string; emptyState?: React.ReactNode; className?: string; tableClassName?: string; initialSort?: Sort; sort?: Sort; onSortChange?: (sort: Sort) => void; selectable?: boolean; defaultSelectedRowIds?: string[]; selectedRowIds?: string[]; onSelectedRowIdsChange?: (selectedRowIds: string[]) => void; caption?: React.ReactNode; getRowLabel?: (row: T, index: number) => string }

const getCellValue = <T,>(row: T, col: Column<T>): React.ReactNode => col.accessor ? col.accessor(row) : (row as Record<string, React.ReactNode>)[col.key]

const sortRows = <T,>(rows: T[], cols: Column<T>[], sort?: Sort): T[] => {
  if (!sort?.key) return rows; const col = cols.find((c) => c.key === sort.key); if (!col) return rows; const d = sort.direction === 'desc' ? -1 : 1
  return [...rows].sort((a, b) => { if (col.sortFn) return col.sortFn(a, b) * d; return String(getCellValue(a, col) ?? '').localeCompare(String(getCellValue(b, col) ?? ''), undefined, { numeric: true, sensitivity: 'base' }) * d })
}

export function DataTable<T = unknown>({ columns = [], rows = [], getRowId, emptyState, className, tableClassName, initialSort, sort: controlledSort, onSortChange, selectable = false, defaultSelectedRowIds = [], selectedRowIds, onSelectedRowIdsChange, caption, getRowLabel }: DataTableProps<T>) {
  const [internalSort, setInternalSort] = useState<Sort | undefined>(initialSort)
  const [internalSelectedRowIds, setInternalSelectedRowIds] = useState<string[]>(defaultSelectedRowIds)
  const selectAllRef = useRef<HTMLInputElement>(null); const sort = controlledSort ?? internalSort
  const sortedRows = useMemo(() => sortRows(rows, columns, sort), [columns, rows, sort]); const hasRows = sortedRows.length > 0
  const isSelectionControlled = onSelectedRowIdsChange && selectedRowIds !== undefined
  const currentSelectedRowIds = isSelectionControlled ? selectedRowIds : internalSelectedRowIds
  const selectedSet = useMemo(() => new Set(currentSelectedRowIds), [currentSelectedRowIds])
  const resolveRowId = useCallback((row: T, index: number): string => getRowId?.(row, index) ?? (row as { id?: string }).id ?? String(index), [getRowId])
  const visibleRowIds = useMemo(() => sortedRows.map((row, index) => resolveRowId(row, index)), [resolveRowId, sortedRows])
  const selectedVisibleCount = visibleRowIds.filter((id) => selectedSet.has(id)).length
  const allSelected = hasRows && selectedVisibleCount === visibleRowIds.length; const partiallySelected = selectedVisibleCount > 0 && !allSelected
  useEffect(() => { if (selectAllRef.current) selectAllRef.current.indeterminate = partiallySelected }, [partiallySelected])
  const updateSort = (col: Column<T>) => { if (!col.sortable) return; const ns: Sort = { key: col.key, direction: sort?.key === col.key && sort.direction === 'asc' ? 'desc' : 'asc' }; setInternalSort(ns); onSortChange?.(ns) }
  const commitSelection = (ns: string[]) => { if (!isSelectionControlled) setInternalSelectedRowIds(ns); onSelectedRowIdsChange?.(ns) }
  const updateSelection = (id: string, checked: boolean) => { const n = new Set(selectedSet); checked ? n.add(id) : n.delete(id); commitSelection([...n]) }
  const updateAllSelection = (checked: boolean) => { commitSelection(checked ? visibleRowIds : []) }
  return <div className={cn('ui-table-wrap ui-data-table-wrap', className)}>{hasRows ? <table className={cn('ui-table ui-data-table', tableClassName)}>{caption ? <caption className="ui-data-table__caption">{caption}</caption> : null}<thead><tr>{selectable ? <th scope="col" className="ui-data-table__select-cell"><input ref={selectAllRef} className="ui-data-table__checkbox" type="checkbox" aria-label="Selectionner toutes les lignes" checked={allSelected} onChange={(e) => updateAllSelection(e.target.checked)} /></th> : null}{columns.map((col) => { const isSorted = sort?.key === col.key; return <th key={col.key} scope="col" className={cn(col.align && `ui-table__cell--${col.align}`)} aria-sort={isSorted ? (sort!.direction === 'desc' ? 'descending' : 'ascending') : undefined}>{col.sortable ? <button type="button" className="ui-data-table__sort" onClick={() => updateSort(col)}><span>{col.header}</span><span aria-hidden="true">{isSorted && sort!.direction === 'desc' ? 'v' : '^'}</span></button> : col.header}</th> })}</tr></thead><tbody>{sortedRows.map((row, index) => { const rowId = resolveRowId(row, index); const rowLabel = getRowLabel?.(row, index) ?? (row as { name?: string; title?: string }).name ?? (row as { title?: string }).title ?? String(index + 1); return <tr key={rowId}>{selectable ? <td className="ui-data-table__select-cell"><input className="ui-data-table__checkbox" type="checkbox" aria-label={`Selectionner ${rowLabel}`} checked={selectedSet.has(rowId)} onChange={(e) => updateSelection(rowId, e.target.checked)} /></td> : null}{columns.map((col) => <td key={col.key} className={cn(col.align && `ui-table__cell--${col.align}`)}>{col.render ? col.render(getCellValue(row, col), row, index) : getCellValue(row, col)}</td>)}</tr> })}</tbody></table> : (emptyState ?? <EmptyState title="Aucune donnee" description="Ajuste les filtres ou ajoute une premiere ligne." />)}</div>
}
