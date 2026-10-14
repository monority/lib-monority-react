import { DocPage, type DocPageData } from '../DocPage'
import {
    FilterBarBasicExample,
    FilterBarWithControlsExample,
    FilterBarWithResetExample,
} from './FilterBar.examples'

const docData: DocPageData = {
    title: 'FilterBar',
    description:
        'A compact control rail for search, filters, active chips, and result metadata with composable subcomponents.',
    importCode: "import { FilterBar } from '@monority/ui/filter-bar'",
    usageCode: `<FilterBar>
  <FilterBar.Main>
    <FilterBar.Leading>
      <Input placeholder="Search components..." />
    </FilterBar.Leading>
    <Select aria-label="Status filter">
      <option>All statuses</option>
    </Select>
    <Button size="sm" variant="secondary">Apply</Button>
  </FilterBar.Main>
  <FilterBar.Meta>24 results</FilterBar.Meta>
</FilterBar>`,
    preview: () => <FilterBarBasicExample />,
    examples: [
        { title: 'With controls', content: <FilterBarWithControlsExample /> },
        { title: 'With reset', content: <FilterBarWithResetExample /> },
    ],
    props: [
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Filter controls and subcomponents (FilterBar.Main, FilterBar.Meta).',
        },
        {
            name: 'FilterBar.Main',
            type: `Component`,
            defaultValue: '-',
            description: 'Primary container wrapping leading input, filter selects, and chips.',
        },
        {
            name: 'FilterBar.Leading',
            type: `Component`,
            defaultValue: '-',
            description: 'Leading slot for search or primary text filter input.',
        },
        {
            name: 'FilterBar.Chips',
            type: `Component`,
            defaultValue: '-',
            description: 'Horizontal flow container for active filter tags and chips.',
        },
        {
            name: 'FilterBar.Chip',
            type: `Component ({ active?: boolean, onClick?: () => void })`,
            defaultValue: '-',
            description:
                'Interactive filter chip tag with active pressed state and keyboard focus.',
        },
        {
            name: 'FilterBar.Meta',
            type: `Component`,
            defaultValue: '-',
            description:
                'Trailing metadata and reset actions slot aligned opposite the main controls.',
        },
    ],
    cssHooks: [
        '.mr-filter-bar',
        '.mr-filter-bar__main',
        '.mr-filter-bar__leading',
        '.mr-filter-bar__chips',
        '.mr-filter-bar__chip',
        '.mr-filter-bar__chip[data-active="true"]',
        '.mr-filter-bar__meta',
    ],
    tokens: [
        '--mr-space-*',
        '--mr-border-subtle',
        '--mr-bg-surface-elevated',
        '--mr-bg-control',
        '--mr-accent-subtle',
        '--mr-accent-text',
    ],
    a11y: [
        'Uses role="group" with aria-label="Filters" by default.',
        'FilterBar.Chip uses role="button" with aria-pressed for active state and Enter/Space keyboard activation.',
        'Keep each child control independently labeled with an accessible name.',
        'Use the meta area for passive status or clear/reset actions.',
    ],
}

export function FilterBarDocs() {
    return <DocPage doc={docData} />
}
