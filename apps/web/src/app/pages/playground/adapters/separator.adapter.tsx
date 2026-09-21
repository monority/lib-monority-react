import { Separator } from '@monority/ui/separator'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = { orientation: 'horizontal', decorative: true }

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.orientation !== 'horizontal')
        lines.push(`  orientation="${String(props.orientation)}"`)
    if (props.decorative === false) lines.push('  decorative={false}')
    if (lines.length === 0) return '<Separator />'
    return `<Separator\n${lines.join('\n')}\n/>`
}

export const separatorPlayground: PlaygroundDefinition = {
    slug: 'separator',
    label: 'Separator',
    docsPath: '/docs/separator',
    importStatement: "import { Separator } from '@monority/ui/separator'",
    controls: [
        { name: 'orientation', type: 'select', options: ['horizontal', 'vertical'] },
        { name: 'decorative', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <div
            style={
                props.orientation === 'vertical'
                    ? { display: 'flex', minHeight: '4rem', width: '100%' }
                    : { width: '100%' }
            }
        >
            <Separator
                orientation={props.orientation as 'horizontal'}
                decorative={props.decorative === true}
            />
        </div>
    ),
    generateCode: codeFor,
}
