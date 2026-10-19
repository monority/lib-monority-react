import { Container } from '@monority/ui/container'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { ContainerSizesExample } from './Container.examples'

function ContainerPlayground() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')

    const snippet = `<Container size="${size}">
  <div className="content">
    Contenu centré et contraint en largeur (${size}).
  </div>
</Container>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Taille max (size)',
                    value: size,
                    options: [
                        { value: 'sm', label: 'Small (sm)' },
                        { value: 'md', label: 'Medium (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                        { value: 'xl', label: 'Extra-large (xl)' },
                    ],
                    onChange: (v) => setSize(v as 'sm' | 'md' | 'lg' | 'xl'),
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    minHeight: 120,
                    padding: 16,
                    background: 'var(--mr-bg-sunken, #f8fafc)',
                    borderRadius: 8,
                }}
            >
                <Container size={size}>
                    <div
                        style={{
                            padding: '24px 20px',
                            background: 'var(--mr-bg-surface, #ffffff)',
                            border: '1px solid var(--mr-border-default, #cbd5e1)',
                            borderRadius: 8,
                            textAlign: 'center',
                            fontSize: '0.875rem',
                            color: 'var(--mr-text-primary, #0f172a)',
                        }}
                    >
                        Conteneur calibré sur la largeur maximale <strong>{size}</strong>
                    </div>
                </Container>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Container',
    description: 'Width-constrained container for centering page content.',
    importCode: "import { Container } from '@monority/ui'",
    usageCode: `<Container size="md">
  <p>Constrained content goes here.</p>
</Container>`,
    preview: () => <ContainerPlayground />,
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
    tokens: [
        '--mr-container-sm',
        '--mr-container-md',
        '--mr-container-lg',
        '--mr-page-max-width',
        '--mr-space-*',
    ],
    a11y: ['Structural layout component.', 'No interactive semantics by default.'],
}

export function ContainerDocs() {
    return <DocPage doc={docData} />
}
