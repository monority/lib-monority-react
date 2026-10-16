import { useState } from 'react'
import { Separator } from '@monority/ui/separator'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    SeparatorBasicExample,
    SeparatorDecorativeExample,
    SeparatorVerticalExample,
} from './Separator.examples'

function SeparatorPlayground() {
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
    const [decorative, setDecorative] = useState(false)

    const snippet = `<Separator
  orientation="${orientation}"${decorative ? '\n  decorative' : ''}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Orientation',
                    value: orientation,
                    options: [
                        { value: 'horizontal', label: 'Horizontal' },
                        { value: 'vertical', label: 'Vertical' },
                    ],
                    onChange: (v) => setOrientation(v as 'horizontal' | 'vertical'),
                },
                {
                    type: 'boolean',
                    label: 'Purement décoratif (decorative)',
                    value: decorative,
                    onChange: setDecorative,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 120,
                    width: '100%',
                }}
            >
                {orientation === 'horizontal' ? (
                    <div
                        style={{
                            width: '100%',
                            maxWidth: 360,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                        }}
                    >
                        <span style={{ fontSize: '0.875rem' }}>Section supérieure</span>
                        <Separator orientation="horizontal" decorative={decorative} />
                        <span style={{ fontSize: '0.875rem' }}>Section inférieure</span>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 60 }}>
                        <span style={{ fontSize: '0.875rem' }}>Gauche</span>
                        <Separator orientation="vertical" decorative={decorative} />
                        <span style={{ fontSize: '0.875rem' }}>Droite</span>
                    </div>
                )}
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Separator',
    description: 'Subtle divider for separating related groups without adding a new surface.',
    importCode: "import { Separator } from '@monority/ui/separator'",
    usageCode: '<Separator />',
    preview: () => <SeparatorPlayground />,
    examples: [
        { title: 'Vertical', content: <SeparatorVerticalExample /> },
        { title: 'Decorative', content: <SeparatorDecorativeExample /> },
    ],
    props: [
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Axis of the divider.',
        },
        {
            name: 'decorative',
            type: 'boolean',
            defaultValue: 'false',
            description:
                'Switches the separator to presentation role when structure is already clear.',
        },
    ],
    cssHooks: [
        '.mr-separator',
        '.mr-separator--horizontal',
        '.mr-separator--vertical',
        '[data-orientation="horizontal"]',
        '[data-orientation="vertical"]',
    ],
    tokens: ['--mr-separator-color', '--mr-border-subtle'],
    a11y: [
        'Uses role="separator" and aria-orientation by default.',
        'Use decorative={true} for purely visual grouping.',
        'Do not rely on separators as the only indication of section meaning.',
    ],
}

export function SeparatorDocs() {
    return <DocPage doc={docData} />
}
