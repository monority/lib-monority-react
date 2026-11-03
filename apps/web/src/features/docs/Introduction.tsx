import { CodeViewer } from '@/shared/components/CodeViewer'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { PreviewCanvas } from '@/shared/components/PreviewCanvas'
import { localizePath, useLocale, useMessages } from '@/shared/i18n'
import type { ArchitecturePillarIcon } from '@/shared/i18n/messages/en/guides'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { ThemeScope, type ThemeScopeDensity, type ThemeScopeTheme } from '@monority/ui'
import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { ButtonLink } from '@monority/ui/button-link'
import { Card } from '@monority/ui/card'
import { SegmentedControl } from '@monority/ui/segmented-control'
import { Switch } from '@monority/ui/switch'
import { type MouseEvent, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DocContainer } from './components/DocContainer'
import { DocPager } from './components/DocPager'
import { DocSection } from './components/DocSection'
import { PackageManagerTabs } from './components/PackageManagerTabs'
import { type DocsComponentRegistryItem, docsComponentRegistry } from './components/registry'

const CANONICAL_CATEGORY_ORDER = [
    'actions',
    'forms',
    'navigation',
    'overlays',
    'display',
    'data',
    'feedback',
    'layout',
    'typography',
    'brand',
    'experimental',
] as const

type KnownCategoryKey = (typeof CANONICAL_CATEGORY_ORDER)[number]

function PillarGlyph({ icon }: { icon: ArchitecturePillarIcon | string }) {
    switch (icon) {
        case 'layers':
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                        d="M8 2L14 5.25L8 8.5L2 5.25L8 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M2 8.25L8 11.5L14 8.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M2 11.25L8 14.5L14 11.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            )
        case 'tokens':
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                        d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H13.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                    <circle
                        cx="5.5"
                        cy="4.5"
                        r="1.5"
                        fill="var(--mr-bg-sunken)"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />
                    <circle
                        cx="10.5"
                        cy="8"
                        r="1.5"
                        fill="var(--mr-bg-sunken)"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />
                    <circle
                        cx="7"
                        cy="11.5"
                        r="1.5"
                        fill="var(--mr-bg-sunken)"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            )
        case 'accessibility':
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect
                        x="2"
                        y="3.5"
                        width="12"
                        height="9"
                        rx="1.75"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M5 6.75H5.01M8 6.75H8.01M11 6.75H11.01M5 9.75H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            )
        case 'modular':
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect
                        x="2.25"
                        y="2.25"
                        width="4.75"
                        height="4.75"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />
                    <rect
                        x="9"
                        y="2.25"
                        width="4.75"
                        height="4.75"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />
                    <rect
                        x="2.25"
                        y="9"
                        width="4.75"
                        height="4.75"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M11.375 9V13.75M9 11.375H13.75"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            )
    }
}

