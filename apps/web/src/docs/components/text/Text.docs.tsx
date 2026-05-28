import { DocPage, type DocPageData } from '../DocPage'
import {
  TextBasicExample,
  TextTonesExample,
  TextSizesExample,
  TextAsExample,
} from './Text.examples'

const docData: DocPageData = {
  title: 'Text',
  description: "Polymorphic text component with tone and size variants.",
  importCode: "import { Text } from '@monority/ui'",
  usageCode: `<Text as="p" tone="muted" size="md">Muted paragraph text</Text>
<Text as="span" tone="strong">Strong span text</Text>`,
  preview: () => <TextBasicExample />,
  examples: [
    { title: 'Tones', content: <TextTonesExample /> },
    { title: 'Sizes', content: <TextSizesExample /> },
    { title: 'As prop', content: <TextAsExample /> },
  ],
  props: [
    { name: 'as', type: `'p' | 'span' | 'div'`, defaultValue: "'p'", description: "Polymorphic element type." },
    { name: 'tone', type: `'muted' | 'base' | 'strong'`, defaultValue: "-", description: "Text tone / emphasis." },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "-", description: "Text size preset." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Text content." }
  ],
  cssHooks: [
    '.mr-text', '.mr-text--sm', '.mr-text--md', '.mr-text--lg',
    '.mr-text--muted', '.mr-text--strong',
    '[data-size]', '[data-tone]',
  ],
  tokens: [
    '--mr-fg-base', '--mr-fg-muted', '--mr-fg-strong',
    '--mr-text-*',
  ],
  a11y: [
    'Use concise text.',
    'Tone variants use color — avoid color-only meaning for critical states.',
  ],
}

export function TextDocs() {
  return <DocPage doc={docData} />
}
