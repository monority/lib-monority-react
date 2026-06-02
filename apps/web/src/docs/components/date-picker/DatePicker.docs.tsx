import { DocPage, type DocPageData } from '../DocPage'
import {
    DatePickerBasicExample,
    DatePickerWithErrorExample,
    DatePickerWithHintExample,
    DatePickerWithMinMaxExample,
    DatePickerDisabledExample,
    DatePickerControlledExample,
    DatePickerSizesExample,
    DatePickerDisabledDatesExample,
} from './DatePicker.examples'

const docData: DocPageData = {
    title: 'DatePicker',
    description:
        'Native HTML date/time input wrapped in a Field with label, hint, and error support.',
    importCode: "import { DatePicker } from '@monority/ui'",
    usageCode: `<DatePicker type="date" label="Start date" />
<DatePicker type="time" label="Time" />`,
    preview: () => <DatePickerBasicExample />,
    examples: [
        { title: 'With error', content: <DatePickerWithErrorExample /> },
        { title: 'With hint', content: <DatePickerWithHintExample /> },
        { title: 'Min/Max dates', content: <DatePickerWithMinMaxExample /> },
        { title: 'Disabled', content: <DatePickerDisabledExample /> },
        { title: 'Controlled', content: <DatePickerControlledExample /> },
        { title: 'Sizes', content: <DatePickerSizesExample /> },
        { title: 'Disabled dates', content: <DatePickerDisabledDatesExample /> },
    ],
    props: [
        {
            name: 'type',
            type: `'date' | 'datetime-local' | 'time' | 'month' | 'week'`,
            defaultValue: "'date'",
            description: 'Native input type.',
        },
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Field label.' },
        { name: 'hint', type: `ReactNode`, defaultValue: '-', description: 'Helpful description.' },
        { name: 'error', type: `ReactNode`, defaultValue: '-', description: 'Error message.' },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator.',
        },
    ],
    cssHooks: [
        '.mr-date-picker',
        '.mr-date-picker--sm',
        '.mr-date-picker--md',
        '.mr-date-picker--lg',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
    ],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-input-height',
        '--mr-radius-md',
        '--mr-text-sm',
    ],
    a11y: [
        'Native form element semantics.',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring.',
        'Associated label for screen readers.',
    ],
}

export function DatePickerDocs() {
    return <DocPage doc={docData} />
}
