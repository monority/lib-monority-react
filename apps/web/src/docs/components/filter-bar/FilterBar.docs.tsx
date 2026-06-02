import { DocPage, type DocPageData } from '../DocPage'
import {
  FilterBarBasicExample,
  FilterBarWithControlsExample,
  FilterBarWithResetExample,
} from './FilterBar.examples'

const docData: DocPageData = {
  title: 'FilterBar',
  description: 'A compact control rail for search, filters, active chips, and result metadata.',
  importCode: "import { FilterBar } from '@monority/ui'",
  usageCode: `<FilterBar>
  <div className="mr-filter-bar__main">
    <div className="mr-filter-bar__leading">
      <Input placeholder="Search components..." />
    </div>
    <Select aria-label="Status filter">
      <option>All statuses</option>
    </Select>
    <Button size="sm" variant="secondary">Apply</Button>
  </div>
  <div className="mr-filter-bar__meta">24 results</div>
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
    '.mr-filter-bar',
    '.mr-filter-bar__main',
    '.mr-filter-bar__leading',
    '.mr-filter-bar__chips',
    '.mr-filter-bar__chip',
    '.mr-filter-bar__meta',
  ],
  tokens: [
    '--mr-space-*', '--mr-border-subtle', '--mr-bg-surface-elevated', '--mr-bg-control',
  ],
  a11y: [
    'Uses role="group" with aria-label="Filters" by default.',
    'Keep each child control independently labeled.',
    'Use the meta area for passive status, not interactive filter inputs.',
  ],
}

export function FilterBarDocs() {
  return <DocPage doc={docData} />
}
