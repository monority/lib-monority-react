import { Input } from '@monority/ui'

export function InputDocs() {
    return (
        <div className="docs-page">
            <h1>Input</h1>
            <p className="docs-description">
                Displays a form input field or a component that looks like an input field.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Input } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Input placeholder="Default input" />
                    <Input placeholder="With error" error />
                    <Input placeholder="Disabled" disabled />
                </div>
                <pre className="docs-code">
                    <code>{`<Input placeholder="Default input" />
<Input placeholder="With error" error />
<Input placeholder="Disabled" disabled />`}</code>
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
                            <td>placeholder</td>
                            <td>string</td>
                            <td>undefined</td>
                            <td>Placeholder text</td>
                        </tr>
                        <tr>
                            <td>error</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Show error state</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Disable the input</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
