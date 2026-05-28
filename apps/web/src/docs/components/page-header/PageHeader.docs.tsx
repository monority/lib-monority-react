import { DocPage, type DocPageData } from '../DocPage'
import {
  PageHeaderBasicExample,
  PageHeaderWithTitleExample,
  PageHeaderWithActionsExample,
} from './PageHeader.examples'

const docData: DocPageData = {
  title: 'PageHeader',
  description: "Simple page header wrapper for title and description content.",
  importCode: "import { PageHeader } from '@monority/ui'",
  usageCode: `<PageHeader>
  <h1>Page Title</h1>
</PageHeader>`,
  preview: () => <PageHeaderBasicExample />,
  examples: [
    { title: 'With title', content: <PageHeaderWithTitleExample /> },
    { title: 'With actions', content: <PageHeaderWithActionsExample /> },
  ],
  props: [
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Header content." }
  ],
  cssHooks: [
    '.mr-page-header', '.mr-page-header__title', '.mr-page-header__description', '.mr-page-header__actions',
  ],
  tokens: [
    '--mr-fg-base', '--mr-fg-muted', '--mr-text-*', '--mr-space-*',
  ],
  a11y: [
    'Heading landmark.',
    'aria-label for page section.',
  ],
}

export function PageHeaderDocs() {
  return <DocPage doc={docData} />
}
