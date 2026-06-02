import { Badge, Table } from '@monority/ui'

export function TableBasicExample() {
  const columns = [
    { key: 'plan', label: 'Plan' },
    { key: 'seats', label: 'Seats', className: 'mr-table__cell--right' },
    { key: 'support', label: 'Support' },
  ]
  const rows = [
    { plan: 'Starter', seats: '5', support: 'Email' },
    { plan: 'Growth', seats: '20', support: 'Priority' },
    { plan: 'Scale', seats: 'Unlimited', support: 'Dedicated' },
  ]

  return <Table columns={columns} rows={rows} />
}

export function TableWithDataExample() {
  const columns = [
    { key: 'component', label: 'Component' },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) => (
        <Badge variant="secondary">{String(value)}</Badge>
      ),
    },
    {
      key: 'coverage',
      label: 'Coverage',
      className: 'mr-table__cell--right',
    },
  ]
  const rows = [
    { component: 'Banner', status: 'Reviewed', coverage: '14 examples' },
    { component: 'Toolbar', status: 'Aligned', coverage: '8 examples' },
    { component: 'PageHeader', status: 'Published', coverage: '6 examples' },
  ]

  return <Table columns={columns} rows={rows} />
}

export function TableEmptyExample() {
  const columns = [
    { key: 'component', label: 'Component' },
    { key: 'owner', label: 'Owner' },
  ]

  return <Table columns={columns} rows={[]} />
}
