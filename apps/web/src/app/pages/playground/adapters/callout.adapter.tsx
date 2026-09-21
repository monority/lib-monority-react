import { Callout } from '@monority/ui/callout'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    tone: 'info',
    title: 'New docs search',
    description: 'Rolling out gradually across teams.',
    role: 'note',
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.tone !== 'neutral') lines.push(`  tone="${String(props.tone)}"`)
    if (props.title) lines.push(`  title="${String(props.title)}"`)
    if (props.description) lines.push(`  description="${String(props.description)}"`)
    if (props.role !== 'note') lines.push(`  role="${String(props.role)}"`)
    if (lines.length === 0) return '<Callout />'
    return `<Callout\n${lines.join('\n')}\n/>`
}

export const calloutPlayground: PlaygroundDefinition = {
    slug: 'callout',
    label: 'Callout',
    docsPath: '/docs/callout',
    importStatement: "import { Callout } from '@monority/ui/callout'",
    controls: [
        {
            name: 'tone',
            type: 'select',
            options: ['neutral', 'info', 'success', 'warning', 'danger'],
        },
        { name: 'title', type: 'text', placeholder: 'New docs search' },
        { name: 'description', type: 'text', placeholder: 'Rolling out gradually.' },
        { name: 'role', type: 'select', options: ['note', 'alert', 'status'] },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Callout
            tone={props.tone as 'info'}
            title={String(props.title ?? '') || undefined}
            description={String(props.description ?? '') || undefined}
            role={String(props.role ?? 'note')}
        />
    ),
    generateCode: codeFor,
}
