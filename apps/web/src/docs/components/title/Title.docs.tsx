import { DocPage, type DocPageData } from "../DocPage"
import {
  TitleBasicExample,
  TitleSizesExample,
  TitleLevelsExample,
} from './Title.examples'

const docData: DocPageData = {
  title: 'Title',
  description: 'Polymorphic heading component with size variants. Combine with Text for complete typographic hierarchy.',
  importCode: "import { Title } from '@monority/ui'",
  usageCode: `<Title as="h1" size="display">Page Title</Title>
<Title as="h2" size="lg">Section Header</Title>`,
  preview: () => <TitleBasicExample />,
  examples: [
    { title: 'Sizes', content: <TitleSizesExample /> },
    { title: 'Heading levels', content: <TitleLevelsExample /> },
  ],
  props: [
    { name: "as", type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'", defaultValue: "'h2'", description: "Heading level." },
    { name: "size", type: "'sm' | 'md' | 'lg' | 'display'", defaultValue: "-", description: "Title size preset." },
    { name: "children", type: "ReactNode", defaultValue: "-", description: "Heading content." }
  ],
  cssHooks: [
    '.mr-title', '.mr-title--sm', '.mr-title--md', '.mr-title--lg', '.mr-title--display',
    '[data-size]',
  ],
  tokens: [
    '--mr-fg-base', '--mr-text-*',
  ],
  a11y: [
    'Heading landmark.',
    'Use appropriate `as` level for document hierarchy.',
  ],
}

export function TitleDocs() {
  return <DocPage doc={docData} />
}
