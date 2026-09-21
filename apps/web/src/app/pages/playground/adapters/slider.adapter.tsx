import { useState } from 'react'
import { Slider } from '@monority/ui/slider'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    label: 'Brightness',
    value: 60,
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    disabled: false,
    size: 'md',
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.label) lines.push(`  label="${String(props.label)}"`)
    // Uncontrolled snippet: the numeric control drives defaultValue so the
    // generated code stays copy-paste valid without inventing a handler.
    if (typeof props.value === 'number') lines.push(`  defaultValue={${props.value}}`)
    if (props.min !== 0) lines.push(`  min={${Number(props.min)}}`)
    if (props.max !== 100) lines.push(`  max={${Number(props.max)}}`)
    if (props.step !== 1) lines.push(`  step={${Number(props.step)}}`)
    if (props.showValue === false) lines.push('  showValue={false}')
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.disabled === true) lines.push('  disabled')
    if (lines.length === 0) return '<Slider />'
    return `<Slider\n${lines.join('\n')}\n/>`
}

function SliderPreview(props: PlaygroundProps) {
    const [internal, setInternal] = useState(
        typeof props.value === 'number' ? props.value : 50,
    )
    return (
        <Slider
            label={String(props.label ?? '') || undefined}
            value={internal}
            onValueChange={setInternal}
            min={Number(props.min ?? 0)}
            max={Number(props.max ?? 100)}
            step={Number(props.step ?? 1)}
            showValue={props.showValue !== false}
            size={props.size as 'md'}
            disabled={props.disabled === true}
        />
    )
}

export const sliderPlayground: PlaygroundDefinition = {
    slug: 'slider',
    label: 'Slider',
    docsPath: '/docs/slider',
    importStatement: "import { Slider } from '@monority/ui/slider'",
    controls: [
        { name: 'label', type: 'text', placeholder: 'Brightness' },
        { name: 'value', type: 'number', label: 'value (initial)', min: 0, max: 100 },
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' },
        { name: 'step', type: 'number', min: 1 },
        { name: 'showValue', type: 'boolean' },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'disabled', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <SliderPreview
            key={`${String(props.value)}|${String(props.min)}|${String(props.max)}|${String(props.step)}`}
            {...props}
        />
    ),
    generateCode: codeFor,
}
