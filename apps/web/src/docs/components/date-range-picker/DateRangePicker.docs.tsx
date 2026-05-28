import { DocPage, type DocPageData } from '../DocPage'
import {
  DateRangePickerBasicExample,
  DateRangePickerWithErrorExample,
  DateRangePickerWithHintExample,
  DateRangePickerDisabledExample,
} from './DateRangePicker.examples'

const docData: DocPageData = {
  title: 'DateRangePicker',
  description: 'Two custom DatePicker components with calendar popovers, bound together with a visual separator.',
  importCode: "import { DateRangePicker } from '@monority/ui'",
  usageCode: `<DateRangePicker fromLabel="Start" toLabel="End" />`,
  preview: () => <DateRangePickerBasicExample />,
  examples: [
    { title: 'With error', content: <DateRangePickerWithErrorExample /> },
    { title: 'With hint', content: <DateRangePickerWithHintExample /> },
    { title: 'Disabled', content: <DateRangePickerDisabledExample /> },
  ],
  props: [
    { name: 'fromLabel', type: `string`, defaultValue: "'From'", description: "Label for the start DatePicker." },
    { name: 'toLabel', type: `string`, defaultValue: "'To'", description: "Label for the end DatePicker." },
    { name: 'fromProps', type: `Partial<DatePickerProps>`, defaultValue: "-", description: "Props forwarded to the start DatePicker (except label)." },
    { name: 'toProps', type: `Partial<DatePickerProps>`, defaultValue: "-", description: "Props forwarded to the end DatePicker (except label)." },
  ],
  cssHooks: [
    '.mr-date-range-picker', '.mr-date-range-picker__from', '.mr-date-range-picker__to',
    '.mr-date-range-picker__separator',
  ],
  tokens: [
    '--mr-border-subtle', '--mr-bg-control', '--mr-fg-base', '--mr-fg-muted',
    '--mr-input-height', '--mr-radius-md', '--mr-text-sm', '--mr-space-*',
  ],
  a11y: [
    'Native form element semantics.',
    'Supports disabled/required/aria-invalid.',
    'Visible focus ring.',
    'Associated labels for screen readers.',
  ],
}

export function DateRangePickerDocs() {
  return <DocPage doc={docData} />
}
