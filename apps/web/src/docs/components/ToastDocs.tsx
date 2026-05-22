import { useToast, Button } from '@monority/ui'

function ToastDemo() {
    const { pushToast } = useToast()

    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button onClick={() => pushToast({ title: 'Success', description: 'Action completed successfully' })}>
                Success Toast
            </Button>
            <Button variant="ghost" onClick={() => pushToast({ title: 'Info', description: 'Neutral update', tone: 'neutral' })}>
                Neutral Toast
            </Button>
            <Button variant="ghost" onClick={() => pushToast({ title: 'Error', description: 'Something went wrong', tone: 'danger' })}>
                Error Toast
            </Button>
        </div>
    )
}

export function ToastDocs() {
    return (
        <div className="docs-page">
            <h1>Toast</h1>
            <p className="docs-description">
                A notification that appears temporarily to inform users of important events.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { useToast } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <ToastDemo />
                </div>
                <pre className="docs-code">
                    <code>{`import { useToast, Button } from '@monority/ui'

function MyComponent() {
    const { pushToast } = useToast()

    return (
        <Button onClick={() => pushToast({
            title: 'Success',
            description: 'Action completed',
        })}>
            Show Toast
        </Button>
    )
}`}</code>
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
                            <td>title</td>
                            <td>string</td>
                            <td>-</td>
                            <td>Toast title</td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td>string</td>
                            <td>-</td>
                            <td>Toast description</td>
                        </tr>
                        <tr>
                            <td>tone</td>
                            <td>'neutral' | 'success' | 'danger'</td>
                            <td>'neutral'</td>
                            <td>Visual tone of the toast</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
