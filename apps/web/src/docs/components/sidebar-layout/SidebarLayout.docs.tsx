import { DocPage, type DocPageData } from '../DocPage'
import { SidebarLayout } from '@monority/ui'
import { SidebarLayoutBasicExample } from './SidebarLayout.examples'

const docData: DocPageData = {
  title: 'SidebarLayout',
  description: "Two-column layout with sidebar and main content area.",
  importCode: "import { SidebarLayout } from '@monority/ui'",
  usageCode: `<SidebarLayout sidebar={<nav>...</nav>}>
  <main>Main content</main>
</SidebarLayout>`,
  preview: () => <SidebarLayoutBasicExample />,
  props: [
    { name: 'sidebar', type: `ReactNode`, defaultValue: "-", description: "Sidebar content." },
    { name: 'header', type: `ReactNode`, defaultValue: "-", description: "Optional header content." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Main content." },
    { name: 'sidebarWidth', type: `'sm' | 'md' | 'lg'`, defaultValue: "-", description: "Sidebar width preset." }
  ],
}

export function SidebarLayoutDocs() {
  return <DocPage doc={docData} />
}
