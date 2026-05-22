import { Button } from '@monority/ui'
export function ButtonDocs() {
    return (
        <div className="docs-page">
            <h1>Button</h1>
            <p className="docs-description">
                Displays a button or a component that looks like a button.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Button } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                </div>
                <pre className="docs-code">
                    <code>{`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Sizes</h2>
                <div className="docs-preview">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </div>
                <pre className="docs-code">
                    <code>{`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}</code>
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
                            <td>'primary' | 'secondary' | 'ghost' | 'danger'</td>
                            <td>'primary'</td>
                            <td>Visual style of the button</td>
                        </tr>
                        <tr>
                            <td>size</td>
                            <td>'sm' | 'md' | 'lg'</td>
                            <td>'md'</td>
                            <td>Size of the button</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Disable the button</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
