import { AspectRatio } from '@monority/ui/aspect-ratio'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { AspectRatioSquareExample, AspectRatioVideoExample } from './AspectRatio.examples'

function AspectRatioPlayground() {
    const [ratioType, setRatioType] = useState<'16/9' | '4/3' | '1/1' | '21/9'>('16/9')

    const ratioValue =
        ratioType === '16/9'
            ? 16 / 9
            : ratioType === '4/3'
              ? 4 / 3
              : ratioType === '1/1'
                ? 1
                : 21 / 9

    const snippet = `<AspectRatio ratio={${ratioType}}>
  <div style={{ background: 'var(--mr-accent-subtle)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Format ${ratioType}
  </div>
</AspectRatio>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Format (ratio)',
                    value: ratioType,
                    options: [
                        { value: '16/9', label: '16:9 (Vidéo standard)' },
                        { value: '4/3', label: '4:3 (Photo classique)' },
                        { value: '1/1', label: '1:1 (Carré)' },
                        { value: '21/9', label: '21:9 (Panoramique cinéma)' },
                    ],
                    onChange: (v) => setRatioType(v as '16/9' | '4/3' | '1/1' | '21/9'),
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: 360,
                    margin: '0 auto',
                    border: '1px solid var(--mr-border-subtle, #e2e8f0)',
                    borderRadius: 8,
                    overflow: 'hidden',
                }}
            >
                <AspectRatio ratio={ratioValue}>
                    <div
                        style={{
                            background: 'var(--mr-accent-subtle, #e0e7ff)',
                            color: 'var(--mr-text-primary, #1e1b4b)',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                        }}
                    >
                        Ratio {ratioType}
                    </div>
                </AspectRatio>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'AspectRatio',
    description:
        'Maintains a fixed aspect ratio for child content using the CSS padding-bottom trick.',
    importCode: "import { AspectRatio } from '@monority/ui'",
    usageCode: `<AspectRatio ratio={16 / 9}>
  <img src="/image.jpg" alt="Content" />
</AspectRatio>`,
    preview: () => <AspectRatioPlayground />,
    examples: [
        { title: 'Video embed (16/9)', content: <AspectRatioVideoExample /> },
        { title: 'Square (1/1)', content: <AspectRatioSquareExample /> },
    ],
    props: [
        {
            name: 'ratio',
            type: 'number',
            defaultValue: '16 / 9',
            description: 'Aspect ratio as width/height.',
        },
    ],
    cssHooks: ['.mr-aspect-ratio', '.mr-aspect-ratio__content'],
    tokens: [],
    a11y: [
        'Structural layout component.',
        'No interactive semantics by default.',
        'Ensure child content has appropriate accessible names.',
    ],
}

export function AspectRatioDocs() {
    return <DocPage doc={docData} />
}
