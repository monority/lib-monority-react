import { DocPage, type DocPageData } from '../DocPage'
import {
    SectionBasicExample,
    SectionSpacingExample,
    SectionCompoundExample,
} from './Section.examples'

const docData: DocPageData = {
    title: 'Section',
    description:
        'Content section with configurable spacing, visual variants, and polymorphic element.',
    importCode: "import { Section } from '@monority/ui/section'",
    usageCode: `<Section spacing="lg" variant="card" title="Features">
  <Text>Content grouped in a card-style section.</Text>
</Section>`,
    preview: () => <SectionBasicExample />,
    examples: [
        {
            title: 'Compound composition',
            content: <SectionCompoundExample />,
            code: `<Section variant="card" spacing="lg">
  <Section.Header>
    <Section.Title as="h2">Architecture overview</Section.Title>
    <Section.Description>Explore how layers, tokens, and components compose predictably across applications.</Section.Description>
  </Section.Header>
  <Section.Content>
    <Text>Sections provide clear boundary rhythm, semantic heading hierarchy, and consistent surface treatments.</Text>
  </Section.Content>
</Section>`,
        },
        { title: 'Spacing variants', content: <SectionSpacingExample /> },
    ],
    props: [
        {
            name: 'title',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Section heading content.',
        },
        {
            name: 'titleAs',
            type: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`,
            defaultValue: "'h2'",
            description: 'HTML heading level for the title.',
        },
        {
            name: 'spacing',
            type: `'sm' | 'md' | 'lg' | 'xl'`,
            defaultValue: "'md'",
            description: 'Vertical spacing preset (gap + padding).',
        },
        {
            name: 'variant',
            type: `'default' | 'bordered' | 'muted' | 'card'`,
            defaultValue: "'default'",
            description: 'Visual variant.',
        },
        {
            name: 'as',
            type: `ElementType`,
            defaultValue: "'section'",
            description: 'Polymorphic root element.',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Content inside the section.',
        },
    ],
    cssHooks: ['.mr-section', '.mr-section__title', '[data-spacing]', '[data-variant]'],
    tokens: [
        '--mr-section-gap',
        '--mr-section-padding-x',
        '--mr-space-*',
        '--mr-border-subtle',
        '--mr-bg-surface-strong',
        '--mr-bg-raised',
        '--mr-shadow-xs',
        '--mr-radius-md',
        '--mr-text-lg',
        '--mr-font-weight-semibold',
    ],
    a11y: [
        'Renders a semantic <section> landmark by default.',
        'Pass as="div" to remove the landmark when inappropriate.',
        'The title uses an appropriate heading level (default h2, configurable via titleAs).',
    ],
}

export function SectionDocs() {
    return <DocPage doc={docData} />
}
