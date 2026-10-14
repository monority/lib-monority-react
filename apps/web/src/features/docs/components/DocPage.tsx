import type { ReactNode } from 'react'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { PreviewCanvas } from '@/shared/components/PreviewCanvas'
import { CodeViewer } from '@/shared/components/CodeViewer'
import { DocContainer } from './DocContainer'
import { DocSection } from './DocSection'
import { DocPropTable } from './DocPropTable'
import { DocTagList } from './DocTagList'
import { DocExampleCard } from './DocExampleCard'

export interface PropRow extends Record<string, unknown> {
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
        <DocContainer className="docs-page">
            <HeroHeader kicker="Component" title={doc.title} description={doc.description} />

            <DocSection
                id="overview"
                title="Aperçu"
                description="Démonstration interactive et code d'intégration."
            >
                <div className="docs-preview-stack">
                    <PreviewCanvas label={previewLabel} padding="none">
                        <div className="docs-preview-area docs-preview-content">
                            <Preview />
                        </div>
                    </PreviewCanvas>
                    {fullCode ? <CodeViewer code={fullCode} filename="index.tsx" /> : null}
                </div>
            </DocSection>

            {doc.examples && doc.examples.length > 0 && (
                <DocSection
                    id="examples"
                    title="Exemples"
                    description="Variantes et modes d'usage fréquents."
                >
                    <div className="docs-examples-list">
                        {doc.examples.map((example) => (
                            <DocExampleCard key={example.title} example={example} />
                        ))}
                    </div>
                </DocSection>
            )}

            {doc.props && doc.props.length > 0 && (
                <DocSection
                    id="api"
                    title="Propriétés & API"
                    description="Contrat d'interface et typage TypeScript des options acceptées."
                >
                    <DocPropTable props={doc.props} />
                </DocSection>
            )}

            {(doc.cssHooks || doc.tokens) && (
                <DocSection
                    id="styling"
                    title="Personnalisation & Tokens"
                    description="Classes CSS documentées et variables de conception associées."
                >
                    <div className="docs-grid">
                        {doc.cssHooks && doc.cssHooks.length > 0 && (
                            <DocTagList title="CSS Hooks" tags={doc.cssHooks} />
                        )}
                        {doc.tokens && doc.tokens.length > 0 && (
                            <DocTagList title="Tokens" tags={doc.tokens} />
                        )}
                    </div>
                </DocSection>
            )}

            {doc.a11y && doc.a11y.length > 0 && (
                <DocSection
                    id="accessibility"
                    title="Accessibilité & Clavier"
                    description="Comportements WAI-ARIA, navigation au clavier et gestion du focus."
                >
                    <ul className="docs-list">
                        {doc.a11y.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </DocSection>
            )}
        </DocContainer>
    )
}
