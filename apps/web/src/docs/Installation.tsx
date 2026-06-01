export function Installation() {
    return (
        <div className="docs-page">
            <header className="docs-hero">
                <span className="docs-kicker">Getting Started</span>
                <h1>Installation</h1>
                <p className="docs-description">
                    Set up Monority UI in your project with your preferred package manager.
                </p>
            </header>

            <div className="docs-steps">
                <div className="docs-step">
                    <div className="docs-step__number">1</div>
                    <div className="docs-step__content">
                        <h3>Install the package</h3>
                        <p>Choose your package manager:</p>
                        <div className="docs-code-block">
                            <pre><code>{`npm install @monority/ui`}</code></pre>
                        </div>
                        <div className="docs-code-block">
                            <pre><code>{`pnpm add @monority/ui`}</code></pre>
                        </div>
                        <div className="docs-code-block">
                            <pre><code>{`yarn add @monority/ui`}</code></pre>
                        </div>
                    </div>
                </div>

                <div className="docs-step">
                    <div className="docs-step__number">2</div>
                    <div className="docs-step__content">
                        <h3>Import the styles</h3>
                        <p>Add the CSS import to your application entry point:</p>
                        <div className="docs-code-block">
                            <pre><code>{`// In your main entry file (e.g., main.tsx)
import '@monority/ui/styles.css'`}</code></pre>
                        </div>
                    </div>
                </div>

                <div className="docs-step">
                    <div className="docs-step__number">3</div>
                    <div className="docs-step__content">
                        <h3>Use components</h3>
                        <p>
                            Import from the main barrel or use sub-path imports for tree-shaking:
                        </p>
                        <div className="docs-code-block">
                            <pre><code>{`// Import from main barrel
import { Button, Modal, Tooltip } from '@monority/ui'

// Or use sub-path imports (recommended for tree-shaking)
import { Button } from '@monority/ui/button'
import { Modal } from '@monority/ui/modal'`}</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <section className="docs-section">
                <h2>Requirements</h2>
                <ul className="docs-list">
                    <li>React 19 or later</li>
                    <li>React DOM 19 or later</li>
                    <li>TypeScript 5.7 or later (recommended)</li>
                </ul>
            </section>

            <section className="docs-section">
                <h2>Next Steps</h2>
                <ul className="docs-list">
                    <li>Browse the <a href="/docs" className="docs-text-link">component documentation</a></li>
                    <li>Explore the <strong>Button</strong> component to get started</li>
                    <li>Check the <strong>layout</strong> section for page structure patterns</li>
                </ul>
            </section>
        </div>
    )
}
