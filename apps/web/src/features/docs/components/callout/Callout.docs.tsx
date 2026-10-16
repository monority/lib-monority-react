import { Callout } from '@monority/ui/callout'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    CalloutBasicExample,
    CalloutTonesExample,
    CalloutWithChildrenExample,
} from './Callout.examples'

function CalloutPlaygroundDemo(props: {
    tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    title: string
    description: string
}) {
    return (
        <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
            <Callout tone={props.tone} title={props.title} description={props.description} />
        </div>
    )
}

const calloutPlayground = (
    <ComponentPlayground<{
        tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
        title: string
        description: string
    }>
        componentName="Callout"
        importCode="import { Callout } from '@monority/ui/callout'"
        getCode={(p) => {
            const toneProp = p.tone !== 'neutral' ? ` tone="${p.tone}"` : ''
            return `import { Callout } from '@monority/ui/callout'\n\n<Callout${toneProp} title="${p.title}" description="${p.description}" />`
        }}
        controls={[
            {
                name: 'title',
                type: 'text',
                label: 'Titre de l encart',
                defaultValue: 'Synchronisation des donnees',
            },
            {
                name: 'description',
                type: 'text',
                label: 'Description',
                defaultValue:
                    'La reindexation s execute en arriere-plan sans interruption de service.',
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Tonalite visuelle',
                defaultValue: 'info',
                options: [
                    { value: 'neutral', label: 'Neutral' },
                    { value: 'info', label: 'Info' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
        ]}
        render={(props) => <CalloutPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Callout',
    description:
        'Styled callout box for notes, tips, and contextual highlights. Use for explanatory content inline with surrounding content.',
    importCode: "import { Callout } from '@monority/ui/callout'",
    usageCode: `<Callout
  title="Migration"
  description="Background sync will pause briefly while records are reindexed."
  tone="info"
/>`,
    preview: () => <CalloutBasicExample />,
    playground: calloutPlayground,
    examples: [
        { title: 'Tones', content: <CalloutTonesExample /> },
        { title: 'With children', content: <CalloutWithChildrenExample /> },
    ],
    props: [
        { name: 'title', type: `ReactNode`, defaultValue: '-', description: 'Callout title.' },
        {
            name: 'description',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Callout description.',
        },
        {
            name: 'tone',
            type: `'neutral' | 'info' | 'success' | 'warning' | 'danger'`,
            defaultValue: "'neutral'",
            description: 'Visual tone.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Custom content rendered below title and description.',
        },
        {
            name: 'role',
            type: "'note' | 'alert' | 'status' | string",
            defaultValue: "'note'",
            description: 'ARIA landmark role. Use "alert" for time-sensitive messages.',
        },
    ],
    cssHooks: [
        '.mr-callout',
        '.mr-callout__indicator',
        '.mr-callout__content',
        '.mr-callout__title',
        '.mr-callout__description',
        '[data-tone]',
    ],
    tokens: [
        '--mr-border-strong',
        '--mr-border-subtle',
        '--mr-bg-raised',
        '--mr-font-size-sm',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-info',
        '--mr-success',
        '--mr-warning',
        '--mr-danger',
    ],
    a11y: [
        'Default role is "note".',
        'For time-critical errors use role="alert" or role="status".',
        'Heading structure is preserved.',
    ],
}

export function CalloutDocs() {
    return <DocPage doc={docData} />
}
