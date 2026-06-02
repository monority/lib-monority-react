import { DocPage, type DocPageData } from '../DocPage'
import {
  AlertDialogBasicExample,
  AlertDialogDefaultToneExample,
  AlertDialogCustomLabelsExample,
} from './AlertDialog.examples'

const docData: DocPageData = {
  title: 'AlertDialog',
  description: 'Confirmation dialog for destructive or high-consequence actions that need extra friction.',
  importCode: "import { AlertDialog } from '@monority/ui'",
  usageCode: `<AlertDialog
  open={open}
  title="Delete this release snapshot?"
  description="This permanently removes the saved draft and its review history."
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
    '.mr-alert-dialog',
    '.mr-alert-dialog__backdrop',
    '.mr-alert-dialog__backdrop-surface',
    '.mr-alert-dialog__panel',
    '.mr-alert-dialog__header',
    '.mr-alert-dialog__heading',
    '.mr-alert-dialog__title',
    '.mr-alert-dialog__description',
    '.mr-alert-dialog__actions',
    '.mr-alert-dialog__cancel',
    '.mr-alert-dialog__confirm',
    '[data-open]',
  ],
  tokens: [
    '--mr-bg-surface-elevated',
    '--mr-border-subtle',
    '--mr-danger',
    '--mr-shadow-md',
    '--mr-radius-md',
  ],
  a11y: [
    'The panel uses role="alertdialog" with aria-modal="true".',
    'The message is exposed through aria-describedby when present.',
    'Focus moves inside the dialog and Escape dismisses it.',
    'Destructive actions stay clearly labelled and visually distinct.',
  ],
}

export function AlertDialogDocs() {
  return <DocPage doc={docData} />
}
