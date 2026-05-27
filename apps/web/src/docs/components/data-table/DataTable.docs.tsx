import { DocPage, type DocPageData } from '../DocPage'
import { DataTable } from '@monority/ui'
import { DataTableBasicExample } from './DataTable.examples'

const docData: DocPageData = {
  title: 'DataTable',
  description: "Full-featured data table with sorting, selection, caption, and empty state.",
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
  props: [
    { name: 'columns', type: `Column[]`, defaultValue: "[]", description: "Column definitions with optional sortable per column." },
    { name: 'rows', type: `Record<string, ReactNode>[]`, defaultValue: "[]", description: "Table data." },
    { name: 'selectable', type: `boolean`, defaultValue: "-", description: "Enable row selection." },
    { name: 'caption', type: `ReactNode`, defaultValue: "-", description: "Table caption for accessibility." },
    { name: 'emptyState', type: `ReactNode`, defaultValue: "-", description: "Custom empty state content." }
  ],
}

export function DataTableDocs() {
  return <DocPage doc={docData} />
}
