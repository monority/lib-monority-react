import { DocPage, type DocPageData } from '../DocPage'
import { NumberInput } from '@monority/ui'
import { NumberInputBasicExample } from './NumberInput.examples'

const docData: DocPageData = {
  title: 'NumberInput',
  description: "Number input with increment and decrement buttons.",
  importCode: "import { NumberInput } from '@monority/ui'",
  usageCode: `<NumberInput label="Quantity" min={0} max={100} step={1} />`,
  preview: () => <NumberInputBasicExample />,
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'value', type: `number`, defaultValue: "-", description: "Controlled value." },
    { name: 'defaultValue', type: `number`, defaultValue: "-", description: "Default value." },
    { name: 'min', type: `number`, defaultValue: "-", description: "Minimum value." },
    { name: 'max', type: `number`, defaultValue: "-", description: "Maximum value." },
    { name: 'step', type: `number`, defaultValue: "1", description: "Step increment." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." }
  ],
}

export function NumberInputDocs() {
  return <DocPage doc={docData} />
}
