import { DocPage, type DocPageData } from '../DocPage'
import {
  DividerBasicExample,
  DividerWithLabelExample,
  DividerVerticalExample,
} from './Divider.examples'

const docData: DocPageData = {
  title: 'Divider',
  description: 'Horizontal or vertical rule for visual separation of content.',
  importCode: "import { Divider } from '@monority/ui'",
  usageCode: '<Divider />',
  preview: () => <DividerBasicExample />,
  examples: [
    { title: 'With label', content: <DividerWithLabelExample /> },
    { title: 'Vertical', content: <DividerVerticalExample /> },
  ],
  props: [
    { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Orientation of the divider.' },
    { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Label text displayed in the middle.' },
  ],
  cssHooks: [
    '.mr-divider',
    '.mr-divider__label',
    '[data-orientation="vertical"]',
  ],
  tokens: [
    '--mr-border', '--mr-fg-muted', '--mr-text-xs',
  ],
  a11y: [
    'role="separator" with aria-orientation.',
    'Vertical dividers in nav should use aria-label on parent.',
  ],
}

export function DividerDocs() {
  return <DocPage doc={docData} />
}
