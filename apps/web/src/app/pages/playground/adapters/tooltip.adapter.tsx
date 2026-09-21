import { Button } from '@monority/ui/button'
import { Tooltip } from '@monority/ui/tooltip'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    content: 'Inspect token details for this workspace.',
    triggerLabel: 'Hover or focus me',
}

function codeFor(props: PlaygroundProps): string {
    return `<Tooltip content="${String(props.content ?? '')}">
  <Button>${String(props.triggerLabel ?? '')}</Button>
</Tooltip>`
}

function TooltipPreview(props: PlaygroundProps) {
    return (
        <div style={{ display: 'grid', gap: '0.75rem', justifyItems: 'start' }}>
            <Tooltip content={String(props.content ?? '')}>
                <Button>{String(props.triggerLabel ?? 'Trigger')}</Button>
            </Tooltip>
            <p className="sc-muted" style={{ margin: 0, fontSize: '0.8125rem' }}>
                Hover with the pointer, focus with Tab, then press Escape to dismiss.
            </p>
        </div>
    )
}

export const tooltipPlayground: PlaygroundDefinition = {
    slug: 'tooltip',
    label: 'Tooltip',
    docsPath: '/docs/tooltip',
    importStatement:
        "import { Tooltip } from '@monority/ui/tooltip'\nimport { Button } from '@monority/ui/button'",
    controls: [
        { name: 'content', type: 'text', placeholder: 'Inspect token details.' },
        { name: 'triggerLabel', type: 'text', placeholder: 'Hover or focus me' },
    ],
    defaultProps: defaults,
    render: (props) => <TooltipPreview {...props} />,
    generateCode: codeFor,
}
