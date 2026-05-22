import { Spinner } from '@monority/ui'

export function SpinnerDocs() {
    return (
        <div className="docs-page">
            <h1>Spinner</h1>
            <p className="docs-description">
                A visual indicator that an action is in progress.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Spinner } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                </div>
                <pre className="docs-code">
                    <code>{`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}</code>
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
                            <td>Size of the spinner</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
