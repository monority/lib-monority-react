import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github-dark.css'
import '../code-theme.css'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)

export interface PropRow {
  name: string
  type: string
  defaultValue: string
  description: string
}

export interface DocExample {
  title: string
  content: ReactNode
  code?: string
}

export interface DocPageData {
  title: string
  description: string
  importCode?: string
  usageCode?: string
  preview: () => ReactNode
  previewLabel?: string
  props?: PropRow[]
  cssHooks?: string[]
  tokens?: string[]
  a11y?: string[]
  examples?: DocExample[]
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [text])

  return (
    <button className="docs-copy-btn" onClick={copy} aria-label="Copy code">
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}

function HighlightedCode({ code }: { code: string }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) hljs.highlightElement(ref.current)
  }, [code])

  return (
    <pre className="docs-code-pre"><code ref={ref} className="language-tsx">{code}</code></pre>
  )
}

function ExampleCard({ example, index }: { example: DocExample; index: number }) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (example.code && codeRef.current) hljs.highlightElement(codeRef.current)
  }, [example.code])

  return (
    <div className="docs-example-group">
      <h3>{example.title}</h3>
      <div className="docs-example-content">
        {example.content}
      </div>
      {example.code ? (
        <div className="docs-code-area">
          <div className="docs-code-header">
            <span>{example.title.toLowerCase().replace(/\s+/g, '-')}.tsx</span>
            <CopyButton text={example.code} />
          </div>
          <HighlightedCode code={example.code} />
        </div>
      ) : null}
    </div>
  )
}

export function DocPage({ doc }: { doc: DocPageData }) {
  const Preview = doc.preview
  const fullCode = doc.importCode
    ? `${doc.importCode}\n${doc.usageCode || ""}`
    : (doc.usageCode || '')
  const codeRef = useRef<HTMLElement>(null)
  const previewLabel = doc.previewLabel ?? `${doc.title.toLowerCase().replace(/\s+/g, "-")}.tsx`

  useEffect(() => {
    if (codeRef.current && fullCode) hljs.highlightElement(codeRef.current)
  }, [fullCode])

  return (
    <div className="docs-page">
      <header className="docs-hero">
        <span className="docs-kicker">Component</span>
        <h1>{doc.title}</h1>
        <p className="docs-description">{doc.description}</p>
      </header>

      {/* Preview card */}
      {(fullCode || doc.preview) && (
        <div className="docs-preview-card">
          <div className="docs-preview-area">
            <span className="docs-preview-label">{previewLabel}</span>
            <Preview />
          </div>
          {fullCode ? (
            <div className="docs-code-area">
              <div className="docs-code-header">
                <span>index.tsx</span>
                <CopyButton text={fullCode} />
              </div>
              <HighlightedCode code={fullCode} />
            </div>
          ) : null}
        </div>
      )}

      {/* Examples section */}
      {doc.examples && doc.examples.length > 0 && (
        <section className="docs-section">
          <h2>Examples</h2>
          <div className="docs-examples-list">
            {doc.examples.map((ex, i) => (
              <ExampleCard key={i} example={ex} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* API Reference */}
      {doc.props && doc.props.length > 0 && (
        <section className="docs-section">
          <h2>API Reference</h2>
          <div className="docs-table-wrapper">
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
                {doc.props.map((prop) => (
                  <tr key={prop.name}>
                    <td className="docs-prop-name">{prop.name}</td>
                    <td className="docs-prop-type"><code>{prop.type}</code></td>
                    <td className="docs-prop-default"><code>{prop.defaultValue}</code></td>
                    <td className="docs-prop-desc">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Styling */}
      {(doc.cssHooks || doc.tokens) && (
        <section className="docs-section">
          <h2>Styling</h2>
          <div className="docs-grid">
            {doc.cssHooks && doc.cssHooks.length > 0 && (
              <div className="docs-card">
                <h3>CSS Hooks</h3>
                <div className="docs-tag-list">
                  {doc.cssHooks.map((hook) => (
                    <span key={hook} className="docs-tag"><code>{hook}</code></span>
                  ))}
                </div>
              </div>
            )}
            {doc.tokens && doc.tokens.length > 0 && (
              <div className="docs-card">
                <h3>Tokens</h3>
                <div className="docs-tag-list">
                  {doc.tokens.map((token) => (
                    <span key={token} className="docs-tag"><code>{token}</code></span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Accessibility */}
      {doc.a11y && doc.a11y.length > 0 && (
        <section className="docs-section">
          <h2>Accessibility</h2>
          <ul className="docs-list">
            {doc.a11y.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
