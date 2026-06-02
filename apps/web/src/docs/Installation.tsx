import { DocsCodeBlock } from './components/DocsCodeBlock'

export function Installation() {
  return (
    <div className="docs-page">
      <header className="docs-hero">
        <span className="docs-kicker">Getting Started</span>
        <h1>Installation</h1>
        <p className="docs-description">
          Set up Monority UI in your project, load the shared styles, and start
          composing product-ready screens with the component system.
        </p>
      </header>

      <div className="docs-steps">
        <div className="docs-step">
          <div className="docs-step__number">1</div>
          <div className="docs-step__content">
            <h3>Install the package</h3>
            <p>Choose the package manager that fits your workspace.</p>
            <DocsCodeBlock className="docs-code-block" language="bash">
              npm install @monority/ui
            </DocsCodeBlock>
            <DocsCodeBlock className="docs-code-block" language="bash">
              pnpm add @monority/ui
            </DocsCodeBlock>
            <DocsCodeBlock className="docs-code-block" language="bash">
              yarn add @monority/ui
            </DocsCodeBlock>
          </div>
        </div>

        <div className="docs-step">
          <div className="docs-step__number">2</div>
          <div className="docs-step__content">
            <h3>Import the shared styles</h3>
            <p>Add the base stylesheet once from your application entry point.</p>
            <DocsCodeBlock className="docs-code-block">{`// main.tsx or app entry
import '@monority/ui/styles.css'`}</DocsCodeBlock>
          </div>
        </div>

        <div className="docs-step">
          <div className="docs-step__number">3</div>
          <div className="docs-step__content">
            <h3>Start composing screens</h3>
            <p>
              Import from the main barrel for convenience, or use sub-path
              imports when you want tighter control over tree-shaking.
            </p>
            <DocsCodeBlock className="docs-code-block">{`// Main barrel
import { Button, Modal, Tooltip } from '@monority/ui'

// Sub-path imports
import { Button } from '@monority/ui/button'
import { Modal } from '@monority/ui/modal'`}</DocsCodeBlock>
          </div>
        </div>
      </div>

      <section className="docs-section">
        <h2>Requirements</h2>
        <ul className="docs-list">
          <li>React 19 or later</li>
          <li>React DOM 19 or later</li>
          <li>TypeScript 5.7 or later if you want full type coverage</li>
        </ul>
      </section>

      <section className="docs-section">
        <h2>Next Steps</h2>
        <ul className="docs-list">
          <li>
            Browse the <a href="/docs" className="docs-text-link">component documentation</a>
          </li>
          <li>Open the Button page first if you want a quick integration pass</li>
          <li>Explore layout recipes next for page shells, content bands, and spacing patterns</li>
        </ul>
      </section>
    </div>
  )
}
