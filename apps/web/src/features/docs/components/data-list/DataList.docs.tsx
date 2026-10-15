import { DocPage, type DocPageData } from '../DocPage'
import {
    DataListBasicExample,
    DataListWithRenderExample,
    DataListSplitExample,
    DataListCompoundExample,
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
            title: 'Compound composition',
            content: <DataListCompoundExample />,
            code: `<DataList columns="split">
  <DataList.Item>
    <DataList.Label>Framework</DataList.Label>
    <DataList.Value>React 19</DataList.Value>
  </DataList.Item>
  <DataList.Item>
    <DataList.Label>Architecture</DataList.Label>
    <DataList.Value>Compound Subcomponents</DataList.Value>
  </DataList.Item>
  <DataList.Item>
    <DataList.Label>CSS Foundation</DataList.Label>
    <DataList.Value>@layer mr.*</DataList.Value>
  </DataList.Item>
</DataList>`,
        },
        {
            title: 'With render',
            content: <DataListWithRenderExample />,
            code: `<DataList items={[
  { label: 'Status', value: 'stable', render: (value) => <Badge variant="default">{String(value).toUpperCase()}</Badge> },
  { label: 'Release notes', value: 'View changelog', render: (value) => <ButtonLink href="#">{value}</ButtonLink> },
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
        '[data-columns]',
    ],
    tokens: ['--mr-border-subtle', '--mr-bg-raised', '--mr-text-secondary', '--mr-text-primary'],
    a11y: ['Uses native definition list semantics.', 'Keep labels concise and values scannable.'],
}

export function DataListDocs() {
    return <DocPage doc={docData} />
}
