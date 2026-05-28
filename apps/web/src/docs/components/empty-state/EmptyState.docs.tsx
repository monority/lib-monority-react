import { DocPage, type DocPageData } from '../DocPage'
import {
  EmptyStateBasicExample,
  EmptyStateWithActionExample,
  EmptyStateWithIconExample,
  EmptyStateWithSecondaryActionExample,
} from './EmptyState.examples'

const docData: DocPageData = {
  title: 'EmptyState',
  description: "Placeholder for empty data views with icon, description, and optional actions.",
  importCode: "import { EmptyState } from '@monority/ui'",
  usageCode: `<EmptyState title="No results found" description="Try adjusting your filters." />`,
  preview: () => <EmptyStateBasicExample />,
  examples: [
    { title: 'With action', content: <EmptyStateWithActionExample /> },
    { title: 'With icon', content: <EmptyStateWithIconExample /> },
    { title: 'With secondary action', content: <EmptyStateWithSecondaryActionExample /> },
  ],
  props: [
    { name: 'title', type: `string`, defaultValue: "-", description: "Main empty state heading." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Supporting description." },
    { name: 'icon', type: `ReactNode`, defaultValue: "-", description: "Optional icon." },
    { name: 'action', type: `ReactNode`, defaultValue: "-", description: "Primary action button." },
    { name: 'secondaryAction', type: `ReactNode`, defaultValue: "-", description: "Secondary action." }
  ],
  cssHooks: [
    '.mr-empty-state', '.mr-empty-state__icon', '.mr-empty-state__title',
    '.mr-empty-state__description', '.mr-empty-state__action',
  ],
  tokens: [
    '--mr-fg-muted', '--mr-fg-base', '--mr-text-*', '--mr-space-*',
  ],
  a11y: [
    'Use aria-label for illustration.',
    'Heading for empty state message.',
    'Action button with clear label.',
  ],
}

export function EmptyStateDocs() {
  return <DocPage doc={docData} />
}
