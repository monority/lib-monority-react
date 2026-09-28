import { Select } from '@monority/ui/select'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    label: 'Role',
    hint: 'Who can approve releases.',
    error: '',
    tone: 'neutral',
    size: 'md',
    required: false,
    disabled: false,
    invalid: false,
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.label) lines.push(`  label="${String(props.label)}"`)
    if (props.hint) lines.push(`  hint="${String(props.hint)}"`)
    if (props.error) lines.push(`  error="${String(props.error)}"`)
    if (props.tone !== 'neutral') lines.push(`  tone="${String(props.tone)}"`)
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.required === true) lines.push('  required')
    if (props.disabled === true) lines.push('  disabled')
    if (props.invalid === true) lines.push('  invalid')
    const open = lines.length === 0 ? '<Select>' : `<Select\n${lines.join('\n')}\n>`
    return `${open}\n  <option value="admin">Admin</option>\n  <option value="member">Member</option>\n  <option value="viewer">Viewer</option>\n</Select>`
}

export const selectPlayground: PlaygroundDefinition = {
    slug: 'select',
    label: 'Select',
    docsPath: '/docs/select',
    importStatement: "import { Select } from '@monority/ui/select'",
    controls: [
        { name: 'label', type: 'text', placeholder: 'Role' },
        { name: 'hint', type: 'text', placeholder: 'Who can approve releases.' },
        { name: 'error', type: 'text', placeholder: 'Select a role' },
        { name: 'tone', type: 'select', options: ['neutral', 'accent', 'danger'] },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'required', type: 'boolean' },
        { name: 'disabled', type: 'boolean' },
        { name: 'invalid', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Select
            label={String(props.label ?? '') || undefined}
            hint={String(props.hint ?? '') || undefined}
            error={String(props.error ?? '') || undefined}
            tone={props.tone as 'neutral'}
            size={props.size as 'md'}
            required={props.required === true}
            disabled={props.disabled === true}
            invalid={props.invalid === true}
            defaultValue="member"
        >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="viewer">Viewer</option>
        </Select>
    ),
    generateCode: codeFor,
}
