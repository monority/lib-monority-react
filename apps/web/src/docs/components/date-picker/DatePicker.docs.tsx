import { DocPage, type DocPageData } from '../DocPage'
import { DatePicker } from '@monority/ui'
import { DatePickerBasicExample } from './DatePicker.examples'

const docData: DocPageData = {
  title: 'DatePicker',
  description: "Native HTML date/time input wrapped in a Field with label, hint, and error support.",
  importCode: "import { DatePicker } from '@monority/ui'",
  usageCode: `<DatePicker type="date" label="Start date" />
<DatePicker type="time" label="Time" />`,
  preview: () => <DatePickerBasicExample />,
  props: [
    { name: 'type', type: `'date' | 'datetime-local' | 'time' | 'month' | 'week'`, defaultValue: "'date'", description: "Native input type." },
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." }
  ],
}

export function DatePickerDocs() {
  return <DocPage doc={docData} />
}
