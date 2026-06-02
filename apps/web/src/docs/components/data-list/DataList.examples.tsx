import { Badge, DataList } from '@monority/ui'

export function DataListBasicExample() {
  return (
    <DataList
      items={[
        { key: 'package', label: 'Package', value: '@monority/ui' },
        { key: 'version', label: 'Version', value: '0.1.0' },
        { key: 'license', label: 'License', value: 'MIT' },
        { key: 'runtime', label: 'Runtime', value: 'React 19+' },
      ]}
    />
  )
}

export function DataListWithRenderExample() {
  return (
    <DataList
      items={[
        {
          key: 'status',
          label: 'Status',
          value: 'stable',
          render: (value) => (
            <Badge variant="secondary">{String(value).toUpperCase()}</Badge>
          ),
        },
        {
          key: 'release',
          label: 'Release notes',
          value: 'View changelog',
          render: (value) => <a href="#">{value}</a>,
        },
        {
          key: 'owner',
          label: 'Owner',
          value: 'Design system',
        },
      ]}
    />
  )
}

export function DataListSplitExample() {
  return (
    <DataList
      columns="split"
      items={[
        { key: 'name', label: 'Component', value: 'DataTable' },
        { key: 'category', label: 'Category', value: 'Data display' },
        { key: 'theme', label: 'Theme aware', value: 'Yes' },
        { key: 'keyboard', label: 'Keyboard support', value: 'Native' },
      ]}
    />
  )
}
