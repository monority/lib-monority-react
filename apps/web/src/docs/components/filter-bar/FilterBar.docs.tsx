import { DocPage, type DocPageData } from '../DocPage'
import { FilterBar } from '@monority/ui'
import { FilterBarBasicExample } from './FilterBar.examples'

const docData: DocPageData = {
  title: 'FilterBar',
  description: "Simple wrapper for filter controls in a horizontal bar layout.",
  importCode: "import { FilterBar } from '@monority/ui'",
  usageCode: `<FilterBar>
  <Select />
  <Input placeholder="Search..." />
</FilterBar>`,
  preview: () => <FilterBarBasicExample />,
  props: [
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Filter controls." }
  ],
}

export function FilterBarDocs() {
  return <DocPage doc={docData} />
}
