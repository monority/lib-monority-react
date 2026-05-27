import { DocPage, type DocPageData } from '../DocPage'
import { Select } from '@monority/ui'
import { SelectBasicExample } from './Select.examples'

const docData: DocPageData = {
  title: 'Select',
  description: "A dropdown menu that allows users to select one option from a list.",
  importCode: "import { Select } from '@monority/ui'",
  usageCode: `const [value, setValue] = useState('')

<Select value={value} onChange={(e) => setValue(e.target.value)}>
    <option value="">Select an option...</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
</Select>`,
  preview: () => <SelectBasicExample />,
  props: [
    { name: 'value', type: `string`, defaultValue: "-", description: "Selected value" },
    { name: 'onChange', type: `function`, defaultValue: "-", description: "Change callback" },
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label" },
    { name: 'tone', type: `'neutral' | 'accent' | 'danger'`, defaultValue: "-", description: "Visual tone" },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "-", description: "Input size" },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description" },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message" },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator" },
    { name: 'disabled', type: `boolean`, defaultValue: "false", description: "Disabled state" },
    { name: 'invalid', type: `boolean`, defaultValue: "false", description: "Invalid state" },
    { name: 'placeholder', type: `string`, defaultValue: "-", description: "Placeholder text" },
    { name: 'className', type: `string`, defaultValue: "-", description: "Additional class name" }
  ],
}

export function SelectDocs() {
  return <DocPage doc={docData} />
}
