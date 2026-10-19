import { type Column, Table } from '@monority/ui/table'
import type { PropRow } from './DocPage'

export interface DocPropTableProps {
    props: PropRow[]
}

const propColumns: Column<PropRow>[] = [
    {
        key: 'name',
        label: 'Prop',
        render: (_val, row) => <span className="docs-prop-name">{row.name}</span>,
    },
    {
        key: 'type',
        label: 'Type',
        render: (_val, row) => (
            <span className="docs-prop-type">
                <code>{row.type}</code>
            </span>
        ),
    },
    {
        key: 'defaultValue',
        label: 'Default',
        render: (_val, row) => (
            <span className="docs-prop-default">
                <code>{row.defaultValue}</code>
            </span>
        ),
    },
    {
        key: 'description',
        label: 'Description',
        render: (_val, row) => <span className="docs-prop-desc">{row.description}</span>,
    },
]

export function DocPropTable({ props }: DocPropTableProps) {
    if (props.length === 0) return null

    return (
        <div className="docs-table-wrapper">
            <Table<PropRow> columns={propColumns} rows={props} getRowId={(row) => row.name} />
        </div>
    )
}
