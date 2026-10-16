import { useState } from 'react'
import { ScrollArea } from '@monority/ui/scroll-area'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    ScrollAreaBasicExample,
    ScrollAreaBothExample,
    ScrollAreaHideScrollbarExample,
    ScrollAreaHorizontalExample,
} from './ScrollArea.examples'

function ScrollAreaPlayground() {
    const [orientation, setOrientation] = useState<'vertical' | 'horizontal' | 'both'>('vertical')
    const [hideScrollbar, setHideScrollbar] = useState(false)

    const snippet = `<ScrollArea
  orientation="${orientation}"${hideScrollbar ? '\n  hideScrollbar' : ''}
  style={{ maxHeight: 180 }}
>
  ...
</ScrollArea>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Direction de défilement',
                    value: orientation,
                    options: [
                        { value: 'vertical', label: 'Vertical' },
                        { value: 'horizontal', label: 'Horizontal' },
                        { value: 'both', label: 'Les deux (both)' },
                    ],
                    onChange: (v) => setOrientation(v as 'vertical' | 'horizontal' | 'both'),
                },
                {
                    type: 'boolean',
                    label: 'Masquer la barre visuelle',
                    value: hideScrollbar,
                    onChange: setHideScrollbar,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: 440,
                    margin: '0 auto',
                    border: '1px solid var(--mr-border-subtle, #e2e8f0)',
                    borderRadius: 8,
                    padding: 8,
                }}
            >
                <ScrollArea
                    orientation={orientation}
                    hideScrollbar={hideScrollbar}
                    style={{
                        maxHeight: 160,
                        maxWidth: orientation === 'horizontal' ? 360 : undefined,
                    }}
                >
                    {orientation === 'horizontal' ? (
                        <div style={{ display: 'flex', gap: 12, padding: 8, width: 800 }}>
                            {Array.from({ length: 8 }, (_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        minWidth: 120,
                                        padding: 16,
                                        background: 'var(--mr-bg-sunken, #f8fafc)',
                                        borderRadius: 6,
                                        textAlign: 'center',
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    Carte {i + 1}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 8 }}
                        >
                            {Array.from({ length: 10 }, (_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: '8px 12px',
                                        background: 'var(--mr-bg-sunken, #f8fafc)',
                                        borderRadius: 6,
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    Journal d’événement système #{100 + i} — Déploiement synchronisé
                                    avec succès
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'ScrollArea',
    description:
        'A styled scrollable container with custom scrollbar styling and orientation control.',
    importCode: "import { ScrollArea } from '@monority/ui'",
    usageCode: `<ScrollArea orientation="vertical" style={{ maxHeight: 200 }}>
  <p>Recent release activity...</p>
</ScrollArea>`,
    preview: () => <ScrollAreaPlayground />,
    examples: [
        { title: 'Horizontal scroll', content: <ScrollAreaHorizontalExample /> },
        { title: 'Both directions', content: <ScrollAreaBothExample /> },
        { title: 'Hide scrollbar', content: <ScrollAreaHideScrollbarExample /> },
    ],
    props: [
        {
            name: 'orientation',
            type: "'both' | 'vertical' | 'horizontal'",
            defaultValue: "'vertical'",
            description: 'Scroll direction.',
        },
        {
            name: 'hideScrollbar',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Visually hides scrollbar while keeping scrollable.',
        },
    ],
    cssHooks: [
        '.mr-scroll-area',
        '.mr-scroll-area--vertical',
        '.mr-scroll-area--horizontal',
        '.mr-scroll-area--both',
        '.mr-scroll-area--hide',
        '[data-orientation]',
    ],
    tokens: ['--mr-border-subtle', '--mr-border-strong', '--mr-radius-full'],
    a11y: [
        'Uses native scroll behavior with overflow.',
        'Scrollbar is styled but remains accessible.',
        'hideScrollbar removes the visual scrollbar, so make sure the content still reads as scrollable.',
    ],
}

export function ScrollAreaDocs() {
    return <DocPage doc={docData} />
}
