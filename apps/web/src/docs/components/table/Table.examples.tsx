import { Table } from '@monority/ui'

export function TableBasicExample() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]
  const rows = [
    { name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { name: 'Bob Wilson', email: 'bob@example.com', role: 'Manager' },
  ]
  return <Table columns={columns} rows={rows} />
}

export function TableWithDataExample() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]
  const rows = [
    { name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { name: 'Bob Wilson', email: 'bob@example.com', role: 'Manager' },
  ]
  return <Table columns={columns} rows={rows} />
}

export function TableEmptyExample() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ]
  return <Table columns={columns} rows={[]} />
}
