import { useState, type ReactNode } from 'react'
import { Badge } from '@monority/ui/badge'
import { DataTable } from '@monority/ui/data-table'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    DataTableBasicExample,
    DataTableEmptyExample,
    DataTableSelectableExample,
    DataTableWithCaptionExample,
} from './DataTable.examples'

function DataTablePlayground() {
    const [selectable, setSelectable] = useState(true)
    const [rowCount, setRowCount] = useState<'3' | '5' | '0'>('3')
    const [hasCaption, setHasCaption] = useState(false)

    const allRows = [
        {
            issue: 'Synchronisation CSS tokens',
            severity: 'Critique',
            owner: 'Core Team',
            status: 'En cours',
        },
        {
            issue: 'Amélioration focus visible',
            severity: 'Normal',
            owner: 'Accessibilité',
            status: 'Validé',
        },
        {
            issue: 'Refonte documentation Form',
            severity: 'Faible',
            owner: 'Docs Team',
            status: 'En attente',
        },
        {
            issue: 'Support React 19 forwardRef removal',
            severity: 'Critique',
            owner: 'Architecture',
            status: 'Validé',
        },
        {
            issue: 'Optimisation bundle tree-shaking',
            severity: 'Normal',
            owner: 'Infra',
            status: 'Validé',
        },
    ]

    const columns = [
        { key: 'issue', header: 'Ticket / Anomalie', sortable: true },
        {
            key: 'severity',
            header: 'Sévérité',
            sortable: true,
            render: (value: ReactNode) => {
                const s = String(value)
                const variant = s === 'Critique' ? 'danger' : s === 'Normal' ? 'primary' : 'default'
                return <Badge variant={variant}>{s}</Badge>
            },
        },
        { key: 'owner', header: 'Responsable' },
        { key: 'status', header: 'Statut' },
    ]

    const rows = rowCount === '0' ? [] : allRows.slice(0, Number(rowCount))

    const snippet = `<DataTable
  columns={[
    { key: 'issue', header: 'Ticket / Anomalie', sortable: true },
    { key: 'severity', header: 'Sévérité', sortable: true },
    { key: 'owner', header: 'Responsable' },
    { key: 'status', header: 'Statut' },
  ]}
  rows={...}${selectable ? '\n  selectable' : ''}${hasCaption ? '\n  caption="Suivi des anomalies en production"' : ''}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'boolean',
                    label: 'Selectable (sélection lignes)',
                    value: selectable,
                    onChange: setSelectable,
                },
                {
                    type: 'select',
                    label: 'Nombre de lignes',
                    value: rowCount,
                    options: [
                        { value: '3', label: '3 lignes' },
                        { value: '5', label: '5 lignes' },
                        { value: '0', label: 'Vide (0 ligne)' },
                    ],
                    onChange: (v) => setRowCount(v as '3' | '5' | '0'),
                },
                {
                    type: 'boolean',
                    label: 'Légende (caption)',
                    value: hasCaption,
                    onChange: setHasCaption,
                },
            ]}
            codeSnippet={snippet}
        >
            <div style={{ width: '100%', overflowX: 'auto' }}>
                <DataTable
                    columns={columns}
                    rows={rows}
                    selectable={selectable}
                    caption={hasCaption ? 'Suivi des anomalies en production' : undefined}
                />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'DataTable',
    description:
        'An interactive operational table with sorting, selection, caption support, and stronger row states.',
    importCode: "import { DataTable } from '@monority/ui'",
    usageCode: `<DataTable
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
  ]}
  rows={[
    { name: 'John Doe', email: 'john@example.com' },
  ]}
/>`,
    preview: () => <DataTablePlayground />,
    examples: [
        { title: 'Selectable', content: <DataTableSelectableExample /> },
        { title: 'Empty state', content: <DataTableEmptyExample /> },
        { title: 'With caption', content: <DataTableWithCaptionExample /> },
    ],
    props: [
        {
            name: 'columns',
            type: `Column[]`,
            defaultValue: '[]',
            description: 'Column definitions with optional sortable per column.',
        },
        {
            name: 'rows',
            type: `Record<string, ReactNode>[]`,
            defaultValue: '[]',
            description: 'Table data.',
        },
        {
            name: 'selectable',
            type: `boolean`,
            defaultValue: '-',
            description: 'Enable row selection.',
        },
        {
            name: 'caption',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Table caption for accessibility.',
        },
        {
            name: 'emptyState',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Custom empty state content.',
        },
    ],
    cssHooks: [
        '.mr-data-table-wrap',
        '.mr-data-table__th',
        '.mr-data-table__td',
        '.mr-data-table__tr',
        '.mr-data-table__sort',
        '.mr-data-table__caption',
        '[data-sortable]',
        '[data-selected]',
    ],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-raised',
        '--mr-bg-surface-strong',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-accent-solid',
    ],
    a11y: [
        'Native <table> semantics.',
        'Column headers use scope attributes.',
        'Caption for context if needed.',
        'Sortable columns announce sort direction.',
    ],
}

export function DataTableDocs() {
    return <DocPage doc={docData} />
}
