import { DocPage, type DocPageData } from '../DocPage'
import {
  PaginationBasicExample,
  PaginationInteractiveExample,
  PaginationFewPagesExample,
  PaginationManyPagesExample,
} from './Pagination.examples'

const docData: DocPageData = {
  title: 'Pagination',
  description:
    'A compact page navigator with directional actions, condensed page ranges, and a stronger active state.',
  importCode: "import { Pagination } from '@monority/ui'",
  usageCode: `<Pagination page={1} totalPages={10} onPageChange={setPage} />`,
  preview: () => <PaginationBasicExample />,
  examples: [
    { title: 'Interactive', content: <PaginationInteractiveExample /> },
    { title: 'Few pages', content: <PaginationFewPagesExample /> },
    { title: 'Many pages', content: <PaginationManyPagesExample /> },
  ],
  props: [
    {
      name: 'page',
      type: `number`,
      defaultValue: '1',
      description: 'Current page.',
    },
    {
      name: 'totalPages',
      type: `number`,
      defaultValue: '1',
      description: 'Total page count.',
    },
    {
      name: 'onPageChange',
      type: `(page: number) => void`,
      defaultValue: '-',
      description: 'Page change callback.',
    },
  ],
  cssHooks: [
    '.mr-pagination',
    '.mr-pagination__slot',
    '.mr-pagination__pages',
    '.mr-pagination__btn',
    '.mr-pagination__ellipsis',
  ],
  tokens: [
    '--mr-accent',
    '--mr-border-subtle',
    '--mr-bg-control',
    '--mr-bg-surface-elevated',
    '--mr-fg-muted',
  ],
  a11y: [
    'Uses nav semantics with an explicit pagination label.',
    'The active page exposes aria-current="page".',
    'Previous and next actions include clear labels.',
  ],
}

export function PaginationDocs() {
  return <DocPage doc={docData} />
}
