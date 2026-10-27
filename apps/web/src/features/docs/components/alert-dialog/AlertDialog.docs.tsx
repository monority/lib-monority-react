import { AlertDialog } from '@monority/ui/alert-dialog'
import { Button } from '@monority/ui/button'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { alertDialogI18n } from './AlertDialog.messages'
import {
    AlertDialogBasicExample,
    AlertDialogCompoundExample,
    AlertDialogCustomLabelsExample,
    AlertDialogDefaultToneExample,
} from './AlertDialog.examples'

function AlertDialogPlaygroundDemo(props: {
    tone: 'danger' | 'default'
    title: string
    description: string
    confirmLabel: string
    cancelLabel: string
}) {
    const [open, setOpen] = useState(false)
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--mr-space-3)',
            }}
        >
            <Button
                onClick={() => setOpen(true)}
                variant={props.tone === 'danger' ? 'danger' : 'primary'}
            >
                Trigger the alert
            </Button>
            <AlertDialog
                open={open}
                tone={props.tone}
                title={props.title}
                description={props.description}
                confirmLabel={props.confirmLabel}
                cancelLabel={props.cancelLabel}
                onConfirm={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            />
        </div>
    )
}

const alertDialogPlayground = (
    <ComponentPlayground<{
        tone: 'danger' | 'default'
        title: string
        description: string
        confirmLabel: string
        cancelLabel: string
    }>
        componentName="AlertDialog"
        importCode="import { AlertDialog } from '@monority/ui/alert-dialog'"
        getCode={(p) => {
            return `import { useState } from 'react'\nimport { Button } from '@monority/ui/button'\nimport { AlertDialog } from '@monority/ui/alert-dialog'\n\nconst [open, setOpen] = useState(false)\n\n<>\n  <Button onClick={() => setOpen(true)} variant="${p.tone === 'danger' ? 'danger' : 'primary'}">\n    Trigger the alert\n  </Button>\n  <AlertDialog\n    open={open}\n    tone="${p.tone}"\n    title="${p.title}"\n    description="${p.description}"\n    confirmLabel="${p.confirmLabel}"\n    cancelLabel="${p.cancelLabel}"\n    onConfirm={() => setOpen(false)}\n    onCancel={() => setOpen(false)}\n  />\n</>`
        }}
        controls={[
            {
                name: 'tone',
                type: 'select',
                label: 'Tone',
                options: ['danger', 'default'],
                defaultValue: 'danger',
            },
            {
                name: 'title',
                type: 'text',
                label: 'Alert title',
                defaultValue: 'Delete this resource?',
            },
            {
                name: 'description',
                type: 'text',
                label: 'Consequences description',
                defaultValue:
                    'This action is irreversible and will permanently delete the data.',
            },
            {
                name: 'confirmLabel',
                type: 'text',
                label: 'Confirm label',
                defaultValue: 'Delete',
            },
            {
                name: 'cancelLabel',
                type: 'text',
                label: 'Cancel label',
                defaultValue: 'Cancel',
            },
        ]}
        render={(props) => <AlertDialogPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'AlertDialog',
    description:
        'Confirmation dialog for destructive or high-consequence actions that need extra friction.',
    importCode: "import { AlertDialog } from '@monority/ui/alert-dialog'",
    usageCode: `const [open, setOpen] = useState(false)

return (
  <>
    <Button onClick={() => setOpen(true)} variant="danger">
      Delete release snapshot
    </Button>
    <AlertDialog
      open={open}
      title="Delete this release snapshot?"
      description="This permanently removes the saved draft and its review history."
      onConfirm={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    />
  </>
)`,
    preview: () => <AlertDialogBasicExample />,
    playground: alertDialogPlayground,
    examples: [
        { title: 'Compound syntax', content: <AlertDialogCompoundExample /> },
        { title: 'Default tone', content: <AlertDialogDefaultToneExample /> },
        { title: 'Custom labels', content: <AlertDialogCustomLabelsExample /> },
    ],
    props: [
        { name: 'open', type: `boolean`, defaultValue: '-', description: 'Controls open state.' },
        { name: 'title', type: `string`, defaultValue: '-', description: 'Dialog title.' },
        {
            name: 'description',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Dialog description.',
        },
        {
            name: 'confirmLabel',
            type: `string`,
            defaultValue: "'Confirm'",
            description: 'Confirm button label.',
        },
        {
            name: 'cancelLabel',
            type: `string`,
            defaultValue: "'Cancel'",
            description: 'Cancel button label.',
        },
        {
            name: 'tone',
            type: `'danger' | 'default'`,
            defaultValue: "'default'",
            description: 'Visual tone.',
        },
        {
            name: 'onConfirm',
            type: `() => void`,
            defaultValue: '-',
            description: 'Confirm callback.',
        },
        {
            name: 'onCancel',
            type: `() => void`,
            defaultValue: '-',
            description: 'Cancel callback.',
        },
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
        '--mr-bg-raised',
        '--mr-border-subtle',
        '--mr-danger',
        '--mr-shadow-md',
        '--mr-radius-md',
    ],
    keyboardNavigation: [
        {
            key: 'Escape',
            action: 'Cancels the action and closes the alert dialog without applying any change.',
            context: 'Alert dialog open',
        },
        {
            key: 'Tab',
            action: 'Toggles focus between the cancel button and the confirm button.',
            context: 'Alert dialog open',
        },
        {
            key: 'Enter',
            action: 'Activates the currently focused action button (Cancel or Confirm).',
            context: 'Active action button',
        },
    ],
    a11y: [
        'The panel uses role="alertdialog" with aria-modal="true".',
        'The message is exposed through aria-describedby when present.',
        'Focus moves inside the dialog and Escape dismisses it.',
        'Destructive actions stay clearly labelled and visually distinct.',
        'Default button labels are in French; override confirmLabel/cancelLabel for other locales.',
    ],
    i18n: alertDialogI18n,
}

export function AlertDialogDocs() {
    return <DocPage doc={docData} />
}
