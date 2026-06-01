import { DocPage, type DocPageData } from '../DocPage'
import {
  DataListBasicExample,
  DataListWithRenderExample,
  DataListSplitExample,
} from './DataList.examples'

const docData: DocPageData = {
  title: 'DataList',
  description: "Definition list for key-value data with auto or split column layout.",
  importCode: "import { DataList } from '@monority/ui'",
  usageCode: `<DataList items={[
  { label: 'Email', value: 'john@example.com' },
  { label: 'Role', value: 'Developer' },
]} />`,
  preview: () => <DataListBasicExample />,
  examples: [
    { title: 'With render', content: <DataListWithRenderExample />, code: `<DataList items={[
  { label: 'Status', value: 'active', render: (v) => <span style={{ color: v === 'active' ? 'var(--mr-success)' : 'var(--mr-danger)' }}>{v}</span> },
  { label: 'Email', value: 'john@example.com', render: (v) => <a href={\`mailto:\${v}\`}>{v}</a> },
]} />` },
    { title: 'Split layout', content: <DataListSplitExample />, code: `<DataList columns="split" items={[
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john@example.com' },
  { label: 'Role', value: 'Developer' },
]} />` },
  ],
  props: [
    { name: 'items', type: `{ key?: string; label: ReactNode; value: ReactNode; render?: (value, item, index) => ReactNode }[]`, defaultValue: "[]", description: "Key-value pairs." },
    { name: 'columns', type: `'auto' | 'split'`, defaultValue: "-", description: "Column layout mode." },
    { name: 'className', type: `string`, defaultValue: "-", description: "Additional class name." }
  ],
  cssHooks: [
    '.mr-data-list', '.mr-data-list__item', '.mr-data-list__label', '.mr-data-list__value',
  ],
  tokens: [
    '--mr-border-subtle', '--mr-text-sm', '--mr-fg-muted',
  ],
  a11y: [
    'Definition list pattern.',
    'Associated label-value pairs.',
  ],
}

export function DataListDocs() {
  return <DocPage doc={docData} />
}
