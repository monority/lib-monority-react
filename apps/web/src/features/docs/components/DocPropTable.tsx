import type { PropRow } from './DocPage'

export interface DocPropTableProps {
    props: PropRow[]
}

export function DocPropTable({ props }: DocPropTableProps) {
    if (props.length === 0) return null

    return (
        <section className="docs-section" aria-labelledby="api-reference-title">
            <h2 id="api-reference-title">API Reference</h2>
            <div className="docs-table-wrapper">
                <table className="docs-table">
                    <thead>
                        <tr>
                            <th scope="col">Prop</th>
                            <th scope="col">Type</th>
                            <th scope="col">Default</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.map((prop) => (
                            <tr key={prop.name}>
                                <td className="docs-prop-name">{prop.name}</td>
                                <td className="docs-prop-type">
                                    <code>{prop.type}</code>
                                </td>
                                <td className="docs-prop-default">
                                    <code>{prop.defaultValue}</code>
                                </td>
                                <td className="docs-prop-desc">{prop.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
