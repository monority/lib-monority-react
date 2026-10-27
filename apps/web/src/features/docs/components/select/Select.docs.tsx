import { Select } from '@monority/ui/select'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { selectI18n } from './Select.messages'
import {
    SelectBasicExample,
    SelectDisabledExample,
    SelectInvalidExample,
    SelectLoadingExample,
    SelectRequiredExample,
    SelectSizesExample,
    SelectWithHintExample,
} from './Select.examples'

function SelectPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    tone: 'neutral' | 'accent' | 'danger'
    label: string
    hint: string
    disabled: boolean
    loading: boolean
    invalid: boolean
}) {
    const [val, setVal] = useState('prod-eu')
    return (
        <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
            <Select
                label={props.label}
                hint={props.hint}
                size={props.size}
                tone={props.tone}
                disabled={props.disabled}
                loading={props.loading}
                invalid={props.invalid}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                data-testid="select-basic"
            >
                <option value="dev">Local development (dev)</option>
                <option value="staging">Pre-production staging (stg)</option>
                <option value="prod-eu">Europe production (eu-west-1)</option>
                <option value="prod-us">Americas production (us-east-1)</option>
                <option value="long">
                    A deliberately long country or region option that must stay clear of the chevron
                </option>
            </Select>
        </div>
    )
}

const selectPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        tone: 'neutral' | 'accent' | 'danger'
        label: string
        hint: string
        disabled: boolean
        loading: boolean
        invalid: boolean
    }>
        componentName="Select"
        importCode="import { Select } from '@monority/ui/select'"
        getCode={(p) => {
            const propsStr = [
                `  label="${p.label}"`,
                p.hint ? `  hint="${p.hint}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.tone !== 'neutral' ? `  tone="${p.tone}"` : '',
                p.disabled ? '  disabled' : '',
                p.loading ? '  loading' : '',
                p.invalid ? '  invalid' : '',
                '  value={value}',
                '  onChange={(e) => setValue(e.target.value)}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { Select } from '@monority/ui/select'\n\nconst [value, setValue] = useState('prod-eu')\n\n<Select\n${propsStr}\n>\n  <option value="dev">Local development (dev)</option>\n  <option value="staging">Pre-production staging (stg)</option>\n  <option value="prod-eu">Europe production (eu-west-1)</option>\n  <option value="prod-us">Americas production (us-east-1)</option>\n</Select>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Label (label)',
                defaultValue: 'Target environment',
            },
            {
                name: 'hint',
                type: 'text',
                label: 'Hint (hint)',
                defaultValue: 'Choose the deployment region',
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
                defaultValue: 'neutral',
                options: [
                    { value: 'neutral', label: 'Neutral' },
                    { value: 'accent', label: 'Accent' },
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
                name: 'loading',
                type: 'boolean',
                label: 'Loading (loading)',
                defaultValue: false,
            },
            {
                name: 'invalid',
                type: 'boolean',
                label: 'Invalid (invalid)',
                defaultValue: false,
            },
        ]}
        render={(props) => <SelectPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Select',
    description:
        'Native select control with a fully styled closed state. Opened option menus use browser and operating-system presentation.',
    importCode: "import { Select } from '@monority/ui/select'",
    usageCode: `<Select label="Country">
  <option value="">Select an option...</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>`,
    preview: () => <SelectBasicExample />,
    playground: selectPlayground,
    examples: [
        { title: 'With hint', content: <SelectWithHintExample /> },
        { title: 'Loading state', content: <SelectLoadingExample /> },
        { title: 'Invalid state', content: <SelectInvalidExample /> },
        { title: 'Disabled', content: <SelectDisabledExample /> },
        { title: 'Required', content: <SelectRequiredExample /> },
        { title: 'Sizes', content: <SelectSizesExample /> },
    ],
    props: [
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Field label' },
        { name: 'hint', type: `ReactNode`, defaultValue: '-', description: 'Helpful description' },
        { name: 'error', type: `ReactNode`, defaultValue: '-', description: 'Error message' },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Input size',
        },
        {
            name: 'tone',
            type: `'neutral' | 'accent' | 'danger'`,
            defaultValue: "'neutral'",
            description: 'Visual tone',
        },
        {
            name: 'value',
            type: `string`,
            defaultValue: '-',
            description: 'Controlled selected value. Use `defaultValue` for uncontrolled mode.',
        },
        {
            name: 'defaultValue',
            type: `string`,
            defaultValue: "''",
            description: 'Uncontrolled initial value.',
        },
        {
            name: 'onChange',
            type: `function`,
            defaultValue: '-',
            description: 'Native change callback. Value is available via `event.target.value`.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator',
        },
        { name: 'disabled', type: `boolean`, defaultValue: 'false', description: 'Disabled state' },
        {
            name: 'loading',
            type: `boolean`,
            defaultValue: 'false',
            description:
                'Async loading indicator that replaces the chevron with a spinner and sets aria-busy.',
        },
        { name: 'invalid', type: `boolean`, defaultValue: 'false', description: 'Invalid state' },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Option and optgroup elements.',
        },
        {
            name: 'className',
            type: `string`,
            defaultValue: '-',
            description: 'Additional class name',
        },
    ],
    cssHooks: [
        '.mr-select-wrapper',
        '.mr-select',
        '.mr-select__spinner',
        '[data-size]',
        '[data-disabled]',
        '[data-loading]',
        '[data-invalid]',
        '[data-tone]',
    ],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-input-height',
        '--mr-input-radius',
        '--mr-font-size-sm',
        '--mr-accent-solid',
        '--mr-danger',
        '--mr-icon-size-sm',
        '--mr-icon-size-md',
        '--mr-border-width',
        '--mr-control-padding-inline-sm',
        '--mr-control-padding-inline-md',
        '--mr-control-padding-inline-lg',
    ],
    keyboardNavigation: [
        {
            key: ['Space', 'Enter'],
            action: 'Opens the native options selection menu.',
            context: 'Focused select',
        },
        {
            key: ['ArrowDown', 'ArrowUp'],
            action: 'Scrolls through the available options and changes the selected value.',
            context: 'Focused select or dropdown menu',
        },
        {
            key: 'Tab',
            action: 'Confirms the active option and moves focus to the next form field.',
            context: 'Focused select',
        },
        {
            key: 'Escape',
            action: 'Closes the native options list without changing the selection.',
            context: 'Open options menu',
        },
    ],
    a11y: [
        'Native form element semantics.',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring.',
        'Associated label for screen readers.',
        'Opened option presentation is controlled by the browser and operating system.',
    ],
    i18n: selectI18n,
}

export function SelectDocs() {
    return <DocPage doc={docData} />
}
