import { DocPage, type DocPageData } from '../DocPage'
import {
  AlertDialogBasicExample,
  AlertDialogDefaultToneExample,
  AlertDialogCustomLabelsExample,
} from './AlertDialog.examples'

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
  examples: [
    { title: 'Default tone', content: <AlertDialogDefaultToneExample /> },
    { title: 'Custom labels', content: <AlertDialogCustomLabelsExample /> },
  ],
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
  cssHooks: [
    '.mr-alert-dialog', '.mr-alert-dialog__backdrop', '.mr-alert-dialog__content',
    '.mr-alert-dialog__header', '.mr-alert-dialog__body', '.mr-alert-dialog__footer',
    '[data-open]',
  ],
  tokens: [
    '--mr-bg-surface-elevated', '--mr-shadow-xl', '--mr-radius-lg',
    '--mr-bg-overlay', '--mr-text-md', '--mr-space-*',
  ],
  a11y: [
    'Alert dialog ARIA pattern (role="alertdialog").',
    'Focus trap.',
    'aria-describedby for message.',
    'Escape key to close.',
    'Destructive actions clearly labeled.',
  ],
}

export function AlertDialogDocs() {
  return <DocPage doc={docData} />
}
