import { DocPage, type DocPageData } from '../DocPage'
import {
    NumberInputBasicPreview,
    NumberInputControlledExample,
    NumberInputSizesExample,
    NumberInputTonesExample,
    NumberInputStatesExample,
} from './NumberInput.examples'

const docData: DocPageData = {
    title: 'NumberInput',
    description:
        'A numeric stepper input with increment and decrement buttons, keyboard navigation, and constraint clamping.',
    importCode: "import { NumberInput } from '@monority/ui/number-input'",
    usageCode: '<NumberInput label="Quantity" min={1} max={10} defaultValue={1} />',
    preview: () => <NumberInputBasicPreview />,
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
        '--mr-fg-base',
        '--mr-border-base',
        '--mr-radius-md',
        '--mr-space-2',
        '--mr-space-3',
    ],
    a11y: [
        'Stepper buttons have accessible labels (Increment / Decrement).',
        'Supports ArrowUp and ArrowDown keyboard stepping.',
        'Proper aria-invalid and aria-describedby associations for hints and errors.',
    ],
}

export function NumberInputDocs() {
    return <DocPage doc={docData} />
}
