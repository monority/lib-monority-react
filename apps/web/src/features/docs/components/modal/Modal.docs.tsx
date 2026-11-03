import { Button } from '@monority/ui/button'
import { Modal } from '@monority/ui/modal'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { modalI18n } from './Modal.messages'
import { ModalBasicExample, ModalScrollableExample, ModalWithFormExample } from './Modal.examples'

function ModalPlaygroundDemo(props: {
    title: string
    description: string
    confirmLabel: string
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
            <Button onClick={() => setOpen(true)} variant="primary">
                Open the modal
            </Button>
            <Modal
                open={open}
                title={props.title}
                description={props.description}
                onClose={() => setOpen(false)}
                footer={
                    <div
                        style={{
                            display: 'flex',
                            gap: 'var(--mr-space-2)',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setOpen(false)}>{props.confirmLabel}</Button>
                    </div>
                }
            >
                <p
                    style={{
                        margin: 0,
                        color: 'var(--mr-text-primary)',
                        fontSize: 'var(--mr-font-size-sm)',
                    }}
                >
                    Example of interactive content inside the modal dialog body.
                </p>
            </Modal>
        </div>
    )
}

const modalPlayground = (
    <ComponentPlayground<{
        title: string
        description: string
        confirmLabel: string
    }>
        componentName="Modal"
        importCode="import { Modal } from '@monority/ui/modal'"
        getCode={(p) => {
            return `import { useState } from 'react'\nimport { Button } from '@monority/ui/button'\nimport { Modal } from '@monority/ui/modal'\n\nconst [open, setOpen] = useState(false)\n\n<>\n  <Button onClick={() => setOpen(true)}>Open the modal</Button>\n  <Modal\n    open={open}\n    title="${p.title}"\n    description="${p.description}"\n    onClose={() => setOpen(false)}\n    footer={\n      <div style={{ display: 'flex', gap: 'var(--mr-space-2)', justifyContent: 'flex-end' }}>\n        <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>\n        <Button onClick={() => setOpen(false)}>${p.confirmLabel}</Button>\n      </div>\n    }\n  >\n    <p>Main content of the modal dialog.</p>\n  </Modal>\n</>`
        }}
        controls={[
            {
                name: 'title',
                type: 'text',
                label: 'Dialog title',
                defaultValue: 'Release validation',
            },
            {
                name: 'description',
                type: 'text',
                label: 'Dialog description',
                defaultValue: 'Check the details before saving.',
            },
            {
                name: 'confirmLabel',
                type: 'text',
                label: 'Confirm button',
                defaultValue: 'Confirm',
            },
        ]}
        render={(props) => <ModalPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Modal',
    description:
        'Focused dialog surface for short decision flows, confirmation, and compact editing tasks.',
    importCode: "import { Modal } from '@monority/ui/modal'",
    usageCode: `const [open, setOpen] = useState(false)

return (
  <>
    <Button onClick={() => setOpen(true)}>Open review dialog</Button>
    <Modal open={open} title="Approve release notes" onClose={() => setOpen(false)}>
      <p>Review the final release summary before publishing it to the docs home.</p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Keep editing
        </Button>
        <Button onClick={() => setOpen(false)}>Publish</Button>
      </div>
    </Modal>
  </>
)`,
    preview: () => <ModalBasicExample />,
    playground: modalPlayground,
    examples: [
        { title: 'With form', content: <ModalWithFormExample /> },
        { title: 'Scrollable content', content: <ModalScrollableExample /> },
    ],
    props: [
        {
            name: 'open',
            type: `boolean`,
            defaultValue: '-',
            description: 'Always controlled: pass useState, no uncontrolled mode.',
        },
        { name: 'title', type: `string`, defaultValue: '-', description: 'Dialog label.' },
        {
            name: 'onClose',
            type: `() => void`,
            defaultValue: '-',
            description: 'Called from backdrop, close button, and Escape.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Dialog body content.',
        },
    ],
    cssHooks: [
        '.mr-modal',
        '.mr-modal__backdrop',
        '.mr-modal__panel',
        '.mr-modal__header',
        '.mr-modal__heading',
        '.mr-modal__title',
        '.mr-modal__close',
        '.mr-modal__body',
        '[data-open]',
    ],
    tokens: [
        '--mr-z-overlay',
        '--mr-bg-raised',
        '--mr-border-subtle',
        '--mr-shadow-md',
        '--mr-radius-md',
    ],
    keyboardNavigation: [
        {
            key: 'Escape',
            action: 'Closes the modal dialog and returns focus to the calling element.',
            context: 'Modal open',
        },
        {
            key: 'Tab',
            action: 'Cycles focus among the interactive elements trapped inside the modal.',
            context: 'Modal open',
        },
        {
            key: ['Shift', 'Tab'],
            action: 'Cycles focus backward inside the modal.',
            context: 'Modal open',
        },
    ],
    a11y: [
        'The panel uses role="dialog" and aria-modal="true".',
        'The title id is connected through aria-labelledby.',
        'Focus is trapped while the modal is open and Escape closes it.',
        'The close button uses a hardcoded French label; override the DOM if i18n is needed.',
    ],
    i18n: modalI18n,
}

export function ModalDocs() {
    return <DocPage doc={docData} />
}
