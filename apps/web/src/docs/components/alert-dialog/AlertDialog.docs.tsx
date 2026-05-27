import { DocPage, type DocPageData } from '../DocPage'
import { AlertDialog } from '@monority/ui'
import { AlertDialogBasicExample } from './AlertDialog.examples'

const docData: DocPageData = {
  title: 'AlertDialog',
  description: "Confirmation dialog with role=\"alertdialog\" for destructive or important actions.",
  importCode: "import { AlertDialog } from '@monority/ui'",
  usageCode: `<AlertDialog
  open={open}
  title="Delete item?"
  description="This action cannot be undone."
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>`,
  preview: () => <AlertDialogBasicExample />,
  props: [
    { name: 'open', type: `boolean`, defaultValue: "-", description: "Controls open state." },
    { name: 'title', type: `string`, defaultValue: "-", description: "Dialog title." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Dialog description." },
    { name: 'confirmLabel', type: `string`, defaultValue: "'Confirmer'", description: "Confirm button label." },
    { name: 'cancelLabel', type: `string`, defaultValue: "'Annuler'", description: "Cancel button label." },
    { name: 'tone', type: `'danger' | 'default'`, defaultValue: "'danger'", description: "Visual tone." },
    { name: 'onConfirm', type: `() => void`, defaultValue: "-", description: "Confirm callback." },
    { name: 'onCancel', type: `() => void`, defaultValue: "-", description: "Cancel callback." }
  ],
}

export function AlertDialogDocs() {
  return <DocPage doc={docData} />
}
