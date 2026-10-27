import { RadioGroup } from '@monority/ui/radio-group'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { radioGroupI18n } from './RadioGroup.messages'
import {
    RadioGroupBasicExample,
    RadioGroupChoiceCardExample,
    RadioGroupFieldsetExample,
    RadioGroupInvalidExample,
    RadioGroupWithDescriptionExample,
} from './RadioGroup.examples'

function RadioGroupPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    tone: 'accent' | 'neutral' | 'danger'
    label: string
    hint: string
    disabled: boolean
    invalid: boolean
}) {
    const [value, setValue] = useState('pro')
    const items = [
        {
            value: 'starter',
            label: 'Starter',
            description: 'For personal projects and prototypes.',
        },
        {
            value: 'pro',
            label: 'Professional',
            description: 'Growing teams with advanced collaboration.',
        },
        {
            value: 'enterprise',
            label: 'Enterprise',
            description: 'Dedicated support, SLA, and enhanced security.',
        },
    ]

    return (
        <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
            <RadioGroup
                size={props.size}
                tone={props.tone}
                label={props.label}
                hint={props.hint}
                disabled={props.disabled}
                invalid={props.invalid}
                items={items}
                value={value}
                onChange={setValue}
            />
        </div>
    )
}

const radioGroupPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        tone: 'accent' | 'neutral' | 'danger'
        label: string
        hint: string
        disabled: boolean
        invalid: boolean
    }>
        componentName="RadioGroup"
        importCode="import { RadioGroup } from '@monority/ui/radio-group'"
        getCode={(p) => {
            const propsStr = [
                `  label="${p.label}"`,
                p.hint ? `  hint="${p.hint}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.tone !== 'accent' ? `  tone="${p.tone}"` : '',
                p.disabled ? '  disabled' : '',
                p.invalid ? '  invalid' : '',
                `  items={[\n    { value: 'starter', label: 'Starter', description: 'Personal projects.' },\n    { value: 'pro', label: 'Professional', description: 'Growing teams.' },\n    { value: 'enterprise', label: 'Enterprise', description: 'Dedicated SLA support.' }\n  ]}`,
                '  value={value}',
                '  onChange={setValue}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { RadioGroup } from '@monority/ui/radio-group'\n\nconst [value, setValue] = useState('pro')\n\n<RadioGroup\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Group label',
                defaultValue: 'Subscription plan',
            },
            {
                name: 'hint',
                type: 'text',
                label: 'Hint (hint)',
                defaultValue: 'Annual billing with 2 months free.',
            },
            {
                name: 'size',
                type: 'select',
                label: 'Size (size)',
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
                label: 'Visual tone',
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
                label: 'Disabled (disabled)',
                defaultValue: false,
            },
            {
                name: 'invalid',
                type: 'boolean',
                label: 'Invalid (invalid)',
                defaultValue: false,
            },
        ]}
        render={(props) => <RadioGroupPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'RadioGroup',
    description:
        'Radio button group with label, hint, error, descriptions, and accessible keyboard navigation.',
    importCode: "import { RadioGroup } from '@monority/ui/radio-group'",
    usageCode: `const items = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large', disabled: true },
]

<RadioGroup label="Size" size="md" items={items} />`,
    preview: () => <RadioGroupBasicExample />,
    playground: radioGroupPlayground,
    examples: [
        { title: 'Invalid', content: <RadioGroupInvalidExample /> },
        { title: 'With descriptions', content: <RadioGroupWithDescriptionExample /> },
        { title: 'Choice card style', content: <RadioGroupChoiceCardExample /> },
        { title: 'With Field wrapper', content: <RadioGroupFieldsetExample /> },
    ],
    props: [
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Group label.' },
        {
            name: 'hint',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Helpful description linked via aria-describedby.',
        },
        { name: 'error', type: `ReactNode`, defaultValue: '-', description: 'Error message.' },
        {
            name: 'items',
            type: `RadioItem[]`,
            defaultValue: '[]',
            description: 'Radio options. Each item: { value, label, description?, disabled? }.',
        },
        { name: 'value', type: `string`, defaultValue: '-', description: 'Controlled value.' },
        {
            name: 'defaultValue',
            type: `string`,
            defaultValue: '-',
            description: 'Default value (uncontrolled).',
        },
        {
            name: 'onChange',
            type: `(value: string) => void`,
            defaultValue: '-',
            description: 'Change callback receiving the selected value.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disables the entire group.',
        },
        {
            name: 'invalid',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Manually marks as invalid.',
        },
        {
            name: 'name',
            type: `string`,
            defaultValue: '-',
            description: 'HTML name attribute for the radio inputs.',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: `'md'`,
            description: 'Radio indicator and label density.',
        },
        {
            name: 'tone',
            type: `'accent' | 'neutral' | 'danger'`,
            defaultValue: `'accent'`,
            description: "Visual tone. Use 'danger' alongside error.",
        },
    ],
    cssHooks: [
        '.mr-radio-group',
        '.mr-radio',
        '.mr-radio__input',
        '.mr-radio__control',
        '.mr-radio__dot',
        '.mr-radio__body',
        '.mr-radio__label',
        '.mr-radio__description',
        '[data-tone]',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
        '[data-checked]',
        '[data-required]',
    ],
    tokens: [
        '--mr-accent-solid',
        '--mr-accent-contrast',
        '--mr-danger',
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-bg-surface',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-text-primary',
        '--mr-radius-full',
        '--mr-font-size-xs',
        '--mr-font-size-sm',
        '--mr-text-md',
        '--mr-space-1',
        '--mr-space-2',
        '--mr-space-3',
        '--mr-duration-fast',
        '--mr-ease-standard',
    ],
    keyboardNavigation: [
        {
            key: ['ArrowDown', 'ArrowRight'],
            action: 'Selects and focuses the next radio option.',
            context: 'Radio group (radiogroup)',
        },
        {
            key: ['ArrowUp', 'ArrowLeft'],
            action: 'Selects and focuses the previous radio option.',
            context: 'Radio group (radiogroup)',
        },
        {
            key: 'Space',
            action: 'Activates and checks the currently focused radio option.',
            context: 'Focused radio option',
        },
        {
            key: 'Tab',
            action: 'Moves focus to the next component outside the radio group.',
            context: 'Radio group (radiogroup)',
        },
    ],
    a11y: [
        'Native <input type="radio"> semantics.',
        'role="radiogroup" on the container.',
        'Arrow keys navigate between options.',
        'Visible focus ring via focus-visible.',
        'Associated label for screen readers.',
        'Descriptions linked via aria-describedby.',
        'aria-invalid and data-invalid set on radiogroup when invalid prop is applied.',
    ],
    i18n: radioGroupI18n,
}

export function RadioGroupDocs() {
    return <DocPage doc={docData} />
}
