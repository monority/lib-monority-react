import { DocPage, type DocPageData } from '../DocPage'
import {
    SelectBasicExample,
    SelectDisabledExample,
    SelectInvalidExample,
    SelectRequiredExample,
    SelectSizesExample,
    SelectWithHintExample,
} from './Select.examples'

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
    examples: [
        { title: 'With hint', content: <SelectWithHintExample /> },
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
        '.mr-select--sm',
        '.mr-select--md',
        '.mr-select--lg',
        '.mr-select--neutral',
        '.mr-select--accent',
        '.mr-select--danger',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
        '[data-tone]',
    ],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-input-height',
        '--mr-input-radius',
        '--mr-text-sm',
        '--mr-accent',
        '--mr-danger',
        '--mr-icon-size-sm',
        '--mr-icon-size-md',
        '--mr-border-width',
        '--mr-control-padding-inline-sm',
        '--mr-control-padding-inline-md',
        '--mr-control-padding-inline-lg',
    ],
    a11y: [
        'Native form element semantics.',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring.',
        'Associated label for screen readers.',
        'Opened option presentation is controlled by the browser and operating system.',
    ],
}

export function SelectDocs() {
    return <DocPage doc={docData} />
}
