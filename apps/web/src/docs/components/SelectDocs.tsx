import { useState } from 'react'
import { Select } from '@monority/ui'

export function SelectDocs() {
    const [value, setValue] = useState('')

    return (
        <div className="docs-page">
            <h1>Select</h1>
            <p className="docs-description">
                A dropdown menu that allows users to select one option from a list.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Select } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Select value={value} onChange={(e) => setValue(e.target.value)}>
                        <option value="">Select an option...</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </Select>
                    <p style={{ marginTop: '0.5rem' }}>Selected: {value || 'none'}</p>
                </div>
                <pre className="docs-code">
                    <code>{`const [value, setValue] = useState('')

<Select value={value} onChange={(e) => setValue(e.target.value)}>
    <option value="">Select an option...</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
</Select>`}</code>
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
                            <td>value</td>
                            <td>string</td>
                            <td>-</td>
                            <td>Selected value</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>function</td>
                            <td>-</td>
                            <td>Change callback</td>
                        </tr>
                        <tr>
                            <td>label</td>
                            <td>string</td>
                            <td>-</td>
                            <td>Field label</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
