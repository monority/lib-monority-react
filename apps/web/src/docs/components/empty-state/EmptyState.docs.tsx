import { DocPage, type DocPageData } from '../DocPage'
import { EmptyState } from '@monority/ui'
import { EmptyStateBasicExample } from './EmptyState.examples'

const docData: DocPageData = {
  title: 'EmptyState',
  description: "Placeholder for empty data views with icon, description, and optional actions.",
  importCode: "import { EmptyState } from '@monority/ui'",
  usageCode: `<EmptyState title="No results found" description="Try adjusting your filters." />`,
  preview: () => <EmptyStateBasicExample />,
  props: [
    { name: 'title', type: `string`, defaultValue: "-", description: "Main empty state heading." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Supporting description." },
    { name: 'icon', type: `ReactNode`, defaultValue: "-", description: "Optional icon." },
    { name: 'action', type: `ReactNode`, defaultValue: "-", description: "Primary action button." },
    { name: 'secondaryAction', type: `ReactNode`, defaultValue: "-", description: "Secondary action." }
  ],
}

export function EmptyStateDocs() {
  return <DocPage doc={docData} />
}
