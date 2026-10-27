import { Badge } from '@monority/ui/badge'
import { Table } from '@monority/ui/table'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { TableEmptyExample, TableWithDataExample } from './Table.examples'
import { tableI18n } from './Table.messages'

function TablePlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [rowCount, setRowCount] = useState<'3' | '5' | '0'>('3')

    const allRows = isFr
        ? [
              { plan: 'Starter', seats: '5 utilisateurs', price: '29 € / mois', status: 'Actif' },
              { plan: 'Growth', seats: '25 utilisateurs', price: '99 € / mois', status: 'Actif' },
              {
                  plan: 'Enterprise',
                  seats: 'Illimité',
                  price: '299 € / mois',
                  status: 'Recommandé',
              },
              { plan: 'Dedicated', seats: 'Sur mesure', price: 'Sur devis', status: 'Contact' },
              { plan: 'Open Source', seats: 'Communauté', price: 'Gratuit', status: 'Actif' },
          ]
        : [
              { plan: 'Starter', seats: '5 users', price: '$29 / mo', status: 'Active' },
              { plan: 'Growth', seats: '25 users', price: '$99 / mo', status: 'Active' },
              {
                  plan: 'Enterprise',
                  seats: 'Unlimited',
                  price: '$299 / mo',
                  status: 'Recommended',
              },
              { plan: 'Dedicated', seats: 'Custom', price: 'Contact us', status: 'Inquiry' },
              { plan: 'Open Source', seats: 'Community', price: 'Free', status: 'Active' },
          ]

    const columns = [
        { key: 'plan', label: isFr ? 'Formule' : 'Plan' },
        { key: 'seats', label: isFr ? 'Accès' : 'Seats' },
        { key: 'price', label: isFr ? 'Tarif' : 'Price' },
        {
            key: 'status',
            label: isFr ? 'Statut' : 'Status',
            render: (value: unknown) => {
                const s = String(value)
                const isRecommended = s === 'Recommandé' || s === 'Recommended'
                return <Badge variant={isRecommended ? 'primary' : 'default'}>{s}</Badge>
            },
        },
    ]

    const rows = rowCount === '0' ? [] : allRows.slice(0, Number(rowCount))

    const snippet = `const columns = [
  { key: 'plan', label: '${isFr ? 'Formule' : 'Plan'}' },
  { key: 'seats', label: '${isFr ? 'Accès' : 'Seats'}' },
  { key: 'price', label: '${isFr ? 'Tarif' : 'Price'}' },
  { key: 'status', label: '${isFr ? 'Statut' : 'Status'}' },
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
                    label: isFr ? 'Nombre de lignes' : 'Row count',
                    value: rowCount,
                    options: [
                        { value: '3', label: isFr ? '3 lignes' : '3 rows' },
                        { value: '5', label: isFr ? '5 lignes' : '5 rows' },
                        { value: '0', label: isFr ? 'Vide (0 ligne)' : 'Empty (0 rows)' },
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
    importCode: "import { Table } from '@monority/ui/table'",
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
    i18n: tableI18n,
}

export function TableDocs() {
    return <DocPage doc={docData} />
}
