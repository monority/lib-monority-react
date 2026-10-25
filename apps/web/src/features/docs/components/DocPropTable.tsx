import { useMessages } from '@/shared/i18n'
import { type Column, Table } from '@monority/ui/table'
import type { PropRow } from './DocPage'

export interface DocPropTableProps {
    props: PropRow[]
}

export function DocPropTable({ props }: DocPropTableProps) {
    const messages = useMessages().docs.table

    if (props.length === 0) return null

    const columns: Column<PropRow>[] = [
        {
            key: 'name',
            label: messages.prop,
            render: (_val, row) => <span className="docs-prop-name">{row.name}</span>,
        },
        {
            key: 'type',
            label: messages.type,
            render: (_val, row) => (
                <span className="docs-prop-type">
                    <code>{row.type}</code>
                </span>
            ),
        },
        {
            key: 'defaultValue',
            label: messages.defaultValue,
            render: (_val, row) => (
                <span className="docs-prop-default">
                    <code>{row.defaultValue}</code>
                </span>
            ),
        },
        {
            key: 'description',
            label: messages.description,
            render: (_val, row) => <span className="docs-prop-desc">{row.description}</span>,
        },
    ]

    return (
        <div className="docs-table-wrapper">
            <Table<PropRow> columns={columns} rows={props} getRowId={(row) => row.name} />
        </div>
    )
}
