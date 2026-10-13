export const filterBarMeta = {
    title: 'FilterBar',
    status: 'stable',
    package: '@monority/ui/filter-bar',
    import: "import { FilterBar } from '@monority/ui'",
    category: 'navigation',
    anatomy: ['root', 'search', 'filters', 'actions', 'activeBadges'],
    accessibility: [
        'role="search" or form landmark for filter controls',
        'Filter tags include accessible dismiss buttons',
        'Preserves sequential tab navigation',
    ],
}
