import { useState } from 'react'
import { Tabs } from '@monority/ui'

const items = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' },
]

export function TabsDocs() {
    const [value, setValue] = useState('tab1')

    return (
        <div className="docs-page">
            <h1>Tabs</h1>
            <p className="docs-description">
                A set of layered sections of content that display one panel at a time.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Tabs } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Tabs items={items} value={value} onChange={setValue} />
                    <p style={{ marginTop: '1rem' }}>Selected: {value}</p>
                </div>
                <pre className="docs-code">
                    <code>{`const [value, setValue] = useState('tab1')

<Tabs
    items={[
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2' },
    ]}
    value={value}
    onChange={setValue}
/>`}</code>
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
                            <td>items</td>
                            <td>{'{ value: string; label: string }[]'}</td>
                            <td>[]</td>
                            <td>Tab definitions</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>string</td>
                            <td>-</td>
                            <td>Currently selected value</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>function</td>
                            <td>-</td>
                            <td>Tab change callback</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
