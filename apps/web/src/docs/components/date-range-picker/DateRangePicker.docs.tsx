import { DocPage, type DocPageData } from '../DocPage'
import { DateRangePicker } from '@monority/ui'
import { DateRangePickerBasicExample } from './DateRangePicker.examples'

const docData: DocPageData = {
  title: 'DateRangePicker',
  description: "Two native date inputs (from / to) wrapped in a single Field group.",
  importCode: "import { DateRangePicker } from '@monority/ui'",
  usageCode: `<DateRangePicker label="Period" />`,
  preview: () => <DateRangePickerBasicExample />,
  props: [
    { name: 'fromLabel', type: `string`, defaultValue: "'From'", description: "Label for the \"from\" input." },
    { name: 'toLabel', type: `string`, defaultValue: "'To'", description: "Label for the \"to\" input." },
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." },
    { name: 'fromProps', type: `object`, defaultValue: "-", description: "Props forwarded to the from DatePicker." },
    { name: 'toProps', type: `object`, defaultValue: "-", description: "Props forwarded to the to DatePicker." }
  ],
}

export function DateRangePickerDocs() {
  return <DocPage doc={docData} />
}
