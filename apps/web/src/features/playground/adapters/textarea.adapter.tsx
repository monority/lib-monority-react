import { Textarea } from '@monority/ui/textarea'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    label: 'Description',
    placeholder: 'Enter your description...',
    hint: '',
    error: '',
    tone: 'neutral',
    size: 'md',
    resize: 'vertical',
    invalid: false,
    disabled: false,
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.label) lines.push(`  label="${String(props.label)}"`)
    if (props.placeholder) lines.push(`  placeholder="${String(props.placeholder)}"`)
    if (props.hint) lines.push(`  hint="${String(props.hint)}"`)
    if (props.error) lines.push(`  error="${String(props.error)}"`)
    if (props.tone !== 'neutral') lines.push(`  tone="${String(props.tone)}"`)
    if (props.size !== 'md') lines.push(`  size="${String(props.size)}"`)
    if (props.resize !== 'vertical') lines.push(`  resize="${String(props.resize)}"`)
    if (props.invalid === true) lines.push('  invalid')
    if (props.disabled === true) lines.push('  disabled')
    if (lines.length === 0) return '<Textarea />'
    return `<Textarea\n${lines.join('\n')}\n/>`
}

export const textareaPlayground: PlaygroundDefinition = {
    slug: 'textarea',
    label: 'Textarea',
    docsPath: '/docs/textarea',
    importStatement: "import { Textarea } from '@monority/ui/textarea'",
    controls: [
        { name: 'label', type: 'text', placeholder: 'Description' },
        { name: 'placeholder', type: 'text', placeholder: 'Enter your description...' },
        { name: 'hint', type: 'text', placeholder: 'Shown below the field' },
        { name: 'error', type: 'text', placeholder: 'Bio must be at least 10 characters' },
        { name: 'tone', type: 'select', options: ['neutral', 'accent', 'danger'] },
        { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        { name: 'resize', type: 'select', options: ['none', 'vertical', 'both'] },
        { name: 'invalid', type: 'boolean' },
        { name: 'disabled', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <Textarea
            label={String(props.label ?? '') || undefined}
            placeholder={String(props.placeholder ?? '')}
            hint={String(props.hint ?? '') || undefined}
            error={String(props.error ?? '') || undefined}
            tone={props.tone as 'neutral'}
            size={props.size as 'md'}
            resize={props.resize as 'vertical'}
            invalid={props.invalid === true}
            disabled={props.disabled === true}
        />
    ),
    generateCode: codeFor,
}
