import { Input } from '@monority/ui/input'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    label: 'Email',
    placeholder: 'you@company.com',
    hint: 'Use your work email.',
    error: '',
    type: 'text',
    tone: 'neutral',
    size: 'md',
    invalid: false,
    disabled: false,
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.label) lines.push(`  label="${String(props.label)}"`)
    if (props.placeholder) lines.push(`  placeholder="${String(props.placeholder)}"`)
    if (props.hint) lines.push(`  hint="${String(props.hint)}"`)
    if (props.error) lines.push(`  error="${String(props.error)}"`)
    if (props.type !== 'text') lines.push(`  type="${String(props.type)}"`)
    if (props.tone !== 'neutral') lines.push(`  tone="${String(props.tone)}"`)
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.invalid === true) lines.push('  invalid')
    if (props.disabled === true) lines.push('  disabled')
    if (lines.length === 0) return '<Input />'
    return `<Input\n${lines.join('\n')}\n/>`
}

export const inputPlayground: PlaygroundDefinition = {
    slug: 'input',
    label: 'Input',
    docsPath: '/docs/input',
    importStatement: "import { Input } from '@monority/ui/input'",
    controls: [
        { name: 'label', type: 'text', placeholder: 'Email' },
        { name: 'placeholder', type: 'text', placeholder: 'you@company.com' },
        { name: 'hint', type: 'text', placeholder: 'Use your work email.' },
        { name: 'error', type: 'text', placeholder: 'Enter a valid email' },
        {
            name: 'type',
            type: 'select',
            options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number'],
        },
        { name: 'tone', type: 'select', options: ['neutral', 'accent', 'danger'] },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'invalid', type: 'boolean' },
        { name: 'disabled', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Input
            label={String(props.label ?? '') || undefined}
            placeholder={String(props.placeholder ?? '')}
            hint={String(props.hint ?? '') || undefined}
            error={String(props.error ?? '') || undefined}
            type={String(props.type ?? 'text')}
            tone={props.tone as 'neutral'}
            size={props.size as 'md'}
            invalid={props.invalid === true}
            disabled={props.disabled === true}
        />
    ),
    generateCode: codeFor,
}
