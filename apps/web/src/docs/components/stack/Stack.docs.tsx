import { DocPage, type DocPageData } from '../DocPage'
import { Stack } from '@monority/ui'
import { StackBasicExample } from './Stack.examples'

const docData: DocPageData = {
  title: 'Stack',
  description: "Flexbox column layout with controlled gap between children.",
  importCode: "import { Stack } from '@monority/ui'",
  usageCode: `<Stack gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>`,
  preview: () => <StackBasicExample />,
  props: [
    { name: 'gap', type: `'xs' | 's' | 'sm' | 'm' | 'md' | 'l' | 'lg' | 'xl'`, defaultValue: "'m'", description: "Gap between children." }
  ],
}

export function StackDocs() {
  return <DocPage doc={docData} />
}
