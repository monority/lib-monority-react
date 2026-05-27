import { DocPage, type DocPageData } from '../DocPage'
import { Divider } from '@monority/ui'
import { DividerBasicExample } from './Divider.examples'

const docData: DocPageData = {
  title: 'Divider',
  description: "Horizontal rule divider for visual separation of content.",
  importCode: "import { Divider } from '@monority/ui'",
  usageCode: `<Divider />`,
  preview: () => <DividerBasicExample />,
}

export function DividerDocs() {
  return <DocPage doc={docData} />
}
