import { DocPage, type DocPageData } from '../DocPage'
import {
    DataTableBasicExample,
    DataTableSelectableExample,
    DataTableEmptyExample,
    DataTableWithCaptionExample,
} from './DataTable.examples'

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
    preview: () => <DataTableBasicExample />,
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
        '--mr-bg-surface-elevated',
        '--mr-bg-surface-strong',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-accent',
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
