import type { ReactNode } from 'react'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { PreviewCanvas } from '@/shared/components/PreviewCanvas'
import { CodeViewer } from '@/shared/components/CodeViewer'
import { DocPropTable } from './DocPropTable'
import { DocTagList } from './DocTagList'
import { DocExampleCard } from './DocExampleCard'

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

export function DocPage({ doc }: { doc: DocPageData }) {
    const Preview = doc.preview
    const fullCode = doc.importCode
        ? `${doc.importCode}\n${doc.usageCode || ''}`
        : doc.usageCode || ''
    const previewLabel = doc.previewLabel ?? `${doc.title.toLowerCase().replace(/\s+/g, '-')}.tsx`

    return (
        <div className="docs-page">
            <HeroHeader kicker="Component" title={doc.title} description={doc.description} />

            <div className="docs-preview-stack">
                <PreviewCanvas label={previewLabel} padding="none">
                    <div className="docs-preview-content">
                        <Preview />
                    </div>
                </PreviewCanvas>
                {fullCode ? <CodeViewer code={fullCode} filename="index.tsx" /> : null}
            </div>

            {doc.examples && doc.examples.length > 0 && (
                <section className="docs-section">
                    <h2>Examples</h2>
                    <div className="docs-examples-list">
                        {doc.examples.map((example) => (
                            <DocExampleCard key={example.title} example={example} />
                        ))}
                    </div>
                </section>
            )}

            {doc.props && doc.props.length > 0 && <DocPropTable props={doc.props} />}

            {(doc.cssHooks || doc.tokens) && (
                <section className="docs-section">
                    <h2>Styling</h2>
                    <div className="docs-grid">
                        {doc.cssHooks && doc.cssHooks.length > 0 && (
                            <DocTagList title="CSS Hooks" tags={doc.cssHooks} />
                        )}
                        {doc.tokens && doc.tokens.length > 0 && (
                            <DocTagList title="Tokens" tags={doc.tokens} />
                        )}
                    </div>
                </section>
            )}

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
