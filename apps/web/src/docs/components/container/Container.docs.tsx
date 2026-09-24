import { DocPage, type DocPageData } from '../DocPage'
import { ContainerBasicExample, ContainerSizesExample } from './Container.examples'

const docData: DocPageData = {
    title: 'Container',
    description: 'Width-constrained container for centering page content.',
    importCode: "import { Container } from '@monority/ui'",
    usageCode: `<Container size="md">
  <p>Constrained content goes here.</p>
</Container>`,
    preview: () => <ContainerBasicExample />,
    examples: [{ title: 'Sizes', content: <ContainerSizesExample /> }],
    props: [
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg' | 'xl'`,
            defaultValue: '-',
            description: 'Container max-width preset.',
        },
    ],
    cssHooks: ['.mr-container'],
    tokens: ['--mr-container-sm', '--mr-container-md', '--mr-container-lg', '--mr-page-max-width', '--mr-space-*'],
    a11y: ['Structural layout component.', 'No interactive semantics by default.'],
}

export function ContainerDocs() {
    return <DocPage doc={docData} />
}
