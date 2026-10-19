import { Badge } from '@monority/ui/badge'
import { Table } from '@monority/ui/table'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { TableEmptyExample, TableWithDataExample } from './Table.examples'

function TablePlayground() {
    const [rowCount, setRowCount] = useState<'3' | '5' | '0'>('3')

    const allRows = [
        { plan: 'Starter', seats: '5 utilisateurs', price: '29 € / mois', status: 'Actif' },
        { plan: 'Growth', seats: '25 utilisateurs', price: '99 € / mois', status: 'Actif' },
        { plan: 'Enterprise', seats: 'Illimité', price: '299 € / mois', status: 'Recommandé' },
        { plan: 'Dedicated', seats: 'Sur mesure', price: 'Sur devis', status: 'Contact' },
        { plan: 'Open Source', seats: 'Communauté', price: 'Gratuit', status: 'Actif' },
    ]

    const columns = [
        { key: 'plan', label: 'Formule' },
        { key: 'seats', label: 'Accès' },
        { key: 'price', label: 'Tarif' },
        {
            key: 'status',
            label: 'Statut',
            render: (value: unknown) => (
                <Badge variant={value === 'Recommandé' ? 'primary' : 'default'}>
                    {String(value)}
                </Badge>
            ),
        },
    ]

    const rows = rowCount === '0' ? [] : allRows.slice(0, Number(rowCount))

    const snippet = `const columns = [
  { key: 'plan', label: 'Formule' },
  { key: 'seats', label: 'Accès' },
  { key: 'price', label: 'Tarif' },
  { key: 'status', label: 'Statut' },
]

const rows = ${JSON.stringify(
        rows.map(({ plan, seats, price, status }) => ({ plan, seats, price, status })),
        null,
        2
    )}

<Table columns={columns} rows={rows} />`

    return (
        <ComponentPlayground
            controls={[
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
            ]}
            codeSnippet={snippet}
        >
            <div style={{ width: '100%', overflowX: 'auto' }}>
                <Table columns={columns} rows={rows} />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Table',
    description:
        'A simple read-only table for structured content, pricing comparisons, and static summaries.',
    importCode: "import { Table } from '@monority/ui'",
    usageCode: `const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
]

const rows = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
]

<Table columns={columns} rows={rows} />`,
    preview: () => <TablePlayground />,
    examples: [
        {
            title: 'With data',
            content: <TableWithDataExample />,
            code: `const columns = [
  { key: 'component', label: 'Component' },
  { key: 'status', label: 'Status' },
  { key: 'coverage', label: 'Coverage', className: 'mr-table__cell--right' },
]
const rows = [
  { component: 'Banner', status: 'Reviewed', coverage: '14 examples' },
  { component: 'Toolbar', status: 'Aligned', coverage: '8 examples' },
]
<Table columns={columns} rows={rows} />`,
        },
        {
            title: 'Empty state',
            content: <TableEmptyExample />,
            code: `const columns = [
  { key: 'component', label: 'Component' },
  { key: 'owner', label: 'Owner' },
]
<Table columns={columns} rows={[]} />`,
        },
    ],
    props: [
        {
            name: 'columns',
            type: `Column[]`,
            defaultValue: '[]',
            description: 'Column definitions',
        },
        {
            name: 'rows',
            type: `Record<string, ReactNode>[]`,
            defaultValue: '[]',
            description: 'Table data',
        },
        {
            name: 'emptyState',
            type: `ReactNode`,
            defaultValue: 'Built-in empty state',
            description: 'Custom empty state content',
        },
    ],
    cssHooks: ['.mr-table', '.mr-table__head', '.mr-table__th', '.mr-table__td', '.mr-table__tr'],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-raised',
        '--mr-bg-surface-strong',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
    ],
    a11y: [
        'Native <table> semantics.',
        'Column headers use scope attributes.',
        'Use DataTable when sorting or selection is needed.',
    ],
}

export function TableDocs() {
    return <DocPage doc={docData} />
}
