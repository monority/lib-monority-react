import { DocPage, type DocPageData } from '../DocPage'
import { Field } from '@monority/ui'
import { FieldBasicExample } from './Field.examples'

const docData: DocPageData = {
  title: 'Field',
  description: "Building block for form fields — wraps children with label, hint, and error markup.",
  importCode: "import { Field } from '@monority/ui'",
  usageCode: `<Field label="Full name" hint="As shown on your ID." error="">
  <input className="mr-input" />
</Field>`,
  preview: () => <FieldBasicExample />,
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description linked via aria-describedby." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message with aria-invalid." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required indicator." },
    { name: 'htmlFor', type: `string`, defaultValue: "-", description: "ID of the controlled input." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Input element." }
  ],
}

export function FieldDocs() {
  return <DocPage doc={docData} />
}
