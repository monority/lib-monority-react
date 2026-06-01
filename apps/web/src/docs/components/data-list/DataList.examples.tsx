import { DataList } from '@monority/ui'

export function DataListBasicExample() {
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

export function DataListWithRenderExample() {
  return (
    <DataList
      items={[
        { key: 'status', label: 'Status', value: 'active', render: (v) => (
          <span style={{ color: v === 'active' ? 'var(--mr-success)' : 'var(--mr-danger)' }}>
            {v === 'active' ? '● Active' : '● Inactive'}
          </span>
        )},
        { key: 'role', label: 'Role', value: 'admin', render: (v) => (
          <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{v}</span>
        )},
        { key: 'email', label: 'Email', value: 'john@example.com', render: (v) => (
          <a href={`mailto:${v}`} style={{ color: 'var(--mr-accent)' }}>{v}</a>
        )},
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
