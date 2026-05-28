import { DocPage, type DocPageData } from '../DocPage'
import {
  DividerBasicExample,
  DividerWithLabelExample,
  DividerVerticalExample,
} from './Divider.examples'

const docData: DocPageData = {
  title: 'Divider',
  description: "Horizontal rule divider for visual separation of content.",
  importCode: "import { Divider } from '@monority/ui'",
  usageCode: `<Divider />`,
  preview: () => <DividerBasicExample />,
  examples: [
    { title: 'With label', content: <DividerWithLabelExample /> },
    { title: 'Vertical', content: <DividerVerticalExample /> },
  ],
  cssHooks: [
    '.mr-divider',
  ],
  tokens: [
    '--mr-border-subtle', '--mr-space-*',
  ],
  a11y: [
    'Presentational — role="separator" or aria-hidden.',
    'Use aria-label for semantic dividers in navigation.',
  ],
}

export function DividerDocs() {
  return <DocPage doc={docData} />
}
