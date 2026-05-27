import { DocPage, type DocPageData } from '../DocPage'
import { PasswordInput } from '@monority/ui'
import { PasswordInputBasicExample } from './PasswordInput.examples'

const docData: DocPageData = {
  title: 'PasswordInput',
  description: "Password input with show/hide toggle button.",
  importCode: "import { PasswordInput } from '@monority/ui'",
  usageCode: `<PasswordInput label="Password" />`,
  preview: () => <PasswordInputBasicExample />,
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." }
  ],
}

export function PasswordInputDocs() {
  return <DocPage doc={docData} />
}
