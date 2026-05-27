import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { EmptyState } from '@/components/feedback/empty-state/EmptyState'
import type { TableProps } from './Table.types'

export const Table = forwardRef<HTMLDivElement, TableProps>(
  function Table(
    {
      columns = [],
      rows = [],
      getRowId,
      emptyState,
      className,
      tableClassName,
      ...props
    },
    ref,
  ) {
    if (rows.length === 0) {
      return (
        <div ref={ref} className={cn('mr-table', className)} {...props}>
          {emptyState || <EmptyState title="No data" />}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('mr-table', className)} {...props}>
        <table className={cn('mr-table__table', tableClassName)}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={cn('mr-table__th', col.className)}>
                  {col.label ?? col.key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={getRowId?.(row, rowIndex) ?? String(rowIndex)}
                className="mr-table__tr"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn('mr-table__td', col.className)}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
)

export type { TableProps, Column } from './Table.types'
