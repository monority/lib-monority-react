import { DocPage, type DocPageData } from '../DocPage'
import { Toolbar } from '@monority/ui'
import { ToolbarBasicExample } from './Toolbar.examples'

const docData: DocPageData = {
  title: 'Toolbar',
  description: "Toolbar wrapper for grouping action controls in a horizontal layout.",
  importCode: "import { Toolbar } from '@monority/ui'",
  usageCode: `<Toolbar>
  <Button>Save</Button>
  <Button variant="ghost">Cancel</Button>
</Toolbar>`,
  preview: () => <ToolbarBasicExample />,
  props: [
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Toolbar content." }
  ],
}

export function ToolbarDocs() {
  return <DocPage doc={docData} />
}
