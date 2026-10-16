import { useState } from 'react'
import { Switch } from '@monority/ui/switch'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    SwitchBasicExample,
    SwitchSizesExample,
    SwitchTonesExample,
    SwitchWithErrorExample,
} from './Switch.examples'

function SwitchPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    tone: 'accent' | 'neutral' | 'danger'
    label: string
    hint: string
    disabled: boolean
}) {
    const [checked, setChecked] = useState(true)

    return (
        <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
            <Switch
                size={props.size}
                tone={props.tone}
                label={props.label}
                hint={props.hint}
                disabled={props.disabled}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        </div>
    )
}

const switchPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        tone: 'accent' | 'neutral' | 'danger'
        label: string
        hint: string
        disabled: boolean
    }>
        componentName="Switch"
        importCode="import { Switch } from '@monority/ui/switch'"
        getCode={(p) => {
            const propsStr = [
                `  label="${p.label}"`,
                p.hint ? `  hint="${p.hint}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.tone !== 'accent' ? `  tone="${p.tone}"` : '',
                p.disabled ? '  disabled' : '',
                '  checked={checked}',
                '  onChange={(e) => setChecked(e.target.checked)}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { Switch } from '@monority/ui/switch'\n\nconst [checked, setChecked] = useState(true)\n\n<Switch\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Libelle (label)',
                defaultValue: 'Notifications d analyse',
            },
            {
                name: 'hint',
                type: 'text',
                label: 'Indication (hint)',
                defaultValue: 'Recevoir les alertes d execution par email',
            },
            {
                name: 'size',
                type: 'select',
                label: 'Dimension (size)',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                ],
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Tonalite visuelle',
                defaultValue: 'accent',
                options: [
                    { value: 'accent', label: 'Accent' },
                    { value: 'neutral', label: 'Neutral' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <SwitchPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Switch',
    description: 'Immediate on/off control for persistent settings and feature flags.',
    importCode: "import { Switch } from '@monority/ui/switch'",
    usageCode: `const [checked, setChecked] = useState(false)

<Switch
  label="Deployment alerts"
  checked={checked}
  onChange={() => setChecked(!checked)}
/>`,
    preview: () => <SwitchBasicExample />,
    playground: switchPlayground,
    examples: [
        {
            title: 'Sizes',
            content: <SwitchSizesExample />,
            code: `<Switch size="sm" defaultChecked />
<Switch size="md" defaultChecked />
<Switch size="lg" defaultChecked />`,
        },
        {
            title: 'Tones',
            content: <SwitchTonesExample />,
            code: `<Switch tone="accent" defaultChecked />
<Switch tone="neutral" defaultChecked />
<Switch tone="danger" defaultChecked />`,
        },
        {
            title: 'Error state',
            content: <SwitchWithErrorExample />,
            code: `<Switch invalid error="Approval policy is incomplete." />`,
        },
    ],
    props: [
        {
            name: 'checked',
            type: `boolean`,
            defaultValue: 'false',
            description:
                'Controlled checked state. Omit to use uncontrolled mode with `defaultChecked`.',
        },
        {
            name: 'defaultChecked',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Initial checked state when used uncontrolled.',
        },
        {
            name: 'onChange',
            type: `function`,
            defaultValue: '-',
            description: 'Native change event callback (event.target.checked gives the new state).',
        },
        {
            name: 'label',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Visible switch label.',
        },
        {
            name: 'tone',
            type: `'accent' | 'neutral' | 'danger'`,
            defaultValue: "'accent'",
            description: 'Visual tone.',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Switch size.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disabled state.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator.',
        },
        { name: 'invalid', type: `boolean`, defaultValue: 'false', description: 'Invalid state.' },
        {
            name: 'hint',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Helpful description.',
        },
        {
            name: 'error',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Error message.',
        },
        {
            name: 'className',
            type: `string`,
            defaultValue: '-',
            description: 'Additional class name.',
        },
    ],
    cssHooks: [
        '.mr-switch__row',
        '.mr-switch__content',
        '.mr-switch',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
        '[data-checked]',
        '[data-tone]',
    ],
    tokens: [
        '--mr-accent-solid',
        '--mr-accent-contrast',
        '--mr-danger',
        '--mr-border-subtle',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-font-size-sm',
        '--mr-radius-full',
        '--mr-switch-scale-sm',
        '--mr-switch-scale-lg',
        '--mr-space-4',
        '--mr-duration-fast',
    ],
    keyboardNavigation: [
        {
            key: 'Space',
            action: 'Bascule l interrupteur entre l etat active et desactive.',
            context: 'Switch focalise',
        },
        {
            key: 'Enter',
            action: 'Bascule l interrupteur (si pris en charge par le navigateur ou formulaire).',
            context: 'Switch focalise',
        },
        {
            key: 'Tab',
            action: 'Transfere le focus vers le composant interactif suivant.',
            context: 'Switch focalise',
        },
    ],
    a11y: [
        'Native switch semantics with role="switch".',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring.',
        'Use switches only when the change can apply immediately.',
    ],
}

export function SwitchDocs() {
    return <DocPage doc={docData} />
}
