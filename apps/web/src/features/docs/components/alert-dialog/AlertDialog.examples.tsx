import { useState } from 'react'
import { AlertDialog } from '@monority/ui/alert-dialog'
import { Button } from '@monority/ui/button'

export function AlertDialogBasicExample() {
    const [open, setOpen] = useState(false)

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
    )
}

export function AlertDialogDefaultToneExample() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>Discard staged edits</Button>
            <AlertDialog
                open={open}
                title="Discard staged edits?"
                description="Your unpublished copy changes will be cleared from this session."
                tone="default"
                confirmLabel="Discard edits"
                onConfirm={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}

export function AlertDialogCustomLabelsExample() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="danger">
                Remove reviewer access
            </Button>
            <AlertDialog
                open={open}
                title="Remove reviewer access?"
                description="They will lose access to pending reviews and approval queues immediately."
                confirmLabel="Remove access"
                cancelLabel="Keep reviewer"
                onConfirm={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}

export function AlertDialogCompoundExample() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="secondary">
                Archive project (Compound)
            </Button>
            <AlertDialog open={open} onCancel={() => setOpen(false)}>
                <AlertDialog.Header>
                    <AlertDialog.Title>Archive this repository?</AlertDialog.Title>
                    <AlertDialog.Description>
                        Archiving will mark this repository as read-only for all collaborators.
                    </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                    <AlertDialog.Cancel onClick={() => setOpen(false)}>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Confirm onClick={() => setOpen(false)}>
                        Archive
                    </AlertDialog.Confirm>
                </AlertDialog.Footer>
            </AlertDialog>
        </>
    )
}
