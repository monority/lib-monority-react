import { Avatar } from '@monority/ui'

export function AvatarDocs() {
    return (
        <div className="docs-page">
            <h1>Avatar</h1>
            <p className="docs-description">
                A visual representation of a user or entity, typically using an image or initials.
            </p>

            <section className="docs-section">
                <h2>Installation</h2>
                <pre className="docs-code">
                    <code>{`import { Avatar } from '@monority/ui'`}</code>
                </pre>
            </section>

            <section className="docs-section">
                <h2>Usage</h2>
                <div className="docs-preview">
                    <Avatar size="sm" name="Alice B" />
                    <Avatar size="md" name="Alice B" />
                    <Avatar size="lg" name="Alice B" />
                </div>
                <pre className="docs-code">
                    <code>{`<Avatar size="sm" name="Alice B" />
<Avatar size="md" name="Alice B" />
<Avatar size="lg" name="Alice B" />`}</code>
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
                            <td>Size of the avatar</td>
                        </tr>
                        <tr>
                            <td>src</td>
                            <td>string</td>
                            <td>-</td>
                            <td>Image source URL</td>
                        </tr>
                        <tr>
                            <td>alt</td>
                            <td>string</td>
                            <td>-</td>
                            <td>Alt text for image</td>
                        </tr>
                        <tr>
                            <td>children</td>
                            <td>ReactNode</td>
                            <td>-</td>
                            <td>Initials or fallback content</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
