import { Divider } from '@monority/ui/divider'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { DividerVerticalExample, DividerWithLabelExample } from './Divider.examples'

function DividerPlayground() {
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
    const [label, setLabel] = useState('OU')

    const snippet = `<Divider
  orientation="${orientation}"${label ? `\n  label="${label}"` : ''}
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
                    type: 'text',
                    label: 'Étiquette centrale (label)',
                    value: label,
                    onChange: setLabel,
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
                        <span style={{ fontSize: '0.875rem' }}>Connexion par mot de passe</span>
                        <Divider orientation="horizontal" label={label || undefined} />
                        <span style={{ fontSize: '0.875rem' }}>Connexion avec Google</span>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 60 }}>
                        <span style={{ fontSize: '0.875rem' }}>Option A</span>
                        <Divider orientation="vertical" label={label || undefined} />
                        <span style={{ fontSize: '0.875rem' }}>Option B</span>
                    </div>
                )}
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Divider',
    description: 'Labeled or unlabeled rule for separating adjacent product content.',
    importCode: "import { Divider } from '@monority/ui'",
    usageCode: '<Divider />',
    preview: () => <DividerPlayground />,
    examples: [
        { title: 'With label', content: <DividerWithLabelExample /> },
        { title: 'Vertical', content: <DividerVerticalExample /> },
    ],
    props: [
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Axis of the divider.',
        },
        {
            name: 'label',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Optional centered label.',
        },
    ],
    cssHooks: ['.mr-divider', '.mr-divider__label', '[data-orientation="vertical"]'],
    tokens: [
        '--mr-divider-color',
        '--mr-divider-label-bg',
        '--mr-text-secondary',
        '--mr-font-size-xs',
    ],
    a11y: [
        'Uses role="separator" with aria-orientation.',
        'Keep labels short and avoid using dividers as the only section label.',
    ],
}

export function DividerDocs() {
    return <DocPage doc={docData} />
}
