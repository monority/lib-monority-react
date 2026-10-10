import { BadgeDelta } from '@monority/ui/badge-delta'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    deltaType: 'increase',
    size: 'md',
    isIncreasePositive: true,
    children: '+12.5%',
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.deltaType && props.deltaType !== 'increase') {
        lines.push(`  deltaType="${String(props.deltaType)}"`)
    }
    if (props.size && props.size !== 'md') {
        lines.push(`  size="${String(props.size)}"`)
    }
    if (props.isIncreasePositive === false) {
        lines.push('  isIncreasePositive={false}')
    }
    const children = String(props.children ?? '+12.5%')
    if (lines.length === 0) {
        return `<BadgeDelta>${children}</BadgeDelta>`
    }
    return `<BadgeDelta\n${lines.join('\n')}\n>${children}</BadgeDelta>`
}

export const badgeDeltaPlayground: PlaygroundDefinition = {
    slug: 'badge-delta',
    label: 'BadgeDelta',
    docsPath: '/docs/badge-delta',
    importStatement: "import { BadgeDelta } from '@monority/ui/badge-delta'",
    controls: [
        {
            name: 'deltaType',
            type: 'select',
            options: [
                'increase',
                'moderate-increase',
                'decrease',
                'moderate-decrease',
                'unchanged',
            ],
        },
        {
            name: 'size',
            type: 'select',
            options: ['sm', 'md', 'lg'],
        },
        {
            name: 'isIncreasePositive',
            type: 'boolean',
        },
        {
            name: 'children',
            type: 'text',
            placeholder: '+12.5%',
        },
    ],
    defaultProps: defaults,
    render: (props) => (
        <BadgeDelta
            deltaType={props.deltaType as 'increase'}
            size={props.size as 'md'}
            isIncreasePositive={Boolean(props.isIncreasePositive)}
        >
            {String(props.children ?? '+12.5%')}
        </BadgeDelta>
    ),
    generateCode: codeFor,
}
