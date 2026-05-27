import { DocPage, type DocPageData } from '../DocPage'
import { Title } from '@monority/ui'
import { TitleBasicExample } from './Title.examples'

const docData: DocPageData = {
  title: 'Title',
  description: "Polymorphic heading component with size variants.",
  importCode: "import { Title } from '@monority/ui'",
  usageCode: `<Title as="h1" size="display">Display Title</Title>
<Title as="h2" size="lg">Large Heading</Title>`,
  preview: () => <TitleBasicExample />,
  props: [
    { name: 'as', type: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`, defaultValue: "'h2'", description: "Heading level." },
    { name: 'size', type: `'sm' | 'md' | 'lg' | 'display'`, defaultValue: "-", description: "Title size preset." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Heading content." }
  ],
}

export function TitleDocs() {
  return <DocPage doc={docData} />
}
