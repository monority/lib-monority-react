import { Progress } from '@monority/ui/progress'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    label: 'Release migration',
    value: 68,
    tone: 'neutral',
    mode: 'determinate',
    showValue: true,
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.label) lines.push(`  label="${String(props.label)}"`)
    if (props.mode !== 'indeterminate' && typeof props.value === 'number')
        lines.push(`  value={${props.value}}`)
    if (props.tone !== 'neutral') lines.push(`  tone="${String(props.tone)}"`)
    if (props.mode !== 'determinate') lines.push(`  mode="${String(props.mode)}"`)
    if (props.showValue === false) lines.push('  showValue={false}')
    if (lines.length === 0) return '<Progress />'
    return `<Progress\n${lines.join('\n')}\n/>`
}

function ProgressPreview(props: PlaygroundProps) {
    const indeterminate = props.mode === 'indeterminate'
    return (
        <div style={{ width: '100%' }}>
            <Progress
                label={String(props.label ?? '') || undefined}
                value={typeof props.value === 'number' ? props.value : 0}
                tone={props.tone as 'neutral'}
                mode={indeterminate ? 'indeterminate' : 'determinate'}
                showValue={props.showValue !== false}
            />
        </div>
    )
}

export const progressPlayground: PlaygroundDefinition = {
    slug: 'progress',
    label: 'Progress',
    docsPath: '/docs/progress',
    importStatement: "import { Progress } from '@monority/ui/progress'",
    controls: [
        { name: 'label', type: 'text', placeholder: 'Release migration' },
        { name: 'value', type: 'number', min: 0, max: 100 },
        { name: 'mode', type: 'select', options: ['determinate', 'indeterminate'] },
        { name: 'tone', type: 'select', options: ['neutral', 'success', 'warning', 'danger'] },
        { name: 'showValue', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => <ProgressPreview {...props} />,
    generateCode: codeFor,
}
