import { DocPage, type DocPageData } from '../DocPage'
import {
  StackBasicExample,
  StackGapExample,
  StackHorizontalExample,
} from './Stack.examples'

const docData: DocPageData = {
  title: 'Stack',
  description: "Flexbox column layout with controlled gap between children.",
  importCode: "import { Stack } from '@monority/ui'",
  usageCode: `<Stack gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>`,
  preview: () => <StackBasicExample />,
  examples: [
    { title: 'Gap sizes', content: <StackGapExample /> },
    { title: 'Horizontal', content: <StackHorizontalExample /> },
  ],
  props: [
    { name: 'gap', type: `'xs' | 's' | 'sm' | 'm' | 'md' | 'l' | 'lg' | 'xl'`, defaultValue: "'m'", description: "Gap between children." }
  ],
  cssHooks: [
    '.mr-stack', '[data-gap]', '[data-align]', '[data-justify]',
  ],
  tokens: [
    '--mr-space-*',
  ],
  a11y: [
    'Structural layout component.',
    'No interactive semantics by default.',
  ],
}

export function StackDocs() {
  return <DocPage doc={docData} />
}
