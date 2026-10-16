import { useState } from 'react'
import { Checkbox } from '@monority/ui/checkbox'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    CheckboxBasicExample,
    CheckboxDisabledExample,
    CheckboxWithErrorExample,
    CheckboxWithDescriptionExample,
    CheckboxIndeterminateExample,
} from './Checkbox.examples'

function CheckboxPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    tone: 'accent' | 'neutral' | 'danger'
    label: string
    hint: string
    disabled: boolean
    indeterminate: boolean
}) {
    const [checked, setChecked] = useState(true)
    return (
        <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
            <Checkbox
                size={props.size}
                tone={props.tone}
                label={props.label}
                hint={props.hint}
                disabled={props.disabled}
                indeterminate={props.indeterminate}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        </div>
    )
}

const checkboxPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        tone: 'accent' | 'neutral' | 'danger'
        label: string
        hint: string
        disabled: boolean
        indeterminate: boolean
    }>
        componentName="Checkbox"
        importCode="import { Checkbox } from '@monority/ui/checkbox'"
        getCode={(p) => {
            const propsStr = [
                `  label="${p.label}"`,
                p.hint ? `  hint="${p.hint}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.tone !== 'accent' ? `  tone="${p.tone}"` : '',
                p.indeterminate ? '  indeterminate' : '',
                p.disabled ? '  disabled' : '',
                '  checked={checked}',
                '  onChange={(e) => setChecked(e.target.checked)}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { Checkbox } from '@monority/ui/checkbox'\n\nconst [checked, setChecked] = useState(true)\n\n<Checkbox\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Libelle (label)',
                defaultValue: 'Recevoir le resume hebdomadaire',
            },
            {
                name: 'hint',
                type: 'text',
                label: 'Indication (hint)',
                defaultValue: 'Synthese envoyee chaque lundi matin par email.',
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
                name: 'indeterminate',
                type: 'boolean',
                label: 'Etat indetermine (dash)',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <CheckboxPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Checkbox',
    description: 'Selection control for independent choices, bulk actions, and optional settings.',
    importCode: "import { Checkbox } from '@monority/ui/checkbox'",
    usageCode: `<Checkbox label="Send weekly summary" />
<Checkbox label="Include failed jobs" defaultChecked />`,
    preview: () => <CheckboxBasicExample />,
    playground: checkboxPlayground,
    examples: [
        { title: 'Disabled', content: <CheckboxDisabledExample /> },
        { title: 'Error state', content: <CheckboxWithErrorExample /> },
        { title: 'With description', content: <CheckboxWithDescriptionExample /> },
        { title: 'Indeterminate', content: <CheckboxIndeterminateExample /> },
    ],
    props: [
        {
            name: 'label',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Checkbox label, rendered next to the control.',
        },
        {
            name: 'hint',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Helpful description below the control.',
        },
        {
            name: 'error',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Error message; also toggles the invalid state.',
        },
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
        '--mr-accent-solid',
        '--mr-accent-contrast',
        '--mr-border-subtle',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-font-size-sm',
        '--mr-checkbox-size',
    ],
    keyboardNavigation: [
        {
            key: 'Space',
            action: 'Bascule l etat coche / decoche de la case.',
            context: 'Case a cocher focalisee',
        },
        {
            key: 'Tab',
            action: 'Passe le focus au champ de formulaire suivant.',
            context: 'Case a cocher focalisee',
        },
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
