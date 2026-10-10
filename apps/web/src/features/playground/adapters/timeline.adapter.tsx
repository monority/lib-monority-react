import { Timeline } from '@monority/ui/timeline'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const sampleItems = [
    {
        title: 'Conception initiale',
        date: '2026-01-10',
        description: 'Definition des tokens et specifications graphiques.',
        status: 'success' as const,
    },
    {
        title: 'Developpement',
        date: '2026-02-15',
        description: 'Implementation des composants et des recettes CSS.',
        status: 'in-progress' as const,
    },
    {
        title: 'Publication v1',
        date: '2026-03-01',
        description: 'Deploiement de la version de production.',
        status: 'default' as const,
    },
]

const defaults: PlaygroundProps = {
    orientation: 'vertical',
}

function TimelineDemo(props: PlaygroundProps) {
    return (
        <Timeline
            orientation={props.orientation as 'vertical' | 'horizontal'}
            items={sampleItems}
        />
    )
}

function codeFor(props: PlaygroundProps): string {
    return `<Timeline orientation="${String(props.orientation ?? 'vertical')}" items={items} />`
}

export const timelinePlayground: PlaygroundDefinition = {
    slug: 'timeline',
    label: 'Timeline',
    docsPath: '/docs/timeline',
    importStatement: "import { Timeline } from '@monority/ui/timeline'",
    controls: [
        {
            name: 'orientation',
            type: 'select',
            options: ['vertical', 'horizontal'],
        },
    ],
    defaultProps: defaults,
    render: (props) => <TimelineDemo {...props} />,
    generateCode: codeFor,
}
