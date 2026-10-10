import { Popover } from '@monority/ui/popover'
import { Button } from '@monority/ui/button'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    align: 'center',
    side: 'bottom',
}

function PopoverDemo(props: PlaygroundProps) {
    return (
        <Popover
            trigger={<Button variant="secondary">Ouvrir le Popover</Button>}
            align={props.align as 'center' | 'start' | 'end'}
            side={props.side as 'bottom' | 'top'}
        >
            <div style={{ display: 'grid', gap: '0.5rem', minWidth: '180px' }}>
                <strong style={{ fontSize: '0.875rem' }}>Panneau contextuel</strong>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--mr-fg-muted)' }}>
                    Surface ancree au declencheur avec alignement parametrable.
                </p>
            </div>
        </Popover>
    )
}

function codeFor(props: PlaygroundProps): string {
    return `<Popover trigger={<Button>Ouvrir</Button>} align="${String(props.align ?? 'center')}" side="${String(props.side ?? 'bottom')}">\n  <div>Contenu du Popover</div>\n</Popover>`
}

export const popoverPlayground: PlaygroundDefinition = {
    slug: 'popover',
    label: 'Popover',
    docsPath: '/docs/popover',
    importStatement: "import { Popover } from '@monority/ui/popover'",
    controls: [
        { name: 'align', type: 'select', options: ['start', 'center', 'end'] },
        { name: 'side', type: 'select', options: ['bottom', 'top'] },
    ],
    defaultProps: defaults,
    render: (props) => <PopoverDemo {...props} />,
    generateCode: codeFor,
}
