import { DocPage, type DocPageData } from '../DocPage'
import {
  PaginationBasicExample,
  PaginationInteractiveExample,
  PaginationFewPagesExample,
  PaginationManyPagesExample,
} from './Pagination.examples'

const docData: DocPageData = {
  title: 'Pagination',
  description: "Page navigation with prev/next buttons and numbered page buttons.",
  importCode: "import { Pagination } from '@monority/ui'",
  usageCode: `<Pagination page={1} totalPages={10} onPageChange={setPage} />`,
  preview: () => <PaginationBasicExample />,
  examples: [
    { title: 'Interactive', content: <PaginationInteractiveExample /> },
    { title: 'Few pages', content: <PaginationFewPagesExample /> },
    { title: 'Many pages', content: <PaginationManyPagesExample /> },
  ],
  props: [
    { name: 'page', type: `number`, defaultValue: "1", description: "Current page." },
    { name: 'totalPages', type: `number`, defaultValue: "1", description: "Total page count." },
    { name: 'onPageChange', type: `(page: number) => void`, defaultValue: "-", description: "Page change callback." }
  ],
  cssHooks: [
    '.mr-pagination', '.mr-pagination__button', '.mr-pagination__current',
    '[data-active]',
  ],
  tokens: [
    '--mr-accent', '--mr-accent-contrast', '--mr-fg-muted',
    '--mr-text-sm', '--mr-radius-sm',
  ],
  a11y: [
    'Nav ARIA pattern (aria-label="Pagination").',
    'aria-current="page" on current.',
    'Previous/next with aria-label.',
    'Keyboard navigation (arrows).',
  ],
}

export function PaginationDocs() {
  return <DocPage doc={docData} />
}
