import { CodeViewer } from '@/shared/components/CodeViewer'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { localizePath, useLocale, useMessages } from '@/shared/i18n'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { Callout } from '@monority/ui/callout'
import { Tabs } from '@monority/ui/tabs'
import { DocContainer } from './components/DocContainer'
import { DocPager } from './components/DocPager'
import { DocSection } from './components/DocSection'
import { PackageManagerTabs } from './components/PackageManagerTabs'

const MAIN_CSS_SNIPPET = `// src/main.tsx or app/layout.tsx
import '@monority/ui/styles.css'`

const LAYER_ORDER_SNIPPET = `@layer mr.reset, mr.base, mr.tokens, mr.themes, mr.components, mr.utilities, app;

@import '@monority/ui/styles.css';

@layer app {
  /* Application layer rules evaluated after every mr.* layer */
}`

const PROVIDERS_SNIPPET = `import { ThemeProvider, ToastProvider } from '@monority/ui'
import type { ReactNode } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  )
}`

const HEAD_SCRIPT_SNIPPET = `import { getThemeScript } from '@monority/ui/get-theme-script'

export function HeadThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
}`

const IMPORTS_SNIPPET = `// 1. Main entry point — compose multiple primitives and hooks quickly
import { Button, Card, Modal, useTheme } from '@monority/ui'

// 2. Dedicated subpaths — isolated component boundaries for minimal bundles
import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Modal } from '@monority/ui/modal'`

const TSCONFIG_SNIPPET = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true
  }
}`

const VITE_INDEX_HTML_SNIPPET = `<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Monority App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`

const VITE_MAIN_SNIPPET = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@monority/ui/styles.css'
import { ThemeProvider, ToastProvider } from '@monority/ui'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
)`

const NEXT_PROVIDERS_SNIPPET = `'use client'

import { ThemeProvider, ToastProvider } from '@monority/ui'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  )
}`

const NEXT_LAYOUT_SNIPPET = `import '@monority/ui/styles.css'
import { getThemeScript } from '@monority/ui/get-theme-script'
import type { ReactNode } from 'react'
import { Providers } from './providers'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}`

