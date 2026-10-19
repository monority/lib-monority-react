import { AppHeader } from '@/shared/layouts/AppHeader'
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
    return (
        <div className="docs-page">
            <HeroHeader kicker="Component" title="Loading..." />
        </div>
    )
}

export function DocsPage() {
    const location = useLocation()
    const slug = location.pathname.replace(/^\/docs\/?/, '') || undefined

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
                            kicker="Component"
                            title="Not Found"
                            description="No documentation found for this component."
                            actions={
                                <Link to="/docs" className="docs-text-link">
                                    Back to the component list
                                </Link>
                            }
                        />
                    </div>
                )}
            </DocsLayout>
        </>
    )
}
