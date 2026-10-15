import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Field } from '@monority/ui/field'
import { Input } from '@monority/ui/input'
import { Modal } from '@monority/ui/modal'

export function ModalBasicExample() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open review dialog</Button>
            <Modal open={open} title="Approve release notes" onClose={() => setOpen(false)}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <p style={{ margin: 0, lineHeight: 1.6 }}>
                        Review the final release summary before publishing it to the docs home and
                        component changelog.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Keep editing
                        </Button>
                        <Button onClick={() => setOpen(false)}>Publish</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export function ModalWithFormExample() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>Edit workspace</Button>
            <Modal open={open} title="Workspace settings" onClose={() => setOpen(false)}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <Field label="Workspace name">
                        <Input placeholder="Design system docs" />
                    </Field>
                    <Field label="Reviewer group">
                        <Input placeholder="Core UI team" />
                    </Field>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setOpen(false)}>Save changes</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export function ModalScrollableExample() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>Read checklist</Button>
            <Modal open={open} title="Pre-release checklist" onClose={() => setOpen(false)}>
                <div style={{ display: 'grid', gap: '0.875rem', lineHeight: 1.6 }}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <p key={`step-${i + 1}`} style={{ margin: 0 }}>
                            Step {i + 1}: Validate examples, token usage, documentation copy, and
                            visual consistency before shipping the next component batch.
                        </p>
                    ))}
                </div>
            </Modal>
        </>
    )
}
