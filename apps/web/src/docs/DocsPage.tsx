import { lazy, Suspense, useMemo, type ComponentType } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DocsLayout } from './DocsLayout'
import { Introduction } from './Introduction'
import { Installation } from './Installation'
import { docsComponentRegistry } from './components/registry'
import { DocPageWithToc } from './components/DocPageWithToc'
import { AppHeader } from '@/layouts/AppHeader'

const docModules: Record<string, LazyComponent> = {}

type LazyComponent = React.LazyExoticComponent<ComponentType>

function getDocComponent(slug: string) {
    const redirects: Record<string, string> = {
        'copy-button': 'button',
        'icon-button': 'button',
        'number-input': 'input',
        'password-input': 'input',
    }
    const resolvedSlug = redirects[slug] ?? slug

    if (!docModules[resolvedSlug]) {
        const entry = docsComponentRegistry.find((r) => r.slug === resolvedSlug)
        if (!entry) return null

        const pascalName = resolvedSlug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join('')

        docModules[resolvedSlug] = lazy(() =>
            import(`./components/${resolvedSlug}/index.ts`).then((m) => ({
                default: m[`${pascalName}Docs`],
            }))
        )
    }
    return docModules[resolvedSlug]
}

function LoadingFallback() {
    return (
        <div className="docs-page">
            <div className="docs-hero">
                <span className="docs-kicker">Component</span>
                <h1>Loading...</h1>
            </div>
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
                <Introduction />
            ) : slug === 'installation' ? (
                <Installation />
            ) : DocComponent ? (
                <Suspense fallback={<LoadingFallback />}>
                    <DocPageWithToc key={slug} DocComponent={DocComponent} />
                </Suspense>
            ) : (
                <div className="docs-page">
                    <div className="docs-hero">
                        <span className="docs-kicker">Component</span>
                        <h1>Not Found</h1>
                        <p className="docs-description">
                            No documentation found for this component.
                        </p>
                        <p>
                            <Link to="/docs" className="docs-text-link">
                                Back to the component list
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </DocsLayout>
        </>
    )
}
