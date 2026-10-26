import { Input } from '@monority/ui/input'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { inputI18n } from './Input.messages'
import {
    InputBasicExample,
    InputClearableExample,
    InputFamilySizesExample,
    InputNumberExample,
    InputPasswordExample,
    InputSearchExample,
} from './Input.examples'

function InputPlaygroundDemo(props: {
    tone: 'neutral' | 'accent' | 'danger'
    size: 'sm' | 'md' | 'lg'
    label: string
    placeholder: string
    hint: string
    disabled: boolean
    invalid: boolean
    clearable: boolean
}) {
    const [value, setValue] = useState('')
    return (
        <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
            <Input
                tone={props.tone}
                size={props.size}
                label={props.label}
                placeholder={props.placeholder}
                hint={props.hint}
                disabled={props.disabled}
                invalid={props.invalid}
                clearable={props.clearable}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClear={() => setValue('')}
            />
        </div>
    )
}

const inputPlayground = (
    <ComponentPlayground<{
        tone: 'neutral' | 'accent' | 'danger'
        size: 'sm' | 'md' | 'lg'
        label: string
        placeholder: string
        hint: string
        disabled: boolean
        invalid: boolean
        clearable: boolean
    }>
        componentName="Input"
        importCode="import { Input } from '@monority/ui/input'"
        getCode={(p) => {
            const propsStr = [
                `  label="${p.label}"`,
                p.placeholder ? `  placeholder="${p.placeholder}"` : '',
                p.hint ? `  hint="${p.hint}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.tone !== 'neutral' ? `  tone="${p.tone}"` : '',
                p.clearable ? '  clearable' : '',
                p.disabled ? '  disabled' : '',
                p.invalid ? '  invalid' : '',
                '  value={value}',
                '  onChange={(e) => setValue(e.target.value)}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { Input } from '@monority/ui/input'\n\nconst [value, setValue] = useState('')\n\n<Input\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                defaultValue: 'Email address',
            },
            {
                name: 'placeholder',
                type: 'text',
                label: 'Placeholder',
                defaultValue: 'nom@entreprise.com',
            },
            {
                name: 'hint',
                type: 'text',
                label: 'Hint',
                defaultValue: 'Use your work address.',
            },
            {
                name: 'size',
                type: 'select',
                label: 'Size',
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
                name: 'clearable',
                type: 'boolean',
                label: 'Clearable',
                defaultValue: true,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled',
                defaultValue: false,
            },
            {
                name: 'invalid',
                type: 'boolean',
                label: 'Invalid',
                defaultValue: false,
            },
        ]}
        render={(props) => <InputPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Input',
    description:
        'Form field primitive with label, hint, error, required, and disabled state hooks. Includes search, number, password, and clearable variants.',
    importCode: "import { Input } from '@monority/ui/input'",
    usageCode: `<Input
  label="Email"
  hint="Use your work email."
  placeholder="you@company.com"
/>`,
    preview: () => <InputBasicExample />,
    playground: inputPlayground,
    examples: [
        { title: 'Search', content: <InputSearchExample /> },
        { title: 'Clearable', content: <InputClearableExample /> },
        { title: 'Number', content: <InputNumberExample /> },
        { title: 'Password', content: <InputPasswordExample /> },
        { title: 'Control sizes', content: <InputFamilySizesExample /> },
    ],
    props: [
        {
            name: 'tone',
            type: `'neutral' | 'accent' | 'danger'`,
            defaultValue: `'neutral'`,
            description: 'Visual tone for border and focus styling.',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: `'md'`,
            description: 'Density variant controlling padding and font size.',
        },
        {
            name: 'invalid',
            type: `boolean`,
            defaultValue: `'false'`,
            description: 'Force invalid visual state independent of error.',
        },
        {
            name: 'id',
            type: `string`,
            defaultValue: `'auto-generated'`,
            description: 'Stable ID for label association and aria hooks.',
        },
        {
            name: 'label',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Visible label rendered through Field.',
        },
        {
            name: 'hint',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Helpful description linked with aria-describedby.',
        },
        {
            name: 'error',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Invalid message and visual error state.',
        },
        {
            name: 'className',
            type: `string`,
            defaultValue: `'-'`,
            description: 'Class hook for the Field wrapper.',
        },
        {
            name: 'inputClassName',
            type: `string`,
            defaultValue: `'-'`,
            description: 'Class hook for input element.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: `'false'`,
            description: 'Marks field as required.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: `'false'`,
            description: 'Disables the input and applies muted styling.',
        },
        {
            name: 'placeholder',
            type: `string`,
            defaultValue: `'-'`,
            description: 'Native placeholder text.',
        },
        {
            name: 'clearable',
            type: `boolean`,
            defaultValue: `'false'`,
            description: 'Adds an accessible clear button when text is entered.',
        },
    ],
    cssHooks: [
        '.mr-field',
        '.mr-field__label',
        '.mr-field__hint',
        '.mr-field__error',
        '.mr-input',
        '.mr-input__clear',
        '[data-size]',
        '[data-tone]',
        '[data-invalid]',
        '[data-required]',
        '[data-disabled]',
    ],
    tokens: [
        '--mr-text-md',
        '--mr-font-size-xs',
        '--mr-accent-solid',
        '--mr-input-width',
        '--mr-input-height',
        '--mr-input-radius',
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-shadow-xs',
        '--mr-shadow-focus',
        '--mr-duration-fast',
        '--mr-ease-standard',
        '--mr-danger',
    ],
    keyboardNavigation: [
        {
            key: 'Tab',
            action: 'Moves focus into or out of the input field.',
            context: 'Input field',
        },
        {
            key: 'Escape',
            action: 'Resets the text input when the field is clearable.',
            context: 'Field with a clear button',
        },
    ],
    a11y: [
        'Label uses htmlFor.',
        'Hint/error IDs feed aria-describedby.',
        'Errors set aria-invalid.',
        'Search inputs use type="search".',
        'data-invalid, data-required, data-disabled as helper hooks.',
    ],
    i18n: inputI18n,
}

export function InputDocs() {
    return <DocPage doc={docData} />
}
