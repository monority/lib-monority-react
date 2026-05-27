import { DocPage, type DocPageData } from '../DocPage'
import { DataList } from '@monority/ui'
import { DataListBasicExample } from './DataList.examples'

const docData: DocPageData = {
  title: 'DataList',
  description: "Definition list for key-value data with auto or split column layout.",
  importCode: "import { DataList } from '@monority/ui'",
  usageCode: `<DataList items={[
  { label: 'Email', value: 'john@example.com' },
  { label: 'Role', value: 'Developer' },
]} />`,
  preview: () => <DataListBasicExample />,
  props: [
    { name: 'items', type: `{ key?: string; label: ReactNode; value: ReactNode; render?: (value, item, index) => ReactNode }[]`, defaultValue: "[]", description: "Key-value pairs." },
    { name: 'columns', type: `'auto' | 'split'`, defaultValue: "-", description: "Column layout mode." },
    { name: 'className', type: `string`, defaultValue: "-", description: "Additional class name." }
  ],
}

export function DataListDocs() {
  return <DocPage doc={docData} />
}
