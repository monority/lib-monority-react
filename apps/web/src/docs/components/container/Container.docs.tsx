import { DocPage, type DocPageData } from '../DocPage'
import { Container } from '@monority/ui'
import { ContainerBasicExample } from './Container.examples'

const docData: DocPageData = {
  title: 'Container',
  description: "Width-constrained container for centering page content.",
  importCode: "import { Container } from '@monority/ui'",
  usageCode: `<Container size="md">
  <p>Constrained content goes here.</p>
</Container>`,
  preview: () => <ContainerBasicExample />,
  props: [
    { name: 'size', type: `'sm' | 'md' | 'lg' | 'xl'`, defaultValue: "-", description: "Container max-width preset." }
  ],
}

export function ContainerDocs() {
  return <DocPage doc={docData} />
}
