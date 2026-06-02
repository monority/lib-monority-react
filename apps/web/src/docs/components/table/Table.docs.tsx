import { DocPage, type DocPageData } from '../DocPage'
import {
  TableBasicExample,
  TableWithDataExample,
  TableEmptyExample,
} from './Table.examples'

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
  preview: () => <TableBasicExample />,
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
  cssHooks: [
    '.mr-table',
    '.mr-table__head',
    '.mr-table__th',
    '.mr-table__td',
    '.mr-table__tr',
  ],
  tokens: [
    '--mr-border-subtle',
    '--mr-bg-surface-elevated',
    '--mr-bg-surface-strong',
    '--mr-bg-control',
    '--mr-fg-base',
    '--mr-fg-muted',
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
