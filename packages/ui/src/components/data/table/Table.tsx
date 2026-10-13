import { cn } from '@/lib/cn'
import { EmptyState } from '@/components/feedback/empty-state/EmptyState'
import type { TableProps } from './Table.types'

export function Table<T extends Record<string, unknown> = Record<string, unknown>>({
    ref,
    columns = [],
    rows = [],
    getRowId,
    emptyState,
    className,
    tableClassName,
    ...props
}: TableProps<T>) {
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
                <thead className="mr-table__head">
                    <tr className="mr-table__header-row">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                scope="col"
                                className={cn('mr-table__th', col.className)}
                            >
                                {col.label ?? col.key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="mr-table__body">
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={getRowId?.(row, rowIndex) ?? String(rowIndex)}
                            className="mr-table__tr"
                            data-row-index={rowIndex}
                        >
                            {columns.map((col) => (
                                <td key={col.key} className={cn('mr-table__td', col.className)}>
                                    {col.render
                                        ? col.render((row as Record<string, unknown>)[col.key], row)
                                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export type { TableProps, Column } from './Table.types'
