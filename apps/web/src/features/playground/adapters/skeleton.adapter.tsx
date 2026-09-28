import { Skeleton } from '@monority/ui/skeleton'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    size: 'md',
    width: '14rem',
    height: '1rem',
    rounded: false,
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.width) lines.push(`  width="${String(props.width)}"`)
    if (props.height) lines.push(`  height="${String(props.height)}"`)
    if (props.rounded === true) lines.push('  rounded')
    if (lines.length === 0) return '<Skeleton />'
    return `<Skeleton\n${lines.join('\n')}\n/>`
}

export const skeletonPlayground: PlaygroundDefinition = {
    slug: 'skeleton',
    label: 'Skeleton',
    docsPath: '/docs/skeleton',
    importStatement: "import { Skeleton } from '@monority/ui/skeleton'",
    controls: [
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'width', type: 'text', placeholder: '14rem' },
        { name: 'height', type: 'text', placeholder: '1rem' },
        { name: 'rounded', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Skeleton
            size={props.size as 'md'}
            width={String(props.width ?? '') || undefined}
            height={String(props.height ?? '') || undefined}
            rounded={props.rounded === true}
        />
    ),
    generateCode: codeFor,
}
