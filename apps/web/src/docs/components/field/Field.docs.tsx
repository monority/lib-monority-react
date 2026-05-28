import { DocPage, type DocPageData } from '../DocPage'
import {
  FieldBasicExample,
  FieldWithHintExample,
  FieldWithErrorExample,
  FieldRequiredExample,
  FieldStandaloneExample,
} from './Field.examples'

const docData: DocPageData = {
  title: 'Field',
  description: "Building block for form fields — wraps children with label, hint, and error markup.",
  importCode: "import { Field } from '@monority/ui'",
  usageCode: `<Field label="Full name" hint="As shown on your ID." error="">
  <input className="mr-input" />
</Field>`,
  preview: () => <FieldBasicExample />,
  examples: [
    { title: 'With hint', content: <FieldWithHintExample /> },
    { title: 'With error', content: <FieldWithErrorExample /> },
    { title: 'Required', content: <FieldRequiredExample /> },
    { title: 'Standalone', content: <FieldStandaloneExample /> },
  ],
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description linked via aria-describedby." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message with aria-invalid." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required indicator." },
    { name: 'htmlFor', type: `string`, defaultValue: "-", description: "ID of the controlled input." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Input element." }
  ],
  cssHooks: [
    '.mr-field', '.mr-field__label', '.mr-field__hint', '.mr-field__error',
    '[data-required]', '[data-invalid]',
  ],
  tokens: [
    '--mr-fg-base', '--mr-fg-muted', '--mr-danger',
    '--mr-text-sm', '--mr-space-*',
  ],
  a11y: [
    'Label uses htmlFor for association.',
    'Hint/error IDs feed aria-describedby.',
    'Errors set aria-invalid on controlled input.',
  ],
}

export function FieldDocs() {
  return <DocPage doc={docData} />
}
