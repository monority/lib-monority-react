import { DocPage, type DocPageData } from '../DocPage'
import {
  DataListBasicExample,
  DataListWithRenderExample,
  DataListSplitExample,
} from './DataList.examples'

const docData: DocPageData = {
  title: 'DataList',
  description:
    'A structured key-value panel for metadata, system facts, and compact read-only records.',
  importCode: "import { DataList } from '@monority/ui'",
  usageCode: `<DataList items={[
  { label: 'Email', value: 'john@example.com' },
  { label: 'Role', value: 'Developer' },
]} />`,
  preview: () => <DataListBasicExample />,
  examples: [
    {
      title: 'With render',
      content: <DataListWithRenderExample />,
      code: `<DataList items={[
  { label: 'Status', value: 'stable', render: (value) => <Badge variant="secondary">{value}</Badge> },
  { label: 'Release notes', value: 'View changelog', render: (value) => <a href="#">{value}</a> },
]} />`,
    },
    {
      title: 'Split layout',
      content: <DataListSplitExample />,
      code: `<DataList columns="split" items={[
  { label: 'Component', value: 'DataTable' },
  { label: 'Category', value: 'Data display' },
  { label: 'Theme aware', value: 'Yes' },
]} />`,
    },
  ],
  props: [
    {
      name: 'items',
      type: `{ key?: string; label: ReactNode; value: ReactNode; render?: (value, item, index) => ReactNode }[]`,
      defaultValue: '[]',
      description: 'Key-value pairs.',
    },
    {
      name: 'columns',
      type: `'auto' | 'split'`,
      defaultValue: '-',
      description: 'Column layout mode.',
    },
    {
      name: 'className',
      type: `string`,
      defaultValue: '-',
      description: 'Additional class name.',
    },
  ],
  cssHooks: [
    '.mr-data-list',
    '.mr-data-list__item',
    '.mr-data-list__label',
    '.mr-data-list__value',
  ],
  tokens: [
    '--mr-border-subtle',
    '--mr-bg-surface-elevated',
    '--mr-fg-muted',
    '--mr-fg-strong',
  ],
  a11y: [
    'Uses native definition list semantics.',
    'Keep labels concise and values scannable.',
  ],
}

export function DataListDocs() {
  return <DocPage doc={docData} />
}
