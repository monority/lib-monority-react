import { DocPage, type DocPageData } from '../DocPage'
import { PageHeader } from '@monority/ui'
import { PageHeaderBasicExample } from './PageHeader.examples'

const docData: DocPageData = {
  title: 'PageHeader',
  description: "Simple page header wrapper for title and description content.",
  importCode: "import { PageHeader } from '@monority/ui'",
  usageCode: `<PageHeader>
  <h1>Page Title</h1>
</PageHeader>`,
  preview: () => <PageHeaderBasicExample />,
  props: [
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Header content." }
  ],
}

export function PageHeaderDocs() {
  return <DocPage doc={docData} />
}
