import { DocPage, type DocPageData } from '../DocPage'
import { Combobox } from '@monority/ui'
import { ComboboxBasicExample } from './Combobox.examples'

const docData: DocPageData = {
  title: 'Combobox',
  description: "Autocomplete select with portal dropdown, keyboard navigation, and client-side filtering.",
  importCode: "import { Combobox } from '@monority/ui'",
  usageCode: `const [value, setValue] = useState('')
const items = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]

<Combobox
  items={items}
  value={value}
  onChange={setValue}
  placeholder="Search..."
  label="Framework"
/>`,
  preview: () => <ComboboxBasicExample />,
  props: [
    { name: 'items', type: `{ value: string; label: string; description?: string; keywords?: string }[]`, defaultValue: "[]", description: "Items for the dropdown." },
    { name: 'value', type: `string`, defaultValue: "-", description: "Controlled selected value." },
    { name: 'defaultValue', type: `string`, defaultValue: "-", description: "Default selected value." },
    { name: 'onChange', type: `(value: string) => void`, defaultValue: "-", description: "Selection callback." },
    { name: 'placeholder', type: `string`, defaultValue: "-", description: "Input placeholder." },
    { name: 'emptyLabel', type: `string`, defaultValue: "-", description: "Label when no results match." },
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." }
  ],
}

export function ComboboxDocs() {
  return <DocPage doc={docData} />
}
