import { lazy, Suspense, useMemo, type ComponentType } from 'react'
import { useLocation } from 'react-router-dom'
import { DocsLayout } from './DocsLayout'
import { Introduction } from './Introduction'
import { docsComponentRegistry } from './components/registry'

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
    const entry = docsComponentRegistry.find(r => r.slug === resolvedSlug)
    if (!entry) return null

    const pascalName = resolvedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')

    docModules[resolvedSlug] = lazy(() =>
      import(`./components/${resolvedSlug}/index.ts`).then(m => ({ default: m[`${pascalName}Docs`] }))
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
    <DocsLayout>
      {!slug ? (
        <Introduction />
      ) : DocComponent ? (
        <Suspense fallback={<LoadingFallback />}>
          <DocComponent />
        </Suspense>
      ) : (
        <div className="docs-page">
          <div className="docs-hero">
            <span className="docs-kicker">Component</span>
            <h1>Not Found</h1>
            <p className="docs-description">No documentation found for this component.</p>
          </div>
        </div>
      )}
    </DocsLayout>
  )
}
