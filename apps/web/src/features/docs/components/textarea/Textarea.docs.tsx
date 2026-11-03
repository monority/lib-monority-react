import { Textarea } from '@monority/ui/textarea'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { textareaI18n } from './Textarea.messages'
import {
    TextareaBasicExample,
    TextareaDisabledExample,
    TextareaResizableExample,
    TextareaWithCharCountExample,
    TextareaWithErrorExample,
    TextareaWithLabelExample,
} from './Textarea.examples'

function TextareaPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    tone: 'neutral' | 'accent' | 'danger'
    label: string
    placeholder: string
    hint: string
    rows: number
    maxLength: number
    disabled: boolean
    invalid: boolean
}) {
    const [value, setValue] = useState('')
    return (
        <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
            <Textarea
                size={props.size}
                tone={props.tone}
                label={props.label}
                placeholder={props.placeholder}
                hint={props.hint}
                rows={props.rows}
                maxLength={props.maxLength > 0 ? props.maxLength : undefined}
                disabled={props.disabled}
                invalid={props.invalid}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                data-testid="textarea-basic"
            />
        </div>
    )
}

const textareaPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        tone: 'neutral' | 'accent' | 'danger'
        label: string
        placeholder: string
        hint: string
        rows: number
        maxLength: number
        disabled: boolean
        invalid: boolean
    }>
        componentName="Textarea"
        importCode="import { Textarea } from '@monority/ui/textarea'"
        getCode={(p) => {
            const propsStr = [
                `  label="${p.label}"`,
                p.placeholder ? `  placeholder="${p.placeholder}"` : '',
                p.hint ? `  hint="${p.hint}"` : '',
                p.rows !== 4 ? `  rows={${p.rows}}` : '',
                p.maxLength > 0 ? `  maxLength={${p.maxLength}}` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.tone !== 'neutral' ? `  tone="${p.tone}"` : '',
                p.disabled ? '  disabled' : '',
                p.invalid ? '  invalid' : '',
                '  value={value}',
                '  onChange={(e) => setValue(e.target.value)}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { Textarea } from '@monority/ui/textarea'\n\nconst [value, setValue] = useState('')\n\n<Textarea\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Label (label)',
                defaultValue: 'Ticket description',
            },
            {
                name: 'placeholder',
                type: 'text',
                label: 'Placeholder',
                defaultValue: 'Describe the issue or request precisely...',
            },
            {
                name: 'hint',
                type: 'text',
                label: 'Hint (hint)',
                defaultValue: 'Markdown formatting is supported.',
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
                name: 'rows',
                type: 'number',
                label: 'Initial rows (rows)',
                defaultValue: 4,
            },
            {
                name: 'maxLength',
                type: 'number',
                label: 'Character limit (maxLength)',
                defaultValue: 200,
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
        render={(props) => <TextareaPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Textarea',
    description: 'Multi-line text input with Field wrapper for label, hint, and error.',
    importCode: "import { Textarea } from '@monority/ui/textarea'",
    usageCode: `<Textarea label="Description" rows={5} />`,
    preview: () => <TextareaBasicExample />,
    playground: textareaPlayground,
    examples: [
        { title: 'With label', content: <TextareaWithLabelExample /> },
        { title: 'Error state', content: <TextareaWithErrorExample /> },
        { title: 'Disabled', content: <TextareaDisabledExample /> },
        { title: 'Character count', content: <TextareaWithCharCountExample /> },
        { title: 'Resizable', content: <TextareaResizableExample /> },
    ],
    props: [
        {
            name: 'tone',
            type: `'neutral' | 'accent' | 'danger'`,
            defaultValue: "'neutral'",
            description: 'Visual border tone.',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Control density.',
        },
        {
            name: 'label',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Field label rendered above the textarea.',
        },
        {
            name: 'hint',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Help text rendered below the textarea.',
        },
        {
            name: 'error',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Error message. Sets aria-invalid and replaces hint styling.',
        },
        {
            name: 'invalid',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Explicit invalid state. Automatically true when error is provided.',
        },
        {
            name: 'rows',
            type: 'number',
            defaultValue: '3',
            description: 'Initial visible row height.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables user input and dims control.',
        },
        {
            name: 'required',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Adds required marker.',
        },
        {
            name: 'maxLength',
            type: 'number',
            defaultValue: '-',
            description: 'Maximum character length. Shows a live counter when set.',
        },
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description:
                'Controlled value. When omitted, the textarea is uncontrolled and `defaultValue` sets the initial value.',
        },
        {
            name: 'defaultValue',
            type: 'string',
            defaultValue: "''",
            description:
                'Uncontrolled initial value. Use instead of `value` for a controlled-less form field.',
        },
        {
            name: 'placeholder',
            type: 'string',
            defaultValue: '-',
            description: 'Native placeholder text.',
        },
    ],
    cssHooks: [
        '.mr-textarea',
        '.mr-textarea__counter',
        '[data-tone]',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
        '[data-required]',
        '[data-resize]',
        '[data-near-limit]',
    ],
    tokens: [
        '--mr-textarea-min-height',
        '--mr-text-secondary',
        '--mr-accent-solid',
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-bg-surface-strong',
        '--mr-bg-surface',
        '--mr-shadow-focus',
        '--mr-danger',
        '--mr-warning',
        '--mr-font-size-xs',
        '--mr-font-size-sm',
        '--mr-radius-full',
        '--mr-radius-xs',
        '--mr-duration-fast',
        '--mr-ease-standard',
    ],
    keyboardNavigation: [
        {
            key: 'Tab',
            action: 'Navigates into or out of the multi-line text area.',
            context: 'Text area',
        },
        {
            key: 'Enter',
            action: 'Inserts a line break within the text.',
            context: 'Text area',
        },
    ],
    a11y: [
        'Native <textarea> element with implicit form semantics.',
        'Label associated via htmlFor (auto-generated from id).',
        'aria-invalid="true" set when error is provided or invalid=true.',
        'aria-describedby connects hint and error messages to the textarea.',
        'Character counter uses aria-live="polite" for screen reader updates.',
        'Visible focus ring for keyboard navigation.',
        'Disabled state: native disabled attribute is used.',
        'Color is not the only indicator — invalid state also uses aria-invalid.',
    ],
    i18n: textareaI18n,
}

export function TextareaDocs() {
    return <DocPage doc={docData} />
}
