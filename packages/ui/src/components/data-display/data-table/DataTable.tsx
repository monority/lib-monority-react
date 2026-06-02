import { forwardRef, useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { EmptyState } from '@/components/feedback/empty-state/EmptyState'
import { Checkbox } from '@/components/forms/checkbox/Checkbox'
import type { Column, DataTableProps, Sort } from './DataTable.types'

function getCellValue<T>(row: T, col: Column<T>): React.ReactNode {
  return col.accessor
    ? col.accessor(row)
    : (row as Record<string, React.ReactNode>)[col.key]
}

function sortRows<T>(rows: T[], cols: Column<T>[], sort?: Sort): T[] {
  if (!sort?.key) return rows
  const col = cols.find((candidate) => candidate.key === sort.key)
  if (!col) return rows
  const dir = sort.direction === 'desc' ? -1 : 1

  return [...rows].sort((left, right) => {
    if (col.sortFn) return col.sortFn(left, right) * dir

    return (
      String(getCellValue(left, col) ?? '').localeCompare(
        String(getCellValue(right, col) ?? ''),
        undefined,
        { numeric: true, sensitivity: 'base' },
      ) * dir
    )
  })
}

export const DataTable = forwardRef(
  <T,>(
    props: DataTableProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      columns = [],
      rows = [],
      getRowId,
      emptyState,
      className,
      tableClassName,
      initialSort,
      sort: controlledSort,
      onSortChange,
      selectable = false,
      defaultSelectedRowIds = [],
      selectedRowIds,
      onSelectedRowIdsChange,
      caption,
      getRowLabel,
      ...htmlProps
    } = props

    const [internalSort, setInternalSort] = useState<Sort | undefined>(
      initialSort,
    )
    const [internalSelectedRowIds, setInternalSelectedRowIds] = useState<
      string[]
    >(defaultSelectedRowIds)
    const sort = controlledSort ?? internalSort
    const sortedRows = useMemo(
      () => sortRows(rows, columns, sort),
      [columns, rows, sort],
    )
    const hasRows = sortedRows.length > 0
    const isSelectionControlled =
      onSelectedRowIdsChange && selectedRowIds !== undefined
    const currentSelectedRowIds = isSelectionControlled
      ? selectedRowIds
      : internalSelectedRowIds
    const selectedSet = useMemo(
      () => new Set(currentSelectedRowIds),
      [currentSelectedRowIds],
    )

    const resolveRowId = useCallback(
      (row: T, index: number): string =>
        getRowId?.(row, index) ??
        (row as { id?: string }).id ??
        String(index),
      [getRowId],
    )

    const visibleRowIds = useMemo(
      () => sortedRows.map((row, index) => resolveRowId(row, index)),
      [resolveRowId, sortedRows],
    )

    const selectedVisibleCount = visibleRowIds.filter((id) =>
      selectedSet.has(id),
    ).length
    const allSelected = hasRows && selectedVisibleCount === visibleRowIds.length
    const partiallySelected = selectedVisibleCount > 0 && !allSelected

    function updateSort(col: Column<T>) {
      if (!col.sortable) return
      const next: Sort = {
        key: col.key,
        direction:
          sort?.key === col.key && sort.direction === 'asc' ? 'desc' : 'asc',
      }
      setInternalSort(next)
      onSortChange?.(next)
    }

    function commitSelection(nextSelected: string[]) {
      if (!isSelectionControlled) setInternalSelectedRowIds(nextSelected)
      onSelectedRowIdsChange?.(nextSelected)
    }

    function updateSelection(id: string, checked: boolean) {
      const next = new Set(selectedSet)
      if (checked) next.add(id)
      else next.delete(id)
      commitSelection([...next])
    }

    function updateAllSelection(checked: boolean) {
      commitSelection(checked ? visibleRowIds : [])
    }

    return (
      <div
        ref={ref}
        className={cn('mr-data-table-wrap', className)}
        data-selectable={selectable ? 'true' : undefined}
        {...htmlProps}
      >
        {hasRows ? (
          <table className={cn('mr-table mr-data-table', tableClassName)}>
            {caption ? (
              <caption className="mr-data-table__caption">{caption}</caption>
            ) : null}
            <thead className="mr-data-table__head">
              <tr className="mr-data-table__header-row">
                {selectable ? (
                  <th
                    scope="col"
                    className="mr-data-table__th mr-data-table__select-cell"
                  >
                    <Checkbox
                      size="sm"
                      className="mr-data-table__checkbox"
                      aria-label="Select all rows"
                      checked={allSelected}
                      indeterminate={partiallySelected}
                      onChange={(e) => updateAllSelection(e.target.checked)}
                    />
                  </th>
                ) : null}
                {columns.map((col) => {
                  const isSorted = sort?.key === col.key
                  const sortLabel = isSorted
                    ? sort!.direction === 'desc'
                      ? '↓'
                      : '↑'
                    : '↑'

                  return (
                    <th
                      key={col.key}
                      scope="col"
                      className={cn(
                        'mr-data-table__th',
                        col.align ? `mr-table__cell--${col.align}` : undefined,
                      )}
                      data-sortable={col.sortable ? 'true' : undefined}
                      data-sorted={isSorted ? 'true' : undefined}
                      aria-sort={
                        isSorted
                          ? sort!.direction === 'desc'
                            ? 'descending'
                            : 'ascending'
                          : undefined
                      }
                    >
                      {col.sortable ? (
                        <button
                          type="button"
                          className="mr-data-table__sort"
                          data-active={isSorted ? 'true' : undefined}
                          onClick={() => updateSort(col)}
                        >
                          <span>{col.header}</span>
                          <span
                            className="mr-data-table__sort-indicator"
                            aria-hidden="true"
                          >
                            {sortLabel}
                          </span>
                        </button>
                      ) : (
                        col.header
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="mr-data-table__body">
              {sortedRows.map((row, index) => {
                const rowId = resolveRowId(row, index)
                const rowLabel =
                  getRowLabel?.(row, index) ??
                  (row as { name?: string; title?: string }).name ??
                  (row as { title?: string }).title ??
                  String(index + 1)

                return (
                  <tr
                    key={rowId}
                    className="mr-data-table__tr"
                    data-selected={selectedSet.has(rowId) ? 'true' : undefined}
                  >
                    {selectable ? (
                      <td className="mr-data-table__td mr-data-table__select-cell">
                        <Checkbox
                          size="sm"
                          className="mr-data-table__checkbox"
                          aria-label={`Select ${rowLabel}`}
                          checked={selectedSet.has(rowId)}
                          onChange={(e) =>
                            updateSelection(rowId, e.target.checked)
                          }
                        />
                      </td>
                    ) : null}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          'mr-data-table__td',
                          col.align ? `mr-table__cell--${col.align}` : undefined,
                        )}
                      >
                        {col.render
                          ? col.render(getCellValue(row, col), row, index)
                          : getCellValue(row, col)}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          emptyState ?? (
            <EmptyState
              title="No data"
              description="Adjust filters or add a first row."
            />
          )
        )}
      </div>
    )
  },
) as <T>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement

export type { DataTableProps, Column, Sort, SortDirection } from './DataTable.types'
