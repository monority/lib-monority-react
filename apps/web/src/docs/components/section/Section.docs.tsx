import { DocPage, type DocPageData } from '../DocPage'
import { SectionBasicExample, SectionSpacingExample } from './Section.examples'

const docData: DocPageData = {
    title: 'Section',
    description: 'Content section with configurable spacing.',
    importCode: "import { Section } from '@monority/ui'",
    usageCode: `<Section spacing="lg">
  <h2>Content section</h2>
</Section>`,
    preview: () => <SectionBasicExample />,
    examples: [{ title: 'Spacing variants', content: <SectionSpacingExample /> }],
    props: [
        {
            name: 'spacing',
            type: `'sm' | 'md' | 'lg' | 'xl'`,
            defaultValue: '-',
            description: 'Vertical spacing preset.',
        },
    ],
    cssHooks: [
        '.mr-section',
        '.mr-section__header',
        '.mr-section__title',
        '.mr-section__description',
    ],
    tokens: ['--mr-space-*', '--mr-text-*'],
    a11y: ['Section landmark.', 'aria-labelledby for header.'],
}

export function SectionDocs() {
    return <DocPage doc={docData} />
}
