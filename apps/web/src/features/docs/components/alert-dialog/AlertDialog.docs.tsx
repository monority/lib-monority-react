import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { AlertDialog } from '@monority/ui/alert-dialog'
import { DocPage, type DocPageData } from '../DocPage'
import { ComponentPlayground } from '../ComponentPlayground'
import {
    AlertDialogBasicExample,
    AlertDialogDefaultToneExample,
    AlertDialogCustomLabelsExample,
    AlertDialogCompoundExample,
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
                Declencher l alerte
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
            return `import { useState } from 'react'\nimport { Button } from '@monority/ui/button'\nimport { AlertDialog } from '@monority/ui/alert-dialog'\n\nconst [open, setOpen] = useState(false)\n\n<>\n  <Button onClick={() => setOpen(true)} variant="${p.tone === 'danger' ? 'danger' : 'primary'}">\n    Declencher l alerte\n  </Button>\n  <AlertDialog\n    open={open}\n    tone="${p.tone}"\n    title="${p.title}"\n    description="${p.description}"\n    confirmLabel="${p.confirmLabel}"\n    cancelLabel="${p.cancelLabel}"\n    onConfirm={() => setOpen(false)}\n    onCancel={() => setOpen(false)}\n  />\n</>`
        }}
        controls={[
            {
                name: 'tone',
                type: 'select',
                label: 'Tonalite',
                options: ['danger', 'default'],
                defaultValue: 'danger',
            },
            {
                name: 'title',
                type: 'text',
                label: 'Titre de l alerte',
                defaultValue: 'Supprimer cette ressource ?',
            },
            {
                name: 'description',
                type: 'text',
                label: 'Description des consequences',
                defaultValue:
                    'Cette action est irreversible et supprimera definitivement les donnees.',
            },
            {
                name: 'confirmLabel',
                type: 'text',
                label: 'Libelle de confirmation',
                defaultValue: 'Supprimer',
            },
            {
                name: 'cancelLabel',
                type: 'text',
                label: 'Libelle d annulation',
                defaultValue: 'Annuler',
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
            defaultValue: "'Confirmer'",
            description: 'Confirm button label.',
        },
        {
            name: 'cancelLabel',
            type: `string`,
            defaultValue: "'Annuler'",
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
            action: 'Annule l action et referme la boite d alerte sans appliquer de changement.',
            context: 'Dialogue d alerte ouvert',
        },
        {
            key: 'Tab',
            action: 'Bascule le focus entre le bouton d annulation et le bouton de confirmation.',
            context: 'Dialogue d alerte ouvert',
        },
        {
            key: 'Enter',
            action: 'Declenche le bouton actuellement actif sous le focus (Annulation ou Confirmation).',
            context: 'Bouton d action actif',
        },
    ],
    a11y: [
        'The panel uses role="alertdialog" with aria-modal="true".',
        'The message is exposed through aria-describedby when present.',
        'Focus moves inside the dialog and Escape dismisses it.',
        'Destructive actions stay clearly labelled and visually distinct.',
        'Default button labels are in French; override confirmLabel/cancelLabel for other locales.',
    ],
}

export function AlertDialogDocs() {
    return <DocPage doc={docData} />
}
