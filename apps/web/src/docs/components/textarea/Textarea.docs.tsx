import { DocPage, type DocPageData } from '../DocPage'
import { Textarea } from '@monority/ui'
import { TextareaBasicExample } from './Textarea.examples'

const docData: DocPageData = {
  title: 'Textarea',
  description: "Multi-line text input with Field wrapper for label, hint, and error.",
  importCode: "import { Textarea } from '@monority/ui'",
  usageCode: `<Textarea label="Description" rows={5} />`,
  preview: () => <TextareaBasicExample />,
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." },
    { name: 'rows', type: `number`, defaultValue: "5", description: "Number of visible rows." }
  ],
}

export function TextareaDocs() {
  return <DocPage doc={docData} />
}
