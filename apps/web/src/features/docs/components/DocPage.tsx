import { stripLocaleFromPath, useMessages } from '@/shared/i18n'
import { HeroHeader } from '@/shared/components/HeroHeader'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { ComponentPlayground } from './ComponentPlayground'
import type { DocPlaygroundConfig } from './ComponentPlayground/ComponentPlayground.types'
import { DocContainer } from './DocContainer'
import { DocExampleCard } from './DocExampleCard'
import { DocKeyboardTable, type KeyboardShortcutRow } from './DocKeyboardTable'
import { DocPager, type DocPagerTarget } from './DocPager'
import { DocPropTable } from './DocPropTable'
import { DocSection } from './DocSection'
import { DocTagList } from './DocTagList'
import { useLocalizedDoc, type DocI18n } from './doc-messages'
import { docsComponentRegistry } from './registry'

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
    preview?: () => ReactNode
    previewLabel?: string
    playground?: ReactNode
    playgroundConfig?: DocPlaygroundConfig
    props?: PropRow[]
    keyboardNavigation?: KeyboardShortcutRow[]
    cssHooks?: string[]
    tokens?: string[]
    a11y?: string[]
    examples?: DocExample[]
    i18n?: DocI18n
}

export function DocPage({ doc: rawDoc }: { doc: DocPageData }) {
    const location = useLocation()
    const messages = useMessages().docs
    const doc = useLocalizedDoc(rawDoc)
    const Preview = doc.preview

    const slug = stripLocaleFromPath(location.pathname).replace(/^\/docs\/?/, '')
    const currentIndex = docsComponentRegistry.findIndex(
        (item) => item.slug === slug || item.label.toLowerCase() === rawDoc.title.toLowerCase()
    )

    let prevTarget: DocPagerTarget | undefined
    let nextTarget: DocPagerTarget | undefined

    if (currentIndex !== -1) {
        if (currentIndex === 0 || slug === 'button') {
            prevTarget = {
                title: 'Installation',
                description: messages.pager.previous,
                to: '/docs/installation',
            }
        } else if (currentIndex > 0) {
            const prevItem = docsComponentRegistry[currentIndex - 1]
            if (prevItem) {
                prevTarget = {
                    title: prevItem.label,
                    to: prevItem.path,
                }
            }
        }

        if (currentIndex < docsComponentRegistry.length - 1) {
            const nextItem = docsComponentRegistry[currentIndex + 1]
            if (nextItem) {
                nextTarget = {
                    title: nextItem.label,
                    to: nextItem.path,
                }
            }
        }
    }

    return (
        <DocContainer className="docs-page">
            <HeroHeader
                kicker={messages.hero.kicker}
                title={doc.title}
                description={doc.description}
            />

            <DocSection
                id="overview"
                title={messages.sections.overview.title}
                description={messages.sections.overview.description}
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
                ) : Preview ? (
                    <Preview />
                ) : null}
            </DocSection>

            {doc.examples && doc.examples.length > 0 && (
                <DocSection
                    id="examples"
                    title={messages.sections.examples.title}
                    description={messages.sections.examples.description}
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
                    title={messages.sections.api.title}
                    description={messages.sections.api.description}
                >
                    <DocPropTable props={doc.props} />
                </DocSection>
            )}

            {(doc.cssHooks || doc.tokens) && (
                <DocSection
                    id="styling"
                    title={messages.sections.styling.title}
                    description={messages.sections.styling.description}
                >
                    <div className="docs-grid">
                        {doc.cssHooks && doc.cssHooks.length > 0 && (
                            <DocTagList title={messages.sections.cssHooks} tags={doc.cssHooks} />
                        )}
                        {doc.tokens && doc.tokens.length > 0 && (
                            <DocTagList title={messages.sections.tokens} tags={doc.tokens} />
                        )}
                    </div>
                </DocSection>
            )}

            {doc.keyboardNavigation && doc.keyboardNavigation.length > 0 && (
                <DocSection
                    id="keyboard"
                    title={messages.sections.keyboard.title}
                    description={messages.sections.keyboard.description}
                >
                    <DocKeyboardTable shortcuts={doc.keyboardNavigation} />
                </DocSection>
            )}

            {doc.a11y && doc.a11y.length > 0 && (
                <DocSection
                    id="accessibility"
                    title={messages.sections.accessibility.title}
                    description={messages.sections.accessibility.description}
                >
                    <ul className="docs-list">
                        {doc.a11y.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </DocSection>
            )}

            {(prevTarget || nextTarget) && <DocPager prev={prevTarget} next={nextTarget} />}
        </DocContainer>
    )
}
