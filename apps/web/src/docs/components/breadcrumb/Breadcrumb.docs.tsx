import { DocPage, type DocPageData } from '../DocPage'
import { Breadcrumb } from '@monority/ui'
import { BreadcrumbBasicExample } from './Breadcrumb.examples'

const docData: DocPageData = {
  title: 'Breadcrumb',
  description: "Breadcrumb trail with nav and ordered list semantics.",
  importCode: "import { Breadcrumb } from '@monority/ui'",
  usageCode: `<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Projects' },
]} />`,
  preview: () => <BreadcrumbBasicExample />,
  props: [
    { name: 'items', type: `{ label: string; href?: string }[]`, defaultValue: "[]", description: "Breadcrumb trail items." }
  ],
}

export function BreadcrumbDocs() {
  return <DocPage doc={docData} />
}
