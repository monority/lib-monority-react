import { Badge } from '@monority/ui/badge'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = { variant: 'default', children: 'Draft' }

function codeFor(props: PlaygroundProps): string {
    const children = String(props.children ?? 'Draft')
    if (props.variant === 'default' || !props.variant) return `<Badge>${children}</Badge>`
    return `<Badge variant="${String(props.variant)}">${children}</Badge>`
}

export const badgePlayground: PlaygroundDefinition = {
    slug: 'badge',
    label: 'Badge',
    docsPath: '/docs/badge',
    importStatement: "import { Badge } from '@monority/ui/badge'",
    controls: [
        {
            name: 'variant',
            type: 'select',
            options: ['default', 'primary', 'success', 'danger', 'warning'],
        },
        { name: 'children', type: 'text', placeholder: 'Draft' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Badge variant={props.variant as 'default'}>{String(props.children ?? 'Draft')}</Badge>
    ),
    generateCode: codeFor,
}
