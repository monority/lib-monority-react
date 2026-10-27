import { Separator } from '@monority/ui/separator'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { SeparatorDecorativeExample, SeparatorVerticalExample } from './Separator.examples'
import { separatorI18n } from './Separator.messages'

function SeparatorPlayground() {
    const { locale } = useLocale()
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
    const [decorative, setDecorative] = useState(false)

    const snippet = `<Separator
  orientation="${orientation}"${decorative ? '\n  decorative' : ''}
/>`

    const isFr = locale === 'fr'

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: isFr ? 'Orientation' : 'Orientation',
                    value: orientation,
                    options: [
                        { value: 'horizontal', label: isFr ? 'Horizontale' : 'Horizontal' },
                        { value: 'vertical', label: isFr ? 'Verticale' : 'Vertical' },
                    ],
                    onChange: (v) => setOrientation(v as 'horizontal' | 'vertical'),
                },
                {
                    type: 'boolean',
                    label: isFr
                        ? 'Purement décoratif (decorative)'
                        : 'Purely decorative (decorative)',
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
                        <span style={{ fontSize: '0.875rem' }}>
                            {isFr ? 'Section supérieure' : 'Upper section'}
                        </span>
                        <Separator orientation="horizontal" decorative={decorative} />
                        <span style={{ fontSize: '0.875rem' }}>
                            {isFr ? 'Section inférieure' : 'Lower section'}
                        </span>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 60 }}>
                        <span style={{ fontSize: '0.875rem' }}>{isFr ? 'Gauche' : 'Left'}</span>
                        <Separator orientation="vertical" decorative={decorative} />
                        <span style={{ fontSize: '0.875rem' }}>{isFr ? 'Droite' : 'Right'}</span>
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
    i18n: separatorI18n,
}

export function SeparatorDocs() {
    return <DocPage doc={docData} />
}
