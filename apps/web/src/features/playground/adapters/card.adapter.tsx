import { Card } from '@monority/ui/card'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = { padding: 'md', interactive: false }

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.padding !== 'md') lines.push(`  padding="${String(props.padding)}"`)
    if (props.interactive === true) lines.push('  interactive')
    const open = lines.length === 0 ? '<Card>' : `<Card\n${lines.join('\n')}\n>`
    return `${open}\n  Project health — stable release candidate.\n</Card>`
}

export const cardPlayground: PlaygroundDefinition = {
    slug: 'card',
    label: 'Card',
    docsPath: '/docs/card',
    importStatement: "import { Card } from '@monority/ui/card'",
    controls: [
        { name: 'padding', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'interactive', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Card padding={props.padding as 'md'} interactive={props.interactive === true}>
            <div className="mr-card__header">
                <strong className="mr-card__title">Project health</strong>
                <span>Live</span>
            </div>
            <p className="mr-card__description">Stable release candidate, no blocking issues.</p>
        </Card>
    ),
    generateCode: codeFor,
}
