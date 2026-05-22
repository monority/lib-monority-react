import { Badge } from '@monority/ui'

export function BadgeDocs() {
    return (
        <div className="docs-page">
            <h1>Badge</h1>
            <p className="docs-description">
                A small label that displays status, counts, or categories.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Badge } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Badge>Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="danger">Danger</Badge>
                </div>
                <pre className="docs-code">
                    <code>{`<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>

<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>`}</code>
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
                            <td>variant</td>
                            <td>'default' | 'primary' | 'success' | 'danger'</td>
                            <td>'default'</td>
                            <td>Visual variant</td>
                        </tr>
                        <tr>
                            <td>children</td>
                            <td>ReactNode</td>
                            <td>-</td>
                            <td>Badge content</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}