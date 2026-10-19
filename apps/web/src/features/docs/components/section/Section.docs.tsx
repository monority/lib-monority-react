import { Section } from '@monority/ui/section'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { SectionCompoundExample, SectionSpacingExample } from './Section.examples'

function SectionPlayground() {
    const [variant, setVariant] = useState<'default' | 'bordered' | 'muted' | 'card'>('card')
    const [spacing, setSpacing] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')
    const [title, setTitle] = useState('Vue d’ensemble de l’architecture')

    const snippet = `<Section
  variant="${variant}"
  spacing="${spacing}"
  title="${title}"
>
  <Text>
    Les sections structurent le rythme vertical des pages et fournissent une hiérarchie de titres sémantique.
  </Text>
</Section>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Variante visuelle',
                    value: variant,
                    options: [
                        { value: 'card', label: 'Carte (card)' },
                        { value: 'default', label: 'Défaut (transparent)' },
                        { value: 'bordered', label: 'Bordé (bordered)' },
                        { value: 'muted', label: 'Atténué (muted)' },
                    ],
                    onChange: (v) => setVariant(v as 'default' | 'bordered' | 'muted' | 'card'),
                },
                {
                    type: 'select',
                    label: 'Espacement (spacing)',
                    value: spacing,
                    options: [
                        { value: 'sm', label: 'Compact (sm)' },
                        { value: 'md', label: 'Normal (md)' },
                        { value: 'lg', label: 'Généreux (lg)' },
                        { value: 'xl', label: 'Spacieux (xl)' },
                    ],
                    onChange: (v) => setSpacing(v as 'sm' | 'md' | 'lg' | 'xl'),
                },
                {
                    type: 'text',
                    label: 'Titre de la section',
                    value: title,
                    onChange: setTitle,
                },
            ]}
            codeSnippet={snippet}
        >
            <div style={{ width: '100%', minHeight: 140 }}>
                <Section variant={variant} spacing={spacing} title={title}>
                    <Text>
                        Les sections structurent le rythme vertical des pages et fournissent une
                        hiérarchie de titres sémantique.
                    </Text>
                </Section>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Section',
    description:
        'Content section with configurable spacing, visual variants, and polymorphic element.',
    importCode: "import { Section } from '@monority/ui/section'",
    usageCode: `<Section spacing="lg" variant="card" title="Features">
  <Text>Content grouped in a card-style section.</Text>
</Section>`,
    preview: () => <SectionPlayground />,
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
