import type { ReactNode } from 'react'
import { Badge, DataTable } from '@monority/ui'

const columns = [
  { key: 'issue', header: 'Issue', sortable: true },
  {
    key: 'severity',
    header: 'Severity',
    render: (value: ReactNode) => (
      <Badge variant="secondary">{String(value)}</Badge>
    ),
  },
  { key: 'owner', header: 'Owner' },
]

const rows = [
  {
    issue: 'Callout surface drift',
    severity: 'Medium',
    owner: 'Design system',
  },
  {
    issue: 'Toolbar density pass',
    severity: 'Low',
    owner: 'Docs team',
  },
  {
    issue: 'Resizable drag tuning',
    severity: 'High',
    owner: 'UI infra',
  },
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
  return (
    <DataTable
      columns={columns}
      rows={rows}
      caption="Open UI review queue"
    />
  )
}
