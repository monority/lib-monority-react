import { Spinner } from '@monority/ui/spinner'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = { size: 'md', tone: 'base' }

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.tone !== 'base') lines.push(`  tone="${String(props.tone)}"`)
    if (lines.length === 0) return '<Spinner />'
    return `<Spinner\n${lines.join('\n')}\n/>`
}

export const spinnerPlayground: PlaygroundDefinition = {
    slug: 'spinner',
    label: 'Spinner',
    docsPath: '/docs/spinner',
    importStatement: "import { Spinner } from '@monority/ui/spinner'",
    controls: [
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'tone', type: 'select', options: ['base', 'muted', 'inverse'] },
    ],
    defaultProps: defaults,
    render: (props) => <Spinner size={props.size as 'md'} tone={props.tone as 'base'} />,
    generateCode: codeFor,
}
