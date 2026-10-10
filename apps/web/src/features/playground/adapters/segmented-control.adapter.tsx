import { useState } from 'react'
import { SegmentedControl } from '@monority/ui/segmented-control'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const sampleOptions = [
    { value: 'preview', label: 'Apercu' },
    { value: 'code', label: 'Code source' },
    { value: 'tests', label: 'Tests' },
]

const defaults: PlaygroundProps = {
    size: 'md',
    fullWidth: false,
    disabled: false,
}

function SegmentedControlDemo(props: PlaygroundProps) {
    const [val, setVal] = useState('preview')

    return (
        <SegmentedControl
            options={sampleOptions}
            value={val}
            onChange={setVal}
            size={props.size as 'sm' | 'md' | 'lg'}
            fullWidth={Boolean(props.fullWidth)}
            disabled={Boolean(props.disabled)}
        />
    )
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    lines.push('  options={options}')
    lines.push('  value={selected}')
    lines.push('  onChange={setSelected}')
    if (props.size && props.size !== 'md') {
        lines.push(`  size="${String(props.size)}"`)
    }
    if (props.fullWidth === true) {
        lines.push('  fullWidth')
    }
    if (props.disabled === true) {
        lines.push('  disabled')
    }
    return `<SegmentedControl\n${lines.join('\n')}\n/>`
}

export const segmentedControlPlayground: PlaygroundDefinition = {
    slug: 'segmented-control',
    label: 'SegmentedControl',
    docsPath: '/docs/segmented-control',
    importStatement: "import { SegmentedControl } from '@monority/ui/segmented-control'",
    controls: [
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'fullWidth', type: 'boolean' },
        { name: 'disabled', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => <SegmentedControlDemo {...props} />,
    generateCode: codeFor,
}
