import type { ReactNode } from 'react'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { PreviewCanvas } from '@/shared/components/PreviewCanvas'
import { CodeViewer } from '@/shared/components/CodeViewer'
import { ComponentPlayground } from './ComponentPlayground'
import type { DocPlaygroundConfig } from './ComponentPlayground/ComponentPlayground.types'
import { DocContainer } from './DocContainer'
import { DocSection } from './DocSection'
import { DocPropTable } from './DocPropTable'
import { DocTagList } from './DocTagList'
import { DocExampleCard } from './DocExampleCard'
import { DocKeyboardTable, type KeyboardShortcutRow } from './DocKeyboardTable'

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
    playground?: ReactNode
    playgroundConfig?: DocPlaygroundConfig
    props?: PropRow[]
    keyboardNavigation?: KeyboardShortcutRow[]
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
                title="Apercu"
                description="Demonstration interactive et code d'integration."
            >
                {doc.playgroundConfig ? (
                    <ComponentPlayground
                        componentName={doc.title}
                        importCode={doc.importCode}
                        controls={doc.playgroundConfig.controls}
                        render={doc.playgroundConfig.render}
                        getCode={doc.playgroundConfig.getCode}
                        initialValues={doc.playgroundConfig.initialValues}
                    />
                ) : doc.playground ? (
                    doc.playground
                ) : (
                    <div className="docs-preview-stack docs-preview-card">
                        <PreviewCanvas label={previewLabel} padding="none">
                            <div className="docs-preview-area docs-preview-content">
                                <Preview />
                            </div>
                        </PreviewCanvas>
                        {fullCode ? <CodeViewer code={fullCode} filename="index.tsx" /> : null}
                    </div>
                )}
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

            {doc.keyboardNavigation && doc.keyboardNavigation.length > 0 && (
                <DocSection
                    id="keyboard"
                    title="Navigation au clavier"
                    description="Raccourcis et comportements au clavier conformes WAI-ARIA."
                >
                    <DocKeyboardTable shortcuts={doc.keyboardNavigation} />
                </DocSection>
            )}

            {doc.a11y && doc.a11y.length > 0 && (
                <DocSection
                    id="accessibility"
                    title="Accessibilite & Recommandations"
                    description="Comportements WAI-ARIA, roles et gestion des lecteurs d'ecran."
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
