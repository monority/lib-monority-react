import { Card } from '@monority/ui'

export function CardDocs() {
    return (
        <div className="docs-page">
            <h1>Card</h1>
            <p className="docs-description">
                A container with a border, padding, and background that groups related content.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Card } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Card padding="md">
                        <h3>Card Title</h3>
                        <p>Card content goes here.</p>
                    </Card>
                </div>
                <pre className="docs-code">
                    <code>{`<Card padding="md">
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
</Card>`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Sizes</h2>
                <div className="docs-preview">
                    <Card padding="sm">Small</Card>
                    <Card padding="md">Medium</Card>
                    <Card padding="lg">Large</Card>
                </div>
                <pre className="docs-code">
                    <code>{`<Card padding="sm">Small</Card>
<Card padding="md">Medium</Card>
<Card padding="lg">Large</Card>`}</code>
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
                            <td>size</td>
                            <td>'sm' | 'md' | 'lg'</td>
                            <td>'md'</td>
                            <td>Padding size of the card</td>
                        </tr>
                        <tr>
                            <td>children</td>
                            <td>ReactNode</td>
                            <td>-</td>
                            <td>Card content</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
