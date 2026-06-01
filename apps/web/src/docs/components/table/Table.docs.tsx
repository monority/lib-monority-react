import { DocPage, type DocPageData } from '../DocPage'
import {
  TableBasicExample,
  TableWithDataExample,
  TableEmptyExample,
} from './Table.examples'

const docData: DocPageData = {
  title: 'Table',
  description: "A structured display of data in rows and columns with sorting and filtering capabilities.",
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
    { title: 'With data', content: <TableWithDataExample />, code: `const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
]
const rows = [
  { name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
]
<Table columns={columns} rows={rows} />` },
    { title: 'Empty state', content: <TableEmptyExample />, code: `const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
]
<Table columns={columns} rows={[]} />` },
  ],
  props: [
    { name: 'columns', type: `Column[]`, defaultValue: "[]", description: "Column definitions" },
    { name: 'rows', type: `Record<string, ReactNode>[]`, defaultValue: "[]", description: "Table data" },
    { name: 'emptyState', type: `ReactNode`, defaultValue: "Built-in empty state", description: "Custom empty state content" }
  ],
  cssHooks: [
    '.mr-table', '.mr-table__header', '.mr-table__row', '.mr-table__cell',
  ],
  tokens: [
    '--mr-border-subtle', '--mr-bg-surface', '--mr-bg-surface-strong',
    '--mr-fg-base', '--mr-text-sm',
  ],
  a11y: [
    'Native <table> semantics.',
    'Scope attributes on headers.',
    'Caption for context if needed.',
  ],
}

export function TableDocs() {
  return <DocPage doc={docData} />
}
