import { DocPage, type DocPageData } from '../DocPage'
import { Text } from '@monority/ui'
import { TextBasicExample } from './Text.examples'

const docData: DocPageData = {
  title: 'Text',
  description: "Polymorphic text component with tone and size variants.",
  importCode: "import { Text } from '@monority/ui'",
  usageCode: `<Text as="p" tone="muted" size="md">Muted paragraph text</Text>
<Text as="span" tone="strong">Strong span text</Text>`,
  preview: () => <TextBasicExample />,
  props: [
    { name: 'as', type: `'p' | 'span' | 'div'`, defaultValue: "'p'", description: "Polymorphic element type." },
    { name: 'tone', type: `'muted' | 'base' | 'strong'`, defaultValue: "-", description: "Text tone / emphasis." },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "-", description: "Text size preset." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Text content." }
  ],
}

export function TextDocs() {
  return <DocPage doc={docData} />
}
