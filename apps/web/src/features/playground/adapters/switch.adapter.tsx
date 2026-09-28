import { useState } from 'react'
import { Switch } from '@monority/ui/switch'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    label: 'Enable notifications',
    hint: 'Send alerts when checks fail.',
    error: '',
    tone: 'accent',
    size: 'md',
    defaultChecked: true,
    disabled: false,
    invalid: false,
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.label) lines.push(`  label="${String(props.label)}"`)
    if (props.hint) lines.push(`  hint="${String(props.hint)}"`)
    if (props.error) lines.push(`  error="${String(props.error)}"`)
    if (props.tone !== 'accent') lines.push(`  tone="${String(props.tone)}"`)
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.defaultChecked === true) lines.push('  defaultChecked')
    if (props.disabled === true) lines.push('  disabled')
    if (props.invalid === true) lines.push('  invalid')
    if (lines.length === 0) return '<Switch />'
    return `<Switch\n${lines.join('\n')}\n/>`
}

function SwitchPreview(props: PlaygroundProps) {
    const [checked, setChecked] = useState(props.defaultChecked === true)
    return (
        <Switch
            label={String(props.label ?? '') || undefined}
            hint={String(props.hint ?? '') || undefined}
            error={String(props.error ?? '') || undefined}
            tone={props.tone as 'accent'}
            size={props.size as 'md'}
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
            disabled={props.disabled === true}
            invalid={props.invalid === true}
        />
    )
}

export const switchPlayground: PlaygroundDefinition = {
    slug: 'switch',
    label: 'Switch',
    docsPath: '/docs/switch',
    importStatement: "import { Switch } from '@monority/ui/switch'",
    controls: [
        { name: 'label', type: 'text', placeholder: 'Enable notifications' },
        { name: 'hint', type: 'text', placeholder: 'Send alerts when checks fail.' },
        { name: 'error', type: 'text', placeholder: 'Required by policy' },
        { name: 'tone', type: 'select', options: ['accent', 'neutral', 'danger'] },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'defaultChecked', type: 'boolean', label: 'defaultChecked (initial)' },
        { name: 'disabled', type: 'boolean' },
        { name: 'invalid', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => <SwitchPreview key={String(props.defaultChecked === true)} {...props} />,
    generateCode: codeFor,
}
