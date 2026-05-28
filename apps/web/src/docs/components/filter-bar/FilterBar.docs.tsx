import { DocPage, type DocPageData } from '../DocPage'
import {
  FilterBarBasicExample,
  FilterBarWithControlsExample,
  FilterBarWithResetExample,
} from './FilterBar.examples'

const docData: DocPageData = {
  title: 'FilterBar',
  description: "Simple wrapper for filter controls in a horizontal bar layout.",
  importCode: "import { FilterBar } from '@monority/ui'",
  usageCode: `<FilterBar>
  <Select />
  <Input placeholder="Search..." />
</FilterBar>`,
  preview: () => <FilterBarBasicExample />,
  examples: [
    { title: 'With controls', content: <FilterBarWithControlsExample /> },
    { title: 'With reset', content: <FilterBarWithResetExample /> },
  ],
  props: [
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Filter controls." }
  ],
  cssHooks: [
    '.mr-filter-bar', '.mr-filter-bar__item', '.mr-filter-bar__reset',
  ],
  tokens: [
    '--mr-space-*', '--mr-border-subtle',
  ],
  a11y: [
    'Toolbar ARIA pattern (role="toolbar").',
    'aria-label for the toolbar.',
    'Focus management between filters.',
  ],
}

export function FilterBarDocs() {
  return <DocPage doc={docData} />
}
