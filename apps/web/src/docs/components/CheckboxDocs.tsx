import { Checkbox } from '@monority/ui'

export function CheckboxDocs() {
    return (
        <div className="docs-page">
            <h1>Checkbox</h1>
            <p className="docs-description">
                A control that allows users to select one or more options from a set.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Checkbox } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Checkbox label="Option 1" />
                    <Checkbox label="Option 2" defaultChecked />
                </div>
                <pre className="docs-code">
                    <code>{`<Checkbox label="Option 1" />
<Checkbox label="Option 2" defaultChecked />`}</code>
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
                            <td>label</td>
                            <td>string</td>
                            <td>-</td>
                            <td>Checkbox label</td>
                        </tr>
                        <tr>
                            <td>checked</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Checked state</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>function</td>
                            <td>-</td>
                            <td>Change callback</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
