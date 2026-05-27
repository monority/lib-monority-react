export function Introduction() {
    return (
        <div className="docs-page">
            <header className="docs-hero">
                <span className="docs-kicker">Monority UI</span>
                <h1>Introduction</h1>
                <p className="docs-description">
                    Monority UI is a collection of reusable React components built with TypeScript and Tailwind CSS.
                </p>
            </header>

            <section className="docs-section">
                <h2>Features</h2>
                <ul className="docs-list">
                    <li>TypeScript support for type safety</li>
                    <li>Accessible components following WAI-ARIA guidelines</li>
                    <li>Customizable with CSS variables</li>
                    <li>Dark mode support</li>
                    <li>Tree-shakeable for optimal bundle size</li>
                </ul>
            </section>

            <section className="docs-section">
                <h2>Installation</h2>
                <div className="docs-code-block">
                    <code>{`npm install @monority/ui`}</code>
                </div>
            </section>

            <section className="docs-section">
                <h2>Quick Start</h2>
                <div className="docs-code-block">
                    <pre><code>{`import { Button } from '@monority/ui'

function App() {
    return <Button>Click me</Button>
}`}</code></pre>
                </div>
            </section>

            <section className="docs-section">
                <h2>Theming</h2>
                <p className="docs-text">
                    Import the CSS file to apply the default theme:
                </p>
                <div className="docs-code-block">
                    <code>{`import '@monority/ui/styles.css'`}</code>
                </div>
            </section>
        </div>
    )
}
