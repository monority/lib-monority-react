import { Table } from '@monority/ui'

const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
]

const rows = [
    { name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
]

export function TableDocs() {
    return (
        <div className="docs-page">
            <h1>Table</h1>
            <p className="docs-description">
                A structured display of data in rows and columns with sorting and filtering capabilities.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Table } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Table columns={columns} rows={rows} />
                </div>
                <pre className="docs-code">
                    <code>{`const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
]

const rows = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
]

<Table columns={columns} rows={rows} />`}</code>
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
                            <td>columns</td>
                            <td>Column[]</td>
                            <td>[]</td>
                            <td>Column definitions</td>
                        </tr>
                        <tr>
                            <td>rows</td>
                            <td>Record&lt;string, ReactNode&gt;[]</td>
                            <td>[]</td>
                            <td>Table data</td>
                        </tr>
                        <tr>
                            <td>emptyState</td>
                            <td>ReactNode</td>
                            <td>Built-in empty state</td>
                            <td>Custom empty state content</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