export function Introduction() {
    const { locale } = useLocale()
    const navigate = useNavigate()
    const allMessages = useMessages()
    const messages = allMessages.guides.introduction
    const docsMessages = allMessages.docs

    const [previewTheme, setPreviewTheme] = useState<ThemeScopeTheme>('dark')
    const [previewDensity, setPreviewDensity] = useState<ThemeScopeDensity>('comfortable')
    const [strictContrast, setStrictContrast] = useState(true)

    const canonicalPath = localizePath('/docs', locale)
    usePageSeo({
        title: messages.hero.title,
        description: messages.hero.description,
        canonicalPath,
    })

    const installationPath = localizePath('/docs/installation', locale)
    const explorePath = localizePath('/docs/button', locale)

    function handleSpaLinkClick(targetPath: string) {
        return (event: MouseEvent<HTMLAnchorElement>) => {
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return
            }
            event.preventDefault()
            navigate(targetPath)
        }
    }

    const groupedCategories = useMemo(() => {
        const buckets = new Map<string, DocsComponentRegistryItem[]>()
        for (const entry of docsComponentRegistry) {
            const list = buckets.get(entry.category)
            if (list) {
                list.push(entry)
            } else {
                buckets.set(entry.category, [entry])
            }
        }

        const orderedKeys: string[] = [
            ...CANONICAL_CATEGORY_ORDER.filter((key) => buckets.has(key)),
            ...[...buckets.keys()].filter(
                (key) => !CANONICAL_CATEGORY_ORDER.includes(key as KnownCategoryKey)
            ),
        ]

        return orderedKeys.map((key) => {
            const meta = (
                docsMessages.categories as Record<
                    string,
                    { title: string; description: string } | undefined
                >
            )[key]
            return {
                key,
                title: meta?.title ?? key,
                description: meta?.description ?? '',
                items: buckets.get(key) ?? [],
            }
        })
    }, [docsMessages.categories])

    const quickstartCode = `import '@monority/ui/styles.css'
import { Badge, Button, Card, Switch, ThemeScope } from '@monority/ui'

export function WorkspacePolicyCard() {
  return (
    <ThemeScope theme="${previewTheme}" density="${previewDensity}">
      <Card padding="md">
        <Card.Header>
          <Badge tone="accent" dot size="sm">${messages.quickstart.sampleCard.badge}</Badge>
          <Card.Title>${messages.quickstart.sampleCard.title}</Card.Title>
          <Card.Description>${messages.quickstart.sampleCard.description}</Card.Description>
        </Card.Header>
        <Card.Content>
          <Switch defaultChecked label="${messages.quickstart.sampleCard.switchLabel}" />
        </Card.Content>
        <Card.Footer>
          <Button variant="secondary" size="sm">${messages.quickstart.sampleCard.secondaryAction}</Button>
          <Button variant="primary" size="sm">${messages.quickstart.sampleCard.primaryAction}</Button>
        </Card.Footer>
      </Card>
    </ThemeScope>
  )
}`

    return (
        <DocContainer className="docs-page">
            <div className="docs-guide-masthead">
                <HeroHeader
                    kicker={messages.hero.kicker}
                    title={messages.hero.title}
                    description={messages.hero.description}
                    actions={
                        <div className="docs-hero-actions">
                            <ButtonLink
                                href={installationPath}
                                variant="primary"
                                size="md"
                                onClick={handleSpaLinkClick(installationPath)}
                            >
                                {messages.hero.installCta}
                            </ButtonLink>
                            <ButtonLink
                                href={explorePath}
                                variant="secondary"
                                size="md"
                                onClick={handleSpaLinkClick(explorePath)}
                            >
                                {messages.hero.exploreCta}
                            </ButtonLink>
                        </div>
                    }
                />

                <dl className="docs-telemetry" aria-label={messages.telemetry.ariaLabel}>
                    <div className="docs-telemetry__item">
                        <dt className="docs-telemetry__label">
                            {messages.telemetry.componentsLabel}
                        </dt>
                        <dd className="docs-telemetry__value">{docsComponentRegistry.length}</dd>
                        <dd className="docs-telemetry__detail">
                            {messages.telemetry.componentsDetail}
                        </dd>
                    </div>
                    <div className="docs-telemetry__item">
                        <dt className="docs-telemetry__label">{messages.telemetry.themesLabel}</dt>
                        <dd className="docs-telemetry__value">{messages.telemetry.themesValue}</dd>
                        <dd className="docs-telemetry__detail">
                            {messages.telemetry.themesDetail}
                        </dd>
                    </div>
                    <div className="docs-telemetry__item">
                        <dt className="docs-telemetry__label">{messages.telemetry.layersLabel}</dt>
                        <dd className="docs-telemetry__value">{messages.telemetry.layersValue}</dd>
                        <dd className="docs-telemetry__detail">
                            {messages.telemetry.layersDetail}
                        </dd>
                    </div>
                    <div className="docs-telemetry__item">
                        <dt className="docs-telemetry__label">{messages.telemetry.reactLabel}</dt>
                        <dd className="docs-telemetry__value">{messages.telemetry.reactValue}</dd>
                        <dd className="docs-telemetry__detail">{messages.telemetry.reactDetail}</dd>
                    </div>
                </dl>
            </div>

            <DocSection
                id="architecture"
                kicker={messages.architecture.kicker}
                title={messages.architecture.title}
                description={messages.architecture.description}
            >
                <div className="docs-pillars-grid">
                    {messages.architecture.pillars.map((pillar) => (
                        <article key={pillar.tag} className="docs-pillar-card">
                            <div className="docs-pillar-card__meta">
                                <span className="docs-pillar-card__icon">
                                    <PillarGlyph icon={pillar.icon} />
                                </span>
                                <span className="docs-pillar-card__tag">{pillar.tag}</span>
                            </div>
                            <h3 className="docs-pillar-card__title">{pillar.title}</h3>
                            <p className="docs-pillar-card__desc">{pillar.description}</p>
                        </article>
                    ))}
                </div>
            </DocSection>

            <DocSection
                id="quickstart"
                kicker={messages.quickstart.kicker}
                title={messages.quickstart.title}
                description={messages.quickstart.description}
            >
                <div className="docs-guide-stack">
                    <PackageManagerTabs packageName="@monority/ui" />

                    <PreviewCanvas
                        label={messages.quickstart.previewLabel}
                        ariaLabel={messages.quickstart.previewLabel}
                        padding="md"
                        actions={
                            <div className="docs-preview-controls">
                                <SegmentedControl
                                    size="sm"
                                    value={previewTheme}
                                    onChange={(next) => setPreviewTheme(next as ThemeScopeTheme)}
                                    aria-label={messages.quickstart.themeControlLabel}
                                    options={[
                                        { value: 'dark', label: messages.quickstart.themes.dark },
                                        { value: 'light', label: messages.quickstart.themes.light },
                                        { value: 'ocean', label: messages.quickstart.themes.ocean },
                                        {
                                            value: 'high-contrast',
                                            label: messages.quickstart.themes.highContrast,
                                        },
                                    ]}
                                />
                                <SegmentedControl
                                    size="sm"
                                    value={previewDensity}
                                    onChange={(next) =>
                                        setPreviewDensity(next as ThemeScopeDensity)
                                    }
                                    aria-label={messages.quickstart.densityControlLabel}
                                    options={[
                                        {
                                            value: 'comfortable',
                                            label: messages.quickstart.densities.comfortable,
                                        },
                                        {
                                            value: 'compact',
                                            label: messages.quickstart.densities.compact,
                                        },
                                    ]}
                                />
                            </div>
                        }
                    >
                        <ThemeScope
                            theme={previewTheme}
                            density={previewDensity}
                            className="docs-intro-scope"
                        >
                            <Card padding="md">
                                <Card.Header>
                                    <div className="docs-sample-card__top">
                                        <span className="docs-sample-card__kicker">
                                            {messages.quickstart.sampleCard.kicker}
                                        </span>
                                        <Badge tone="accent" dot size="sm">
                                            {messages.quickstart.sampleCard.badge}
                                        </Badge>
                                    </div>
                                    <Card.Title>{messages.quickstart.sampleCard.title}</Card.Title>
                                    <Card.Description>
                                        {messages.quickstart.sampleCard.description}
                                    </Card.Description>
                                </Card.Header>
                                <Card.Content>
                                    <Switch
                                        size="sm"
                                        checked={strictContrast}
                                        onChange={(event) =>
                                            setStrictContrast(event.target.checked)
                                        }
                                        label={messages.quickstart.sampleCard.switchLabel}
                                        hint={messages.quickstart.sampleCard.switchHint}
                                    />
                                </Card.Content>
                                <Card.Footer className="docs-sample-card__actions">
                                    <Button variant="secondary" size="sm">
                                        {messages.quickstart.sampleCard.secondaryAction}
                                    </Button>
                                    <Button variant="primary" size="sm">
                                        {messages.quickstart.sampleCard.primaryAction}
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </ThemeScope>
                    </PreviewCanvas>

                    <CodeViewer code={quickstartCode} filename="App.tsx" language="tsx" />
                </div>
            </DocSection>

            <DocSection
                id="categories"
                kicker={messages.categories.kicker}
                title={messages.categories.title}
                description={messages.categories.description}
            >
                <div className="docs-categories-grid">
                    {groupedCategories.map((group) => (
                        <article key={group.key} className="docs-category-card">
                            <div className="docs-category-card__header">
                                <h3 className="docs-category-card__title">{group.title}</h3>
                                <span className="docs-category-card__count">
                                    {messages.categories.countUnit(group.items.length)}
                                </span>
                            </div>
                            {group.description ? (
                                <p className="docs-category-card__desc">{group.description}</p>
                            ) : null}
                            <div className="docs-category-card__chips">
                                {group.items.map((item) => (
                                    <Link
                                        key={item.slug}
                                        to={localizePath(item.path, locale)}
                                        className="docs-category-chip"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </DocSection>

            <DocPager
                next={{
                    title: docsMessages.guides.installation,
                    description: messages.pager.nextDescription,
                    to: '/docs/installation',
                }}
            />
        </DocContainer>
    )
}
