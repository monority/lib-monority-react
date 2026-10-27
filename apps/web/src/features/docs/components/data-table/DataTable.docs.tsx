import { Badge } from '@monority/ui/badge'
import { DataTable } from '@monority/ui/data-table'
import { type ReactNode, useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    DataTableEmptyExample,
    DataTableSelectableExample,
    DataTableWithCaptionExample,
} from './DataTable.examples'
import { dataTableI18n } from './DataTable.messages'

function DataTablePlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [selectable, setSelectable] = useState(true)
    const [rowCount, setRowCount] = useState<'3' | '5' | '0'>('3')
    const [hasCaption, setHasCaption] = useState(false)

    const allRows = isFr
        ? [
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
        : [
              {
                  issue: 'CSS tokens synchronization',
                  severity: 'Critical',
                  owner: 'Core Team',
                  status: 'In progress',
              },
              {
                  issue: 'Visible focus improvements',
                  severity: 'Normal',
                  owner: 'Accessibility',
                  status: 'Approved',
              },
              {
                  issue: 'Form documentation overhaul',
                  severity: 'Low',
                  owner: 'Docs Team',
                  status: 'Pending',
              },
              {
                  issue: 'React 19 forwardRef removal support',
                  severity: 'Critical',
                  owner: 'Architecture',
                  status: 'Approved',
              },
              {
                  issue: 'Bundle tree-shaking optimization',
                  severity: 'Normal',
                  owner: 'Infra',
                  status: 'Approved',
              },
          ]

    const columns = [
        { key: 'issue', header: isFr ? 'Ticket / Anomalie' : 'Issue / Ticket', sortable: true },
        {
            key: 'severity',
            header: isFr ? 'Sévérité' : 'Severity',
            sortable: true,
            render: (value: ReactNode) => {
                const s = String(value)
                const variant =
                    s === 'Critique' || s === 'Critical'
                        ? 'danger'
                        : s === 'Normal'
                          ? 'primary'
                          : 'default'
                return <Badge variant={variant}>{s}</Badge>
            },
        },
        { key: 'owner', header: isFr ? 'Responsable' : 'Owner' },
        { key: 'status', header: isFr ? 'Statut' : 'Status' },
    ]

    const rows = rowCount === '0' ? [] : allRows.slice(0, Number(rowCount))
    const captionText = isFr ? 'Suivi des anomalies en production' : 'Production anomaly tracker'

    const snippet = `<DataTable
  columns={[
    { key: 'issue', header: '${isFr ? 'Ticket / Anomalie' : 'Issue / Ticket'}', sortable: true },
    { key: 'severity', header: '${isFr ? 'Sévérité' : 'Severity'}', sortable: true },
    { key: 'owner', header: '${isFr ? 'Responsable' : 'Owner'}' },
    { key: 'status', header: '${isFr ? 'Statut' : 'Status'}' },
  ]}
  rows={...}${selectable ? '\n  selectable' : ''}${hasCaption ? `\n  caption="${captionText}"` : ''}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'boolean',
                    label: isFr ? 'Sélectionnable (selectable)' : 'Selectable (row selection)',
                    value: selectable,
                    onChange: setSelectable,
                },
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
                {
                    type: 'boolean',
                    label: isFr ? 'Légende (caption)' : 'Caption',
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
                    caption={hasCaption ? captionText : undefined}
                />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'DataTable',
    description:
        'An interactive operational table with sorting, selection, caption support, and stronger row states.',
    importCode: "import { DataTable } from '@monority/ui/data-table'",
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
    i18n: dataTableI18n,
}

export function DataTableDocs() {
    return <DocPage doc={docData} />
}
