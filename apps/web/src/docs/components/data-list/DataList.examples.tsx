import { DataList } from '@monority/ui'

export function DataListBasicExample() {
  return (
    <>
      <DataList>Example</DataList>
    </>
  )
}

export function DataListWithItemsExample() {
  return (
    <DataList
      items={[
        { key: 'name', label: 'Name', value: 'John Doe' },
        { key: 'email', label: 'Email', value: 'john@example.com' },
        { key: 'role', label: 'Role', value: 'Developer' },
        { key: 'status', label: 'Status', value: 'Active' },
      ]}
    />
  )
}

export function DataListSplitExample() {
  return (
    <DataList
      columns="split"
      items={[
        { key: 'name', label: 'Name', value: 'John Doe' },
        { key: 'email', label: 'Email', value: 'john@example.com' },
        { key: 'role', label: 'Role', value: 'Developer' },
      ]}
    />
  )
}
