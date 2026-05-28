import { DataTable } from '@monority/ui'

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
]

const rows = [
  { name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
]

export function DataTableBasicExample() {
  return <DataTable columns={columns} rows={rows} />
}

export function DataTableSelectableExample() {
  return <DataTable columns={columns} rows={rows} selectable />
}

export function DataTableEmptyExample() {
  return <DataTable columns={columns} rows={[]} />
}

export function DataTableWithCaptionExample() {
  return <DataTable columns={columns} rows={rows} caption="List of team members" />
}
