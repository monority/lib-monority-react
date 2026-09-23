import { DocPage, type DocPageData } from '../DocPage'
import {
    CalloutBasicExample,
    CalloutTonesExample,
    CalloutWithChildrenExample,
} from './Callout.examples'

const docData: DocPageData = {
    title: 'Callout',
    description: 'Styled callout box for notes, tips, and contextual highlights. Use for explanatory content inline with surrounding content.',
    importCode: "import { Callout } from '@monority/ui/callout'",
    usageCode: `<Callout
  title="Migration"
  description="Background sync will pause briefly while records are reindexed."
  tone="info"
/>`,
    preview: () => <CalloutBasicExample />,
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
        { name: 'children', type: `ReactNode`, defaultValue: '-', description: 'Custom content rendered below title and description.' },
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
        '.mr-callout--neutral',
        '.mr-callout--info',
        '.mr-callout--success',
        '.mr-callout--warning',
        '.mr-callout--danger',
        '[data-tone]',
    ],
    tokens: [
        '--mr-border-strong',
        '--mr-border-subtle',
        '--mr-bg-surface-strong',
        '--mr-bg-surface-elevated',
        '--mr-shadow-xs',
        '--mr-fg-strong',
        '--mr-fg-base',
        '--mr-text-sm',
        '--mr-radius-md',
        '--mr-info',
        '--mr-success',
        '--mr-warning',
        '--mr-danger',
    ],
    a11y: [
        'Default role="note". Pass role="alert" for time-sensitive notifications.',
        'Color is not the only visual indicator — uses icon indicator by default.',
        'Description and children should provide sufficient context for screen readers.',
    ],
}

export function CalloutDocs() {
    return <DocPage doc={docData} />
}
