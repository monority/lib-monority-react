import { AppHeader } from '@/shared/layouts/AppHeader'
import { localizePath, stripLocaleFromPath, useLocale, useMessages } from '@/shared/i18n'
import { type ComponentType, Suspense, lazy } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DocsLayout } from './DocsLayout'
import { Installation } from './Installation'
import { Introduction } from './Introduction'
import { DocPageWithToc } from './components/DocPageWithToc'
import { docsComponentRegistry } from './components/registry'

import { HeroHeader } from '@/shared/components/HeroHeader'

const docModules: Record<string, LazyComponent> = {}

type LazyComponent = React.LazyExoticComponent<ComponentType>

function getDocComponent(slug: string) {
    if (!docModules[slug]) {
        const entry = docsComponentRegistry.find((r) => r.slug === slug)
        if (!entry) return null

        const pascalName = slug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join('')

        docModules[slug] = lazy(() =>
            import(`./components/${slug}/index.ts`).then((m) => ({
                default: m[`${pascalName}Docs`],
            }))
        )
    }
    return docModules[slug]
}

function LoadingFallback() {
    const messages = useMessages().docs.hero

    return (
        <div className="docs-page">
            <HeroHeader kicker={messages.kicker} title={messages.loading} />
        </div>
    )
}

export function DocsPage() {
    const location = useLocation()
    const { locale } = useLocale()
    const messages = useMessages().docs.hero
    const slug = stripLocaleFromPath(location.pathname).replace(/^\/docs\/?/, '') || undefined

    const DocComponent = slug ? getDocComponent(slug) : null

    return (
        <>
            <AppHeader />
            <DocsLayout>
                {!slug ? (
                    <DocPageWithToc key="introduction" DocComponent={Introduction} />
                ) : slug === 'installation' ? (
                    <DocPageWithToc key="installation" DocComponent={Installation} />
                ) : DocComponent ? (
                    <Suspense fallback={<LoadingFallback />}>
                        <DocPageWithToc key={slug} DocComponent={DocComponent} />
                    </Suspense>
                ) : (
                    <div className="docs-page">
                        <HeroHeader
                            kicker={messages.kicker}
                            title={messages.notFoundTitle}
                            description={messages.notFoundDescription}
                            actions={
                                <Link to={localizePath('/docs', locale)} className="docs-text-link">
                                    {messages.backToComponents}
                                </Link>
                            }
                        />
                    </div>
                )}
            </DocsLayout>
        </>
    )
}
