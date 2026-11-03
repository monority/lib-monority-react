import { DatePicker, type DatePickerSize, type DatePickerTone } from '@monority/ui/date-picker'
import { DocPage, type DocPageData } from '../DocPage'
import {
    DatePickerBasicExample,
    DatePickerControlledExample,
    DatePickerDisabledDatesExample,
    DatePickerDisabledExample,
    DatePickerSizesExample,
    DatePickerWithErrorExample,
    DatePickerWithHintExample,
    DatePickerWithMinMaxExample,
} from './DatePicker.examples'
import { datePickerI18n } from './DatePicker.messages'

const docData: DocPageData = {
    title: 'DatePicker',
    description:
        'Date input with integrated popover calendar, format validation, and accessible keyboard navigation.',
    importCode: "import { DatePicker } from '@monority/ui/date-picker'",
    usageCode: `<DatePicker label="Delivery date" placeholder="YYYY-MM-DD" />`,
    preview: () => <DatePickerBasicExample />,
    playgroundConfig: {
        controls: [
            {
                name: 'size',
                type: 'select',
                label: 'Size',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Small (sm)' },
                    { value: 'md', label: 'Medium (md)' },
                    { value: 'lg', label: 'Large (lg)' },
                ],
            },
            {
                name: 'tone',
                type: 'select',
                label: 'Tone',
                defaultValue: 'neutral',
                options: [
                    { value: 'neutral', label: 'Neutral' },
                    { value: 'accent', label: 'Accent' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
            {
                name: 'label',
                type: 'text',
                label: 'Label',
                defaultValue: 'Due date',
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled',
                defaultValue: false,
            },
            {
                name: 'showPickers',
                type: 'boolean',
                label: 'Month & year selectors',
                defaultValue: true,
            },
        ],
        getCode: (p) => `<DatePicker
  size="${p.size}"
  tone="${p.tone}"
  label="${p.label}"${p.disabled ? '\n  disabled' : ''}${p.showPickers ? '\n  showPickers' : ''}
  placeholder="YYYY-MM-DD"
/>`,
        render: (props) => (
            <div style={{ width: '100%', maxWidth: 320 }}>
                <DatePicker
                    size={props.size as DatePickerSize}
                    tone={props.tone as DatePickerTone}
                    label={props.label as string}
                    disabled={props.disabled as boolean}
                    showPickers={props.showPickers as boolean}
                    placeholder="YYYY-MM-DD"
                />
            </div>
        ),
    },
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
    keyboardNavigation: [
        {
            key: 'Tab / Shift + Tab',
            action: 'Focuses date field or navigates between calendar buttons.',
            context: 'Form / Calendar',
        },
        {
            key: 'Enter / Space',
            action: 'Opens calendar popover or confirms selected date.',
            context: 'Input / Buttons',
        },
        {
            key: 'Arrow Keys',
            action: 'Navigates day grid while calendar popover is open.',
            context: 'Calendar popover',
        },
        {
            key: 'PageUp / PageDown',
            action: 'Moves backward or forward by one month.',
            context: 'Calendar popover',
        },
        {
            key: 'Escape',
            action: 'Closes calendar popover and returns focus to input field.',
            context: 'Calendar popover',
        },
    ],
    cssHooks: ['.mr-datepicker', '[data-tone]', '[data-size]', '[data-disabled]', '[data-invalid]'],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-input-height',
        '--mr-radius-md',
        '--mr-font-size-sm',
    ],
    a11y: [
        'Native form element semantics.',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring.',
        'Associated label for screen readers.',
    ],
    i18n: datePickerI18n,
}

export function DatePickerDocs() {
    return <DocPage doc={docData} />
}
