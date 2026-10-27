import { NumberInput } from '@monority/ui/number-input'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { numberInputI18n } from './NumberInput.messages'
import {
    NumberInputBasicPreview,
    NumberInputControlledExample,
    NumberInputSizesExample,
    NumberInputStatesExample,
    NumberInputTonesExample,
} from './NumberInput.examples'

function NumberInputPlaygroundDemo(props: {
    size: 'sm' | 'md' | 'lg'
    tone: 'neutral' | 'accent' | 'danger'
    label: string
    hint: string
    min: number
    max: number
    step: number
    disabled: boolean
}) {
    const [value, setValue] = useState<number | null>(4)
    return (
        <div style={{ width: '100%', maxWidth: '320px', margin: '0 auto' }}>
            <NumberInput
                size={props.size}
                tone={props.tone}
                label={props.label}
                hint={props.hint}
                min={props.min}
                max={props.max}
                step={props.step}
                disabled={props.disabled}
                value={value}
                onValueChange={setValue}
            />
        </div>
    )
}

const numberInputPlayground = (
    <ComponentPlayground<{
        size: 'sm' | 'md' | 'lg'
        tone: 'neutral' | 'accent' | 'danger'
        label: string
        hint: string
        min: number
        max: number
        step: number
        disabled: boolean
    }>
        componentName="NumberInput"
        importCode="import { NumberInput } from '@monority/ui/number-input'"
        getCode={(p) => {
            const propsStr = [
                `  label="${p.label}"`,
                p.hint ? `  hint="${p.hint}"` : '',
                `  min={${p.min}}`,
                `  max={${p.max}}`,
                p.step !== 1 ? `  step={${p.step}}` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.tone !== 'neutral' ? `  tone="${p.tone}"` : '',
                p.disabled ? '  disabled' : '',
                '  value={value}',
                '  onValueChange={setValue}',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { NumberInput } from '@monority/ui/number-input'\n\nconst [value, setValue] = useState<number | null>(4)\n\n<NumberInput\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Label (label)',
                defaultValue: 'Number of licenses',
            },
            {
                name: 'hint',
                type: 'text',
                label: 'Hint (hint)',
                defaultValue: 'Minimum 1, maximum 20 users.',
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
                name: 'min',
                type: 'number',
                label: 'Minimum value (min)',
                defaultValue: 1,
            },
            {
                name: 'max',
                type: 'number',
                label: 'Maximum value (max)',
                defaultValue: 20,
            },
            {
                name: 'step',
                type: 'number',
                label: 'Increment step (step)',
                defaultValue: 1,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <NumberInputPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'NumberInput',
    description:
        'A numeric stepper input with increment and decrement buttons, keyboard navigation, and constraint clamping.',
    importCode: "import { NumberInput } from '@monority/ui/number-input'",
    usageCode: '<NumberInput label="Quantity" min={1} max={10} defaultValue={1} />',
    preview: () => <NumberInputBasicPreview />,
    playground: numberInputPlayground,
    examples: [
        { title: 'Controlled Usage', content: <NumberInputControlledExample /> },
        { title: 'Sizes', content: <NumberInputSizesExample /> },
        { title: 'Tones', content: <NumberInputTonesExample /> },
        { title: 'States', content: <NumberInputStatesExample /> },
    ],
    props: [
        {
            name: 'value',
            type: 'number | null',
            defaultValue: '-',
            description: 'Controlled numeric value.',
        },
        {
            name: 'defaultValue',
            type: 'number | null',
            defaultValue: '-',
            description: 'Initial numeric value for uncontrolled mode.',
        },
        {
            name: 'onValueChange',
            type: '(value: number | null) => void',
            defaultValue: '-',
            description: 'Callback fired when parsed numeric value changes.',
        },
        {
            name: 'min',
            type: 'number',
            defaultValue: '-',
            description: 'Minimum permitted numeric value.',
        },
        {
            name: 'max',
            type: 'number',
            defaultValue: '-',
            description: 'Maximum permitted numeric value.',
        },
        {
            name: 'step',
            type: 'number',
            defaultValue: '1',
            description: 'Amount to increment or decrement with buttons and arrows.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Input height and text size density.',
        },
        {
            name: 'tone',
            type: "'neutral' | 'accent' | 'danger'",
            defaultValue: "'neutral'",
            description: 'Border and focus ring semantic tone.',
        },
        {
            name: 'label',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Accessible label above the input.',
        },
        {
            name: 'hint',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Supporting helper text displayed below the field.',
        },
        {
            name: 'error',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Error message that sets invalid state.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables input and stepper buttons.',
        },
        {
            name: 'readOnly',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Prevents editing while keeping the value readable.',
        },
    ],
    cssHooks: [
        '.mr-number-input',
        '.mr-number-input__stepper',
        '[data-size]',
        '[data-tone]',
        '[data-invalid]',
    ],
    tokens: [
        '--mr-bg-input',
        '--mr-text-primary',
        '--mr-border-base',
        '--mr-radius-md',
        '--mr-space-2',
        '--mr-space-3',
    ],
    keyboardNavigation: [
        {
            key: 'ArrowUp',
            action: 'Increments the value according to the step.',
            context: 'Number field',
        },
        {
            key: 'ArrowDown',
            action: 'Decrements the value according to the step.',
            context: 'Number field',
        },
        {
            key: 'Home',
            action: 'Resets to the minimum value (min) when set.',
            context: 'Number field',
        },
        {
            key: 'End',
            action: 'Sets the value to the maximum (max) when set.',
            context: 'Number field',
        },
        {
            key: 'Tab',
            action: 'Moves focus to the stepper buttons or the next control.',
            context: 'Number field',
        },
    ],
    a11y: [
        'Stepper buttons have accessible labels (Increment / Decrement).',
        'Supports ArrowUp and ArrowDown keyboard stepping.',
        'Proper aria-invalid and aria-describedby associations for hints and errors.',
    ],
    i18n: numberInputI18n,
}

export function NumberInputDocs() {
    return <DocPage doc={docData} />
}
