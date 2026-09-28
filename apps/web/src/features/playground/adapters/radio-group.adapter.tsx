import { RadioGroup } from '@monority/ui/radio-group'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    label: 'Billing plan',
    hint: '',
    error: '',
    tone: 'accent',
    defaultValue: 'pro',
    disabled: false,
    invalid: false,
}

function codeFor(props: PlaygroundProps): string {
    const lines: string[] = []
    if (props.label) lines.push(`  label="${String(props.label)}"`)
    if (props.hint) lines.push(`  hint="${String(props.hint)}"`)
    if (props.error) lines.push(`  error="${String(props.error)}"`)
    if (props.tone !== 'accent') lines.push(`  tone="${String(props.tone)}"`)
    if (props.defaultValue) lines.push(`  defaultValue="${String(props.defaultValue)}"`)
    if (props.disabled === true) lines.push('  disabled')
    if (props.invalid === true) lines.push('  invalid')
    const open = lines.length === 0 ? '<RadioGroup' : `<RadioGroup\n${lines.join('\n')}`
    return `${open}\n  items={[\n    { value: 'basic', label: 'Basic' },\n    { value: 'pro', label: 'Pro' },\n    { value: 'enterprise', label: 'Enterprise' },\n  ]}\n/>`
}

export const radioGroupPlayground: PlaygroundDefinition = {
    slug: 'radio-group',
    label: 'RadioGroup',
    docsPath: '/docs/radio-group',
    importStatement: "import { RadioGroup } from '@monority/ui/radio-group'",
    controls: [
        { name: 'label', type: 'text', placeholder: 'Billing plan' },
        { name: 'hint', type: 'text', placeholder: 'Billed monthly' },
        { name: 'error', type: 'text', placeholder: 'Select a plan' },
        { name: 'tone', type: 'select', options: ['accent', 'neutral', 'danger'] },
        { name: 'defaultValue', type: 'select', options: ['basic', 'pro', 'enterprise'] },
        { name: 'disabled', type: 'boolean' },
        { name: 'invalid', type: 'boolean' },
    ],
    defaultProps: defaults,
    render: (props) => (
        <RadioGroup
            label={String(props.label ?? '') || undefined}
            hint={String(props.hint ?? '') || undefined}
            error={String(props.error ?? '') || undefined}
            tone={props.tone as 'accent'}
            defaultValue={String(props.defaultValue ?? 'pro')}
            disabled={props.disabled === true}
            invalid={props.invalid === true}
            items={[
                { value: 'basic', label: 'Basic' },
                { value: 'pro', label: 'Pro' },
                { value: 'enterprise', label: 'Enterprise' },
            ]}
        />
    ),
    generateCode: codeFor,
}
