import { DocPage, type DocPageData } from '../DocPage'
import {
    CheckboxBasicExample,
    CheckboxDisabledExample,
    CheckboxWithErrorExample,
    CheckboxWithDescriptionExample,
    CheckboxIndeterminateExample,
} from './Checkbox.examples'

const docData: DocPageData = {
    title: 'Checkbox',
    description: 'Selection control for independent choices, bulk actions, and optional settings.',
    importCode: "import { Checkbox } from '@monority/ui'",
    usageCode: `<Checkbox label="Send weekly summary" />
<Checkbox label="Include failed jobs" defaultChecked />`,
    preview: () => <CheckboxBasicExample />,
    examples: [
        { title: 'Disabled', content: <CheckboxDisabledExample /> },
        { title: 'Error state', content: <CheckboxWithErrorExample /> },
        { title: 'With description', content: <CheckboxWithDescriptionExample /> },
        { title: 'Indeterminate', content: <CheckboxIndeterminateExample /> },
    ],
    props: [
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Checkbox label, rendered next to the control.' },
        { name: 'hint', type: `ReactNode`, defaultValue: '-', description: 'Helpful description below the control.' },
        { name: 'error', type: `ReactNode`, defaultValue: '-', description: 'Error message; also toggles the invalid state.' },
        {
            name: 'checked',
            type: `boolean`,
            defaultValue: '-',
            description: 'Controlled checked state (uncontrolled when omitted).',
        },
        {
            name: 'defaultChecked',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Initial checked state when uncontrolled.',
        },
        { name: 'onChange', type: `function`, defaultValue: '-', description: 'Change callback.' },
        {
            name: 'indeterminate',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Mixed (dash) state.',
        },
        {
            name: 'invalid',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Marks the input aria-invalid.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disables the checkbox.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator.',
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
            description: 'Control size.',
        },
    ],
    cssHooks: [
        '.mr-checkbox',
        '.mr-checkbox__input',
        '.mr-checkbox__control',
        '.mr-checkbox__label',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
        '[data-checked]',
        '[data-indeterminate]',
    ],
    tokens: [
        '--mr-accent',
        '--mr-accent-contrast',
        '--mr-border-subtle',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-text-sm',
        '--mr-checkbox-size',
    ],
    a11y: [
        'Native checkbox input with an implicit label.',
        'Supports indeterminate mixed state.',
        'Hint and error are wired through aria-describedby.',
        'invalid/error sets aria-invalid.',
        'Visible focus ring on the control via focus-visible.',
    ],
}

export function CheckboxDocs() {
    return <DocPage doc={docData} />
}
