import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { FilterBar } from '@monority/ui/filter-bar'
import { Input } from '@monority/ui/input'
import { Select } from '@monority/ui/select'
import { Text } from '@monority/ui/text'
import { useMemo, useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { FilterBarWithControlsExample, FilterBarWithResetExample } from './FilterBar.examples'

const allComponents = [
    {
        name: 'Button',
        category: 'forms',
        status: 'stable',
        desc: 'Déclencheur d’actions accessible',
    },
    { name: 'DataTable', category: 'data', status: 'stable', desc: 'Tableau haute performance' },
    {
        name: 'Modal',
        category: 'overlay',
        status: 'stable',
        desc: 'Boîte de dialogue modale WAI-ARIA',
    },
    {
        name: 'SidebarLayout',
        category: 'navigation',
        status: 'beta',
        desc: 'Disposition en panneau latéral',
    },
    {
        name: 'Carousel',
        category: 'data',
        status: 'stable',
        desc: 'Diaporama tactile et accessible',
    },
    {
        name: 'FilterBar',
        category: 'navigation',
        status: 'stable',
        desc: 'Barre de filtres multi-critères',
    },
]

function FilterBarPlayground() {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [status, setStatus] = useState('all')
    const [showChips, setShowChips] = useState(true)

    const activeCount = (search ? 1 : 0) + (category !== 'all' ? 1 : 0) + (status !== 'all' ? 1 : 0)

    const filtered = useMemo(() => {
        return allComponents.filter((item) => {
            if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false
            if (category !== 'all' && item.category !== category) return false
            if (status !== 'all' && item.status !== status) return false
            return true
        })
    }, [search, category, status])

    const handleReset = () => {
        setSearch('')
        setCategory('all')
        setStatus('all')
    }

    const snippet = `<FilterBar>
  <FilterBar.Main>
    <FilterBar.Leading>
      <Input
        size="sm"
        placeholder="Rechercher par nom..."
        value="${search}"
      />
    </FilterBar.Leading>
    <Select size="sm" aria-label="Catégorie" value="${category}">
      <option value="all">Toutes les catégories</option>
      <option value="navigation">Navigation</option>
      <option value="data">Data & Visualisation</option>
      <option value="forms">Formulaires</option>
      <option value="overlay">Overlays</option>
    </Select>
    <Select size="sm" aria-label="Statut" value="${status}">
      <option value="all">Tous les statuts</option>
      <option value="stable">Stable</option>
      <option value="beta">Beta</option>
    </Select>
    ${activeCount > 0 ? '<Button size="sm" variant="ghost" onClick={handleReset}>Réinitialiser</Button>' : ''}
  </FilterBar.Main>
  <FilterBar.Meta>
    <Badge variant="outline" size="sm">\${${filtered.length}} résultat(s)</Badge>
    ${activeCount > 0 ? `<Badge variant="subtle" size="sm">\${${activeCount}} actif(s)</Badge>` : ''}
  </FilterBar.Meta>
</FilterBar>
${
    showChips && activeCount > 0
        ? `<FilterBar.Chips>
  ${search ? `<FilterBar.Chip active onClick={() => setSearch('')}>Nom: "${search}" ✕</FilterBar.Chip>` : ''}
  ${category !== 'all' ? `<FilterBar.Chip active onClick={() => setCategory('all')}>Catégorie: ${category} ✕</FilterBar.Chip>` : ''}
  ${status !== 'all' ? `<FilterBar.Chip active onClick={() => setStatus('all')}>Statut: ${status} ✕</FilterBar.Chip>` : ''}
</FilterBar.Chips>`
        : ''
}`

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
                    label: 'Catégorie',
                    value: category,
                    options: [
                        { value: 'all', label: 'Toutes les catégories' },
                        { value: 'navigation', label: 'Navigation' },
                        { value: 'data', label: 'Data' },
                        { value: 'forms', label: 'Formulaires' },
                        { value: 'overlay', label: 'Overlays' },
                    ],
                    onChange: setCategory,
                },
                {
                    type: 'select',
                    label: 'Statut',
                    value: status,
                    options: [
                        { value: 'all', label: 'Tous les statuts' },
                        { value: 'stable', label: 'Stable' },
                        { value: 'beta', label: 'Beta' },
                    ],
                    onChange: setStatus,
                },
                {
                    type: 'boolean',
                    label: 'Afficher tags actifs (Chips)',
                    value: showChips,
                    onChange: setShowChips,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--mr-space-3)',
                }}
            >
                <FilterBar>
                    <FilterBar.Main>
                        <FilterBar.Leading>
                            <Input
                                size="sm"
                                placeholder="Rechercher par nom..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </FilterBar.Leading>
                        <Select
                            size="sm"
                            aria-label="Catégorie"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="all">Toutes les catégories</option>
                            <option value="navigation">Navigation</option>
                            <option value="data">Data & Visualisation</option>
                            <option value="forms">Formulaires</option>
                            <option value="overlay">Overlays</option>
                        </Select>
                        <Select
                            size="sm"
                            aria-label="Statut"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="stable">Stable</option>
                            <option value="beta">Beta</option>
                        </Select>
                        {activeCount > 0 && (
                            <Button size="sm" variant="ghost" onClick={handleReset}>
                                Réinitialiser
                            </Button>
                        )}
                    </FilterBar.Main>
                    <FilterBar.Meta>
                        <Badge variant="default" tone="neutral" size="sm">
                            {filtered.length} composant(s)
                        </Badge>
                        {activeCount > 0 && (
                            <Badge variant="default" tone="accent" size="sm">
                                {activeCount} filtre(s)
                            </Badge>
                        )}
                    </FilterBar.Meta>
                </FilterBar>

                {showChips && activeCount > 0 && (
                    <FilterBar.Chips>
                        {search && (
                            <FilterBar.Chip active onClick={() => setSearch('')}>
                                Nom : &quot;{search}&quot; ✕
                            </FilterBar.Chip>
                        )}
                        {category !== 'all' && (
                            <FilterBar.Chip active onClick={() => setCategory('all')}>
                                Catégorie : {category} ✕
                            </FilterBar.Chip>
                        )}
                        {status !== 'all' && (
                            <FilterBar.Chip active onClick={() => setStatus('all')}>
                                Statut : {status} ✕
                            </FilterBar.Chip>
                        )}
                    </FilterBar.Chips>
                )}

                {/* Live interactive results list demonstrating true professional composition */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gap: 'var(--mr-space-2)',
                        marginTop: 'var(--mr-space-1)',
                    }}
                >
                    {filtered.length > 0 ? (
                        filtered.map((item) => (
                            <div
                                key={item.name}
                                style={{
                                    padding: 'var(--mr-space-3)',
                                    borderRadius: 'var(--mr-radius-md)',
                                    background: 'var(--mr-bg-surface)',
                                    border: '1px solid var(--mr-border-subtle)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--mr-space-1)',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Text tone="strong" size="sm">
                                        {item.name}
                                    </Text>
                                    <Badge
                                        size="sm"
                                        variant={item.status === 'stable' ? 'success' : 'default'}
                                    >
                                        {item.status}
                                    </Badge>
                                </div>
                                <Text tone="muted" size="sm">
                                    {item.desc}
                                </Text>
                            </div>
                        ))
                    ) : (
                        <div
                            style={{
                                gridColumn: '1 / -1',
                                padding: 'var(--mr-space-4)',
                                textAlign: 'center',
                                color: 'var(--mr-text-tertiary)',
                                fontSize: 'var(--mr-font-size-sm)',
                            }}
                        >
                            Aucun composant ne correspond aux filtres actifs.
                        </div>
                    )}
                </div>
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
