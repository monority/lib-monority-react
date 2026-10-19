import { Button } from '@monority/ui/button'
import { FilterBar } from '@monority/ui/filter-bar'
import { Input } from '@monority/ui/input'
import { Select } from '@monority/ui/select'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { FilterBarWithControlsExample, FilterBarWithResetExample } from './FilterBar.examples'

function FilterBarPlayground() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')
    const [showChips, setShowChips] = useState(true)

    const activeCount = (search ? 1 : 0) + (status !== 'all' ? 1 : 0)

    const snippet = `<FilterBar>
  <FilterBar.Main>
    <FilterBar.Leading>
      <Input
        placeholder="Rechercher un composant..."
        value="${search}"
      />
    </FilterBar.Leading>
    <Select aria-label="Filtre de statut" value="${status}">
      <option value="all">Tous les statuts</option>
      <option value="stable">Stable</option>
      <option value="beta">Beta</option>
      <option value="deprecated">Obsolète</option>
    </Select>
  </FilterBar.Main>
  <FilterBar.Meta>
    <span>${activeCount > 0 ? `${activeCount} filtre(s) actif(s)` : '34 résultats'}</span>
  </FilterBar.Meta>
</FilterBar>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'text',
                    label: 'Recherche texte',
                    value: search,
                    onChange: setSearch,
                },
                {
                    type: 'select',
                    label: 'Filtre de statut',
                    value: status,
                    options: [
                        { value: 'all', label: 'Tous les statuts' },
                        { value: 'stable', label: 'Stable' },
                        { value: 'beta', label: 'Beta' },
                        { value: 'deprecated', label: 'Obsolète' },
                    ],
                    onChange: setStatus,
                },
                {
                    type: 'boolean',
                    label: 'Afficher tags actifs',
                    value: showChips,
                    onChange: setShowChips,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    minHeight: 96,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                }}
            >
                <FilterBar>
                    <FilterBar.Main>
                        <FilterBar.Leading>
                            <Input
                                placeholder="Rechercher un composant..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </FilterBar.Leading>
                        <Select
                            aria-label="Filtre de statut"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="stable">Stable</option>
                            <option value="beta">Beta</option>
                            <option value="deprecated">Obsolète</option>
                        </Select>
                        {activeCount > 0 && (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                    setSearch('')
                                    setStatus('all')
                                }}
                            >
                                Réinitialiser
                            </Button>
                        )}
                    </FilterBar.Main>
                    <FilterBar.Meta>
                        <span
                            style={{
                                fontSize: '0.85rem',
                                color: 'var(--mr-text-secondary, #64748b)',
                            }}
                        >
                            {activeCount > 0 ? `${activeCount} filtre(s) actif(s)` : '34 résultats'}
                        </span>
                    </FilterBar.Meta>
                </FilterBar>
                {showChips && activeCount > 0 && (
                    <FilterBar.Chips>
                        {search && (
                            <FilterBar.Chip active onClick={() => setSearch('')}>
                                Requête: {search} ✕
                            </FilterBar.Chip>
                        )}
                        {status !== 'all' && (
                            <FilterBar.Chip active onClick={() => setStatus('all')}>
                                Statut: {status} ✕
                            </FilterBar.Chip>
                        )}
                    </FilterBar.Chips>
                )}
            </div>
        </ComponentPlayground>
    )
}

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
    preview: () => <FilterBarPlayground />,
    examples: [
        {
            title: 'With controls',
            content: <FilterBarWithControlsExample />,
            code: `<FilterBar>
  <FilterBar.Main>
    <FilterBar.Leading>
      <Input placeholder="Search components..." />
    </FilterBar.Leading>
    <Select aria-label="Status filter" defaultValue="all">
      <option value="all">All statuses</option>
      <option value="stable">Stable</option>
      <option value="beta">Beta</option>
      <option value="deprecated">Deprecated</option>
    </Select>
    <Select aria-label="Platform filter" defaultValue="all">
      <option value="all">All platforms</option>
      <option value="web">Web</option>
      <option value="mobile">Mobile</option>
    </Select>
  </FilterBar.Main>
</FilterBar>`,
        },
        {
            title: 'With reset',
            content: <FilterBarWithResetExample />,
            code: `<FilterBar>
  <FilterBar.Main>
    <FilterBar.Leading>
      <Input value="filtered query" />
    </FilterBar.Leading>
    <Button size="sm" variant="ghost">Reset all</Button>
  </FilterBar.Main>
  <FilterBar.Meta>3 active filters</FilterBar.Meta>
</FilterBar>`,
        },
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
        '--mr-bg-raised',
        '--mr-bg-surface',
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
