import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Modal } from '@monority/ui/modal'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    title: 'Approve release notes',
    open: true,
}

function codeFor(props: PlaygroundProps): string {
    const title = String(props.title ?? 'Approve release notes')
    const openBinding = props.open === true ? 'open' : 'false'
    return [
        'const [open, setOpen] = useState(false)',
        '',
        '<Button onClick={() => setOpen(true)}>Open dialog</Button>',
        `<Modal open={${openBinding}} title="${title}" onClose={() => setOpen(false)}>`,
        '  Review the final release summary before publishing.',
        '</Modal>',
    ].join('\n')
}

function ModalPreview(props: PlaygroundProps) {
    const [open, setOpen] = useState(props.open === true)
    const title = String(props.title ?? 'Approve release notes')

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open dialog</Button>
            <Modal open={open} title={title} onClose={() => setOpen(false)}>
                <p style={{ margin: 0, lineHeight: 1.6 }}>
                    Review the final release summary before publishing it to the docs home.
                </p>
            </Modal>
        </>
    )
}

export const modalPlayground: PlaygroundDefinition = {
    slug: 'modal',
    label: 'Modal',
    docsPath: '/docs/modal',
    importStatement: "import { Modal } from '@monority/ui/modal'",
    controls: [
        { name: 'title', type: 'text', placeholder: 'Approve release notes' },
        { name: 'open', type: 'boolean', label: 'open (initial)' },
    ],
    defaultProps: defaults,
    // Remount when the initial-open flag changes so the control stays live:
    // ModalPreview owns its open state locally after mount.
    render: (props) => <ModalPreview key={String(props.open === true)} {...props} />,
    generateCode: codeFor,
}
