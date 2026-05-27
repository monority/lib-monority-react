import { DocPage, type DocPageData } from '../DocPage'
import { Topbar } from '@monority/ui'
import { TopbarBasicExample } from './Topbar.examples'

const docData: DocPageData = {
  title: 'Topbar',
  description: "Top header bar wrapper using the HTML <header> element.",
  importCode: "import { Topbar } from '@monority/ui'",
  usageCode: `<Topbar>
  <span>Logo</span>
  <nav>Navigation</nav>
</Topbar>`,
  preview: () => <TopbarBasicExample />,
  props: [
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Header content." }
  ],
}

export function TopbarDocs() {
  return <DocPage doc={docData} />
}
