import { useState } from 'react'
import { Checkbox } from '@monority/ui/checkbox'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    label: 'Send weekly summary',
    hint: '',
    error: '',
    tone: 'accent',
    size: 'md',
    defaultChecked: true,
    disabled: false,
    invalid: false,
    indeterminate: false,
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
    if (props.indeterminate === true) lines.push('  indeterminate')
    if (lines.length === 0) return '<Checkbox />'
    return `<Checkbox\n${lines.join('\n')}\n/>`
}

function CheckboxPreview(props: PlaygroundProps) {
    const [checked, setChecked] = useState(props.defaultChecked === true)
    return (
        <Checkbox
            label={String(props.label ?? '') || undefined}
            hint={String(props.hint ?? '') || undefined}
            error={String(props.error ?? '') || undefined}
            tone={props.tone as 'accent'}
            size={props.size as 'md'}
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
            disabled={props.disabled === true}
            invalid={props.invalid === true}
            indeterminate={props.indeterminate === true}
        />
    )
}

export const checkboxPlayground: PlaygroundDefinition = {
    slug: 'checkbox',
    label: 'Checkbox',
    docsPath: '/docs/checkbox',
    importStatement: "import { Checkbox } from '@monority/ui/checkbox'",
    controls: [
        { name: 'label', type: 'text', placeholder: 'Send weekly summary' },
        { name: 'hint', type: 'text', placeholder: 'Read carefully before accepting.' },
        { name: 'error', type: 'text', placeholder: 'Required before archiving.' },
        { name: 'tone', type: 'select', options: ['accent', 'neutral', 'danger'] },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'defaultChecked', type: 'boolean', label: 'defaultChecked (initial)' },
        { name: 'disabled', type: 'boolean' },
        { name: 'invalid', type: 'boolean' },
        { name: 'indeterminate', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => <CheckboxPreview key={String(props.defaultChecked === true)} {...props} />,
    generateCode: codeFor,
}