export function Installation() {
    const { locale } = useLocale()
    const allMessages = useMessages()
    const messages = allMessages.guides.installation
    const docsMessages = allMessages.docs

    usePageSeo({
        title: messages.hero.title,
        description: messages.hero.description,
        canonicalPath: localizePath('/docs/installation', locale),
    })

    return (
        <DocContainer className="docs-page">
            <div className="docs-guide-masthead">
                <HeroHeader
                    kicker={messages.hero.kicker}
                    title={messages.hero.title}
                    description={messages.hero.description}
                />

                <dl className="docs-telemetry" aria-label={messages.telemetry.ariaLabel}>
                    <div className="docs-telemetry__item">
                        <dt className="docs-telemetry__label">{messages.telemetry.reactLabel}</dt>
                        <dd className="docs-telemetry__value">{messages.telemetry.reactValue}</dd>
                        <dd className="docs-telemetry__detail">{messages.telemetry.reactDetail}</dd>
                    </div>
                    <div className="docs-telemetry__item">
                        <dt className="docs-telemetry__label">{messages.telemetry.tsLabel}</dt>
                        <dd className="docs-telemetry__value">{messages.telemetry.tsValue}</dd>
                        <dd className="docs-telemetry__detail">{messages.telemetry.tsDetail}</dd>
                    </div>
                    <div className="docs-telemetry__item">
                        <dt className="docs-telemetry__label">{messages.telemetry.cssLabel}</dt>
                        <dd className="docs-telemetry__value docs-telemetry__value--code">
                            {messages.telemetry.cssValue}
                        </dd>
                        <dd className="docs-telemetry__detail">{messages.telemetry.cssDetail}</dd>
                    </div>
                    <div className="docs-telemetry__item">
                        <dt className="docs-telemetry__label">{messages.telemetry.bundleLabel}</dt>
                        <dd className="docs-telemetry__value docs-telemetry__value--code">
                            {messages.telemetry.bundleValue}
                        </dd>
                        <dd className="docs-telemetry__detail">
                            {messages.telemetry.bundleDetail}
                        </dd>
                    </div>
                </dl>
            </div>

            <DocSection
                id="install"
                kicker={messages.install.kicker}
                title={messages.install.title}
                description={messages.install.description}
            >
                <PackageManagerTabs packageName="@monority/ui" />
            </DocSection>

            <DocSection
                id="styles"
                kicker={messages.styles.kicker}
                title={messages.styles.title}
                description={messages.styles.description}
            >
                <div className="docs-guide-stack">
                    <CodeViewer code={MAIN_CSS_SNIPPET} filename="src/main.tsx" language="tsx" />

                    <div className="docs-contract-group">
                        <p className="docs-instrument-label">{messages.styles.entrypointsLabel}</p>
                        <ul className="docs-contract-list">
                            {messages.styles.entrypoints.map((entry) => (
                                <li key={entry.path} className="docs-contract-item">
                                    <div className="docs-contract-item__head">
                                        <code className="docs-contract-item__code">
                                            {entry.path}
                                        </code>
                                        <span className="docs-contract-item__badge">
                                            {entry.badge}
                                        </span>
                                    </div>
                                    <p className="docs-contract-item__desc">{entry.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="docs-subnote">
                        <h3 className="docs-subnote__title">{messages.styles.layerNoteTitle}</h3>
                        <p className="docs-subnote__desc">{messages.styles.layerNoteDescription}</p>
                    </div>

                    <CodeViewer
                        code={LAYER_ORDER_SNIPPET}
                        filename="src/styles/app.css"
                        language="css"
                    />
                </div>
            </DocSection>

            <DocSection
                id="providers"
                kicker={messages.providers.kicker}
                title={messages.providers.title}
                description={messages.providers.description}
            >
                <div className="docs-guide-stack">
                    <CodeViewer
                        code={PROVIDERS_SNIPPET}
                        filename="src/providers/AppProviders.tsx"
                        language="tsx"
                    />

                    <ul className="docs-contract-list">
                        {messages.providers.contracts.map((contract) => (
                            <li key={contract.tag} className="docs-contract-item">
                                <div className="docs-contract-item__head">
                                    <code className="docs-contract-item__code">{contract.tag}</code>
                                </div>
                                <p className="docs-contract-item__desc">{contract.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </DocSection>

            <DocSection
                id="ssr-hydration"
                kicker={messages.ssr.kicker}
                title={messages.ssr.title}
                description={messages.ssr.description}
            >
                <CodeViewer
                    code={HEAD_SCRIPT_SNIPPET}
                    filename="src/components/HeadThemeScript.tsx"
                    language="tsx"
                />
            </DocSection>

            <DocSection
                id="imports"
                kicker={messages.imports.kicker}
                title={messages.imports.title}
                description={messages.imports.description}
            >
                <div className="docs-guide-stack">
                    <CodeViewer code={IMPORTS_SNIPPET} filename="src/App.tsx" language="tsx" />

                    <Callout
                        tone="info"
                        size="md"
                        title={messages.imports.calloutTitle}
                        description={messages.imports.calloutDescription}
                    />

                    <div className="docs-contract-group">
                        <p className="docs-instrument-label">{messages.imports.tsconfigLabel}</p>
                        <CodeViewer
                            code={TSCONFIG_SNIPPET}
                            filename="tsconfig.json"
                            language="json"
                        />
                    </div>
                </div>
            </DocSection>

            <DocSection
                id="frameworks"
                kicker={messages.frameworks.kicker}
                title={messages.frameworks.title}
                description={messages.frameworks.description}
            >
                <Tabs
                    defaultValue="vite"
                    size="sm"
                    aria-label={messages.frameworks.tabsAriaLabel}
                    items={[
                        { value: 'vite', label: messages.frameworks.viteTab },
                        { value: 'nextjs', label: messages.frameworks.nextTab },
                    ]}
                >
                    <Tabs.List>
                        <Tabs.Trigger value="vite">{messages.frameworks.viteTab}</Tabs.Trigger>
                        <Tabs.Trigger value="nextjs">{messages.frameworks.nextTab}</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="vite">
                        <div className="docs-framework-panel">
                            <p className="docs-subnote__desc">
                                {messages.frameworks.viteDescription}
                            </p>
                            <CodeViewer
                                code={VITE_INDEX_HTML_SNIPPET}
                                filename="index.html"
                                language="xml"
                            />
                            <CodeViewer
                                code={VITE_MAIN_SNIPPET}
                                filename="src/main.tsx"
                                language="tsx"
                            />
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="nextjs">
                        <div className="docs-framework-panel">
                            <p className="docs-subnote__desc">
                                {messages.frameworks.nextDescription}
                            </p>
                            <CodeViewer
                                code={NEXT_PROVIDERS_SNIPPET}
                                filename="app/providers.tsx"
                                language="tsx"
                            />
                            <CodeViewer
                                code={NEXT_LAYOUT_SNIPPET}
                                filename="app/layout.tsx"
                                language="tsx"
                            />
                        </div>
                    </Tabs.Content>
                </Tabs>
            </DocSection>

            <DocPager
                prev={{
                    title: docsMessages.guides.introduction,
                    description: messages.pager.prevDescription,
                    to: '/docs',
                }}
                next={{
                    title: 'Button',
                    description: messages.pager.nextDescription,
                    to: '/docs/button',
                }}
            />
        </DocContainer>
    )
}
