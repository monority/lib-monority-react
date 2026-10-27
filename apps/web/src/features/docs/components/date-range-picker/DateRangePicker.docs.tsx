import { DateRangePicker } from '@monority/ui/date-range-picker'
import { DocPage, type DocPageData } from '../DocPage'
import {
    DateRangePickerBasicExample,
    DateRangePickerDisabledExample,
    DateRangePickerWithErrorExample,
    DateRangePickerWithHintExample,
} from './DateRangePicker.examples'
import { dateRangePickerI18n } from './DateRangePicker.messages'

const docData: DocPageData = {
    title: 'DateRangePicker',
    description:
        'Two custom DatePicker components with calendar popovers. End must be strictly after Start; invalid controlled ends clear once through onChange.',
    importCode: "import { DateRangePicker } from '@monority/ui/date-range-picker'",
    usageCode: `<DateRangePicker fromLabel="Start" toLabel="End" />`,
    preview: () => <DateRangePickerBasicExample />,
    playgroundConfig: {
        controls: [
            {
                name: 'fromLabel',
                type: 'text',
                label: 'Start label',
                defaultValue: 'Check-in date',
            },
            {
                name: 'toLabel',
                type: 'text',
                label: 'End label',
                defaultValue: 'Check-out date',
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled',
                defaultValue: false,
            },
        ],
        getCode: (p) => `<DateRangePicker
  fromLabel="${p.fromLabel}"
  toLabel="${p.toLabel}"${p.disabled ? '\n  disabled' : ''}
/>`,
        render: (props) => (
            <div style={{ width: '100%', maxWidth: 540 }}>
                <DateRangePicker
                    fromLabel={props.fromLabel as string}
                    toLabel={props.toLabel as string}
                    disabled={props.disabled as boolean}
                />
            </div>
        ),
    },
    examples: [
        {
            title: 'With error',
            content: <DateRangePickerWithErrorExample />,
            code: `<DateRangePicker fromLabel="Start" toLabel="End" error="Please select a date range" />`,
        },
        {
            title: 'With hint',
            content: <DateRangePickerWithHintExample />,
            code: `<DateRangePicker fromLabel="Check-in" toLabel="Check-out" hint="Select your stay dates" />`,
        },
        {
            title: 'Disabled',
            content: <DateRangePickerDisabledExample />,
            code: `<DateRangePicker fromLabel="Start" toLabel="End" disabled />`,
        },
    ],
    props: [
        {
            name: 'fromLabel',
            type: `string`,
            defaultValue: "'From'",
            description: 'Label for the start DatePicker.',
        },
        {
            name: 'toLabel',
            type: `string`,
            defaultValue: "'To'",
            description: 'Label for the end DatePicker.',
        },
        {
            name: 'fromProps',
            type: `Partial<DatePickerProps>`,
            defaultValue: '-',
            description: 'Props forwarded to the start DatePicker (except label).',
        },
        {
            name: 'toProps',
            type: `Partial<DatePickerProps>`,
            defaultValue: '-',
            description: 'Props forwarded to the end DatePicker (except label).',
        },
        {
            name: 'error',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Error message shown on both date pickers.',
        },
        {
            name: 'hint',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Hint text shown on both date pickers.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disables both date pickers.',
        },
    ],
    keyboardNavigation: [
        {
            key: 'Tab / Shift + Tab',
            action: 'Navigates between start and end date fields and triggers.',
            context: 'Date range form',
        },
        {
            key: 'Enter / Space',
            action: 'Opens calendar popover for focused field.',
            context: 'Input fields',
        },
        {
            key: 'Arrow Keys',
            action: 'Navigates days in calendar grid.',
            context: 'Calendar popover',
        },
        {
            key: 'Escape',
            action: 'Closes calendar and returns focus to active field.',
            context: 'Calendar popover',
        },
    ],
    cssHooks: ['.mr-date-range-picker', '.mr-date-range-picker__separator', '.mr-datepicker'],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-input-height',
        '--mr-input-radius',
        '--mr-font-size-sm',
        '--mr-space-*',
    ],
    a11y: [
        'Native form element semantics.',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring.',
        'Associated labels for screen readers.',
    ],
    i18n: dateRangePickerI18n,
}

export function DateRangePickerDocs() {
    return <DocPage doc={docData} />
}
