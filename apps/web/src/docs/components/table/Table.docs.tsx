import { DocPage, type DocPageData } from '../DocPage'
import { Table } from '@monority/ui'
import { TableBasicExample } from './Table.examples'

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
  props: [
    { name: 'columns', type: `Column[]`, defaultValue: "[]", description: "Column definitions" },
    { name: 'rows', type: `Record<string, ReactNode>[]`, defaultValue: "[]", description: "Table data" },
    { name: 'emptyState', type: `ReactNode`, defaultValue: "Built-in empty state", description: "Custom empty state content" }
  ],
}

export function TableDocs() {
  return <DocPage doc={docData} />
}
