import { useState } from 'react'
import { Modal, Button } from '@monority/ui'

export function ModalDocs() {
    const [open, setOpen] = useState(false)

    return (
        <div className="docs-page">
            <h1>Modal</h1>
            <p className="docs-description">
                A dialog that appears on top of the page content to capture user attention.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Modal } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Button onClick={() => setOpen(true)}>Open Modal</Button>
                    <Modal open={open} title="Modal Title" onClose={() => setOpen(false)}>
                        <p>Modal content goes here.</p>
                    </Modal>
                </div>
                <pre className="docs-code">
                    <code>{`const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Modal open={open} title="Modal Title" onClose={() => setOpen(false)}>
    <p>Modal content goes here.</p>
</Modal>`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>API Reference</h2>
                <table className="docs-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>open</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Whether the modal is open</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>string</td>
                            <td>-</td>
                            <td>Modal title</td>
                        </tr>
                        <tr>
                            <td>onClose</td>
                            <td>function</td>
                            <td>-</td>
                            <td>Callback when modal closes</td>
                        </tr>
                        <tr>
                            <td>children</td>
                            <td>ReactNode</td>
                            <td>-</td>
                            <td>Modal content</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
