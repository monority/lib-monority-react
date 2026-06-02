import { DocPage, type DocPageData } from '../DocPage'
import {
    EmptyStateBasicExample,
    EmptyStateWithActionExample,
    EmptyStateWithIconExample,
    EmptyStateWithSecondaryActionExample,
} from './EmptyState.examples'

const docData: DocPageData = {
    title: 'EmptyState',
    description:
        'A centered fallback surface for empty collections, quiet queues, and first-run moments.',
    importCode: "import { EmptyState } from '@monority/ui'",
    usageCode: '<EmptyState title="No results found" description="Try adjusting your filters." />',
    preview: () => <EmptyStateBasicExample />,
    examples: [
        { title: 'With action', content: <EmptyStateWithActionExample /> },
        { title: 'With icon', content: <EmptyStateWithIconExample /> },
        {
            title: 'With secondary action',
            content: <EmptyStateWithSecondaryActionExample />,
        },
    ],
    props: [
        {
            name: 'title',
            type: `string`,
            defaultValue: '-',
            description: 'Main empty state heading.',
        },
        {
            name: 'description',
            type: `string`,
            defaultValue: '-',
            description: 'Supporting description.',
        },
        {
            name: 'icon',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Optional leading visual.',
        },
        {
            name: 'action',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Primary action button.',
        },
        {
            name: 'secondaryAction',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Secondary action.',
        },
    ],
    cssHooks: [
        '.mr-empty-state',
        '.mr-empty-state__icon',
        '.mr-empty-state__content',
        '.mr-empty-state__title',
        '.mr-empty-state__description',
        '.mr-empty-state__actions',
    ],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-surface-elevated',
        '--mr-bg-surface-strong',
        '--mr-fg-strong',
        '--mr-fg-muted',
    ],
    a11y: [
        'Use a clear heading for the empty state message.',
        'Keep action labels explicit about the next step.',
        'Decorative visuals stay aria-hidden unless they carry meaning.',
    ],
}

export function EmptyStateDocs() {
    return <DocPage doc={docData} />
}
