import { DocPage, type DocPageData } from '../DocPage'
import { Section } from '@monority/ui'
import { SectionBasicExample } from './Section.examples'

const docData: DocPageData = {
  title: 'Section',
  description: "Content section with configurable spacing.",
  importCode: "import { Section } from '@monority/ui'",
  usageCode: `<Section spacing="lg">
  <h2>Content section</h2>
</Section>`,
  preview: () => <SectionBasicExample />,
  props: [
    { name: 'spacing', type: `'sm' | 'md' | 'lg' | 'xl'`, defaultValue: "-", description: "Vertical spacing preset." }
  ],
}

export function SectionDocs() {
  return <DocPage doc={docData} />
}
