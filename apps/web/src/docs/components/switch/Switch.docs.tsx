import { DocPage, type DocPageData } from '../DocPage'
import {
    SwitchBasicExample,
    SwitchSizesExample,
    SwitchTonesExample,
    SwitchWithErrorExample,
} from './Switch.examples'

const docData: DocPageData = {
    title: 'Switch',
    description: 'Immediate on/off control for persistent settings and feature flags.',
    importCode: "import { Switch } from '@monority/ui'",
    usageCode: `const [checked, setChecked] = useState(false)

<Switch
  label="Deployment alerts"
  checked={checked}
  onChange={() => setChecked(!checked)}
/>`,
    preview: () => <SwitchBasicExample />,
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
            description: 'Controlled checked state.',
        },
        {
            name: 'defaultChecked',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Default checked state.',
        },
        { name: 'onChange', type: `function`, defaultValue: '-', description: 'Change callback.' },
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
            name: 'className',
            type: `string`,
            defaultValue: '-',
            description: 'Additional class name.',
        },
    ],
    cssHooks: [
        '.mr-switch',
        '.mr-switch--sm',
        '.mr-switch--md',
        '.mr-switch--lg',
        '.mr-switch--accent',
        '.mr-switch--neutral',
        '.mr-switch--danger',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
        '[data-checked]',
        '[data-tone]',
    ],
    tokens: [
        '--mr-accent',
        '--mr-accent-contrast',
        '--mr-danger',
        '--mr-border-subtle',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-text-sm',
        '--mr-radius-full',
        '--mr-dur-200',
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
