import { DocPage, type DocPageData } from '../DocPage'
import { Pagination } from '@monority/ui'
import { PaginationBasicExample } from './Pagination.examples'

const docData: DocPageData = {
  title: 'Pagination',
  description: "Page navigation with prev/next buttons and numbered page buttons.",
  importCode: "import { Pagination } from '@monority/ui'",
  usageCode: `<Pagination page={1} totalPages={10} onPageChange={setPage} />`,
  preview: () => <PaginationBasicExample />,
  props: [
    { name: 'page', type: `number`, defaultValue: "1", description: "Current page." },
    { name: 'totalPages', type: `number`, defaultValue: "1", description: "Total page count." },
    { name: 'onPageChange', type: `(page: number) => void`, defaultValue: "-", description: "Page change callback." }
  ],
}

export function PaginationDocs() {
  return <DocPage doc={docData} />
}
