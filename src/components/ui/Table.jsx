import { cn } from '@/lib/cn'
import { EmptyState } from './EmptyState'

export function Table({
    columns = [],
    rows = [],
    getRowId,
    emptyState,
    className,
    tableClassName,
}) {
    const hasRows = rows.length > 0

    return (
        <div className={cn('ui-table-wrap', className)}>
            {hasRows ? (
                <table className={cn('ui-table', tableClassName)}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    scope="col"
                                    className={cn(
                                        column.align && `ui-table__cell--${column.align}`,
                                    )}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={getRowId?.(row, index) ?? row.id ?? index}>
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={cn(
                                            column.align && `ui-table__cell--${column.align}`,
                                        )}
                                    >
                                        {column.render
                                            ? column.render(row[column.key], row, index)
                                            : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                emptyState ?? (
                    <EmptyState
                        title="Aucune ligne"
                        description="Ajoute des donnees pour alimenter ce tableau."
                    />
                )
            )}
        </div>
    )
}
