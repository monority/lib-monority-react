import { DocPage, type DocPageData } from '../DocPage'
import { RadioGroup } from '@monority/ui'
import { RadioGroupBasicExample } from './RadioGroup.examples'

const docData: DocPageData = {
  title: 'RadioGroup',
  description: "Radio button group with label, hint, error, and accessible keyboard navigation.",
  importCode: "import { RadioGroup } from '@monority/ui'",
  usageCode: `const items = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large', disabled: true },
]

<RadioGroup label="Size" items={items} />`,
  preview: () => <RadioGroupBasicExample />,
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Group label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'items', type: `{ value: string; label: string; description?: string; disabled?: boolean }[]`, defaultValue: "[]", description: "Radio options." },
    { name: 'value', type: `string`, defaultValue: "-", description: "Controlled value." },
    { name: 'defaultValue', type: `string`, defaultValue: "-", description: "Default value." },
    { name: 'onChange', type: `(value: string) => void`, defaultValue: "-", description: "Change callback." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." },
    { name: 'name', type: `string`, defaultValue: "-", description: "HTML name attribute." }
  ],
}

export function RadioGroupDocs() {
  return <DocPage doc={docData} />
}
