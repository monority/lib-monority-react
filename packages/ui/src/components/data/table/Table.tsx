import { EmptyState } from '@/components/feedback/empty-state/EmptyState'
import { cn } from '@/lib/cn'
import type {
    TableBodyProps,
    TableCaptionProps,
    TableCellProps,
    TableFooterProps,
    TableHeadProps,
    TableHeaderProps,
    TableProps,
    TableRowProps,
} from './Table.types'

export function Table<T extends Record<string, unknown> = Record<string, unknown>>({
    ref,
    columns = [],
    rows = [],
    getRowId,
    emptyState,
    className,
    tableClassName,
    children,
    ...props
}: TableProps<T>) {
    if (children) {
        return (
            <div ref={ref} className={cn('mr-table', className)} {...props}>
                <table className={cn('mr-table__table', tableClassName)}>{children}</table>
            </div>
        )
    }

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

function TableHeader({ ref, className, children, ...props }: TableHeaderProps) {
    return (
        <thead ref={ref} className={cn('mr-table__head', className)} {...props}>
            {children}
        </thead>
    )
}

function TableBody({ ref, className, children, ...props }: TableBodyProps) {
    return (
        <tbody ref={ref} className={cn('mr-table__body', className)} {...props}>
            {children}
        </tbody>
    )
}

function TableFooter({ ref, className, children, ...props }: TableFooterProps) {
    return (
        <tfoot ref={ref} className={cn('mr-table__footer', className)} {...props}>
            {children}
        </tfoot>
    )
}

function TableRow({ ref, className, children, ...props }: TableRowProps) {
    return (
        <tr ref={ref} className={cn('mr-table__tr', className)} {...props}>
            {children}
        </tr>
    )
}

function TableHead({ ref, className, children, ...props }: TableHeadProps) {
    return (
        <th ref={ref} scope="col" className={cn('mr-table__th', className)} {...props}>
            {children}
        </th>
    )
}

function TableCell({ ref, className, children, ...props }: TableCellProps) {
    return (
        <td ref={ref} className={cn('mr-table__td', className)} {...props}>
            {children}
        </td>
    )
}

function TableCaption({ ref, className, children, ...props }: TableCaptionProps) {
    return (
        <caption ref={ref} className={cn('mr-table__caption', className)} {...props}>
            {children}
        </caption>
    )
}

TableHeader.displayName = 'Table.Header'
TableBody.displayName = 'Table.Body'
TableFooter.displayName = 'Table.Footer'
TableRow.displayName = 'Table.Row'
TableHead.displayName = 'Table.Head'
TableCell.displayName = 'Table.Cell'
TableCaption.displayName = 'Table.Caption'

Table.Header = TableHeader
Table.Body = TableBody
Table.Footer = TableFooter
Table.Row = TableRow
Table.Head = TableHead
Table.Cell = TableCell
Table.Caption = TableCaption

export { TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption }

export type {
    TableProps,
    Column,
    TableHeaderProps,
    TableBodyProps,
    TableFooterProps,
    TableRowProps,
    TableHeadProps,
    TableCellProps,
    TableCaptionProps,
} from './Table.types'
