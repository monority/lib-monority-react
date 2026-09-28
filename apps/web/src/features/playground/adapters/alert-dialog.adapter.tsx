import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { AlertDialog } from '@monority/ui/alert-dialog'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    title: 'Delete workspace?',
    description: 'This permanently removes the workspace and all of its projects.',
    tone: 'danger',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    open: true,
}

function codeFor(props: PlaygroundProps): string {
    const title = String(props.title ?? 'Delete workspace?')
    const lines: string[] = []
    if (props.description) lines.push(`  description="${String(props.description)}"`)
    if (props.tone !== 'default') lines.push(`  tone="${String(props.tone)}"`)
    if (props.confirmLabel !== 'Confirmer')
        lines.push(`  confirmLabel="${String(props.confirmLabel)}"`)
    if (props.cancelLabel !== 'Annuler') lines.push(`  cancelLabel="${String(props.cancelLabel)}"`)
    const openBinding = props.open === true ? 'open' : 'false'
    return [
        'const [open, setOpen] = useState(false)',
        '',
        '<Button variant="danger" onClick={() => setOpen(true)}>Delete workspace</Button>',
        `<AlertDialog open={${openBinding}} title="${title}"`,
        ...lines,
        '  onConfirm={() => setOpen(false)}',
        '  onCancel={() => setOpen(false)}',
        '/>',
    ].join('\n')
}

function AlertDialogPreview(props: PlaygroundProps) {
    const [open, setOpen] = useState(props.open === true)
    return (
        <>
            <Button variant="danger" onClick={() => setOpen(true)}>
                Delete workspace
            </Button>
            <AlertDialog
                open={open}
                title={String(props.title ?? 'Delete workspace?')}
                description={String(props.description ?? '') || undefined}
                tone={props.tone as 'danger'}
                confirmLabel={String(props.confirmLabel ?? 'Delete')}
                cancelLabel={String(props.cancelLabel ?? 'Cancel')}
                onConfirm={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}

export const alertDialogPlayground: PlaygroundDefinition = {
    slug: 'alert-dialog',
    label: 'AlertDialog',
    docsPath: '/docs/alert-dialog',
    importStatement: "import { AlertDialog } from '@monority/ui/alert-dialog'",
    controls: [
        { name: 'title', type: 'text', placeholder: 'Delete workspace?' },
        { name: 'description', type: 'text', placeholder: 'This is permanent.' },
        { name: 'tone', type: 'select', options: ['default', 'danger'] },
        { name: 'confirmLabel', type: 'text', placeholder: 'Delete' },
        { name: 'cancelLabel', type: 'text', placeholder: 'Cancel' },
        { name: 'open', type: 'boolean', label: 'open (initial)' },
    ],
    defaultProps: defaults,
    render: (props) => <AlertDialogPreview key={String(props.open === true)} {...props} />,
    generateCode: codeFor,
}
