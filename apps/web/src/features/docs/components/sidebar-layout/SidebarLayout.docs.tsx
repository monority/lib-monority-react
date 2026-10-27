import { Avatar } from '@monority/ui/avatar'
import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Input } from '@monority/ui/input'
import { SidebarLayout } from '@monority/ui/sidebar-layout'
import { StatCard } from '@monority/ui/stat-card'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    SidebarLayoutWidthsExample,
    SidebarLayoutWithContentExample,
} from './SidebarLayout.examples'

type NavItem = {
    id: string
    label: string
    badge?: { label: string; variant?: 'primary' | 'default'; tone?: 'accent' | 'neutral' }
}

const NAV_ITEMS: NavItem[] = [
    { id: 'overview', label: 'Tableau de bord' },
    { id: 'deploy', label: 'Déploiements', badge: { label: '8', variant: 'primary' } },
    { id: 'analytics', label: 'Analytique', badge: { label: 'Live', tone: 'accent' } },
    { id: 'alerts', label: 'Alertes & Logs', badge: { label: '3', tone: 'neutral' } },
    { id: 'team', label: 'Équipe & Rôles' },
]

const rowStyle = { display: 'flex', alignItems: 'center', gap: 'var(--mr-space-2)' } as const

function WorkspaceNavItem({
    item,
    active,
    onSelect,
}: {
    item: NavItem
    active: boolean
    onSelect: (id: string) => void
}) {
    return (
        <Button
            variant={active ? 'secondary' : 'ghost'}
            size="sm"
            fullWidth
            aria-current={active ? 'page' : undefined}
            onClick={() => onSelect(item.id)}
            style={{ paddingInline: 'var(--mr-space-3)' }}
        >
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    inlineSize: '100%',
                    gap: 'var(--mr-space-3)',
                }}
            >
                <span>{item.label}</span>
                {item.badge ? (
                    <Badge
                        variant={item.badge.variant ?? 'default'}
                        tone={item.badge.tone}
                        size="sm"
                    >
                        {item.badge.label}
                    </Badge>
                ) : null}
            </span>
        </Button>
    )
}

function SidebarLayoutPlayground() {
    const [sidebarWidth, setSidebarWidth] = useState<'sm' | 'md' | 'lg'>('md')
    const [showHeader, setShowHeader] = useState(true)
    const [activeNav, setActiveNav] = useState('overview')

    const snippet = `// collapsible insere automatiquement le bouton de bascule en tete du header.
<SidebarLayout
  sidebarWidth="${sidebarWidth}"
  collapsible
  sidebar={
    <nav aria-label="Espace de travail">
      <Input size="sm" placeholder="Rechercher..." />
      {items.map((item) => (
        <Button
          key={item.id}
          variant={item.id === active ? 'secondary' : 'ghost'}
          size="sm"
          fullWidth
          aria-current={item.id === active ? 'page' : undefined}
          onClick={() => setActive(item.id)}
        >
          {item.label}
          {item.badge ? <Badge size="sm">{item.badge}</Badge> : null}
        </Button>
      ))}
    </nav>
  }${
      showHeader
          ? `
  header={
    <>
      <Text size="sm" tone="strong">Infrastructure / Télémétrie Edge</Text>
      <Badge tone="success" size="sm">Opérationnel</Badge>
      <Button variant="primary" size="sm">Déployer</Button>
    </>
  }`
          : ''
  }
>
  <StatCard label="Trafic Réseau" value="14.8 GB/s" trend="+12.4%" trendTone="success" />
</SidebarLayout>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Largeur barre latérale',
                    value: sidebarWidth,
                    options: [
                        { value: 'sm', label: 'Étroite (sm)' },
                        { value: 'md', label: 'Standard (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                    ],
                    onChange: (v) => setSidebarWidth(v as 'sm' | 'md' | 'lg'),
                },
                {
                    type: 'boolean',
                    label: 'Afficher en-tête',
                    value: showHeader,
                    onChange: setShowHeader,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    minHeight: 380,
                    border: '1px solid var(--mr-border-subtle)',
                    borderRadius: 'var(--mr-radius-md)',
                    overflow: 'hidden',
                    background: 'var(--mr-bg-surface)',
                }}
            >
                <SidebarLayout
                    sidebarWidth={sidebarWidth}
                    collapsible
                    sidebar={
                        <nav
                            aria-label="Espace de travail"
                            style={{
                                padding: 'var(--mr-space-3)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                gap: 'var(--mr-space-3)',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div style={rowStyle}>
                                <Avatar name="Monority Cloud" size="sm">
                                    MC
                                </Avatar>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                    <Text
                                        tone="strong"
                                        size="sm"
                                        style={{ display: 'block', lineHeight: 1.2 }}
                                    >
                                        Monority Cloud
                                    </Text>
                                    <Text tone="muted" size="sm">
                                        Workspace Pro
                                    </Text>
                                </div>
                                <Badge variant="default" tone="accent" size="sm">
                                    v2.4
                                </Badge>
                            </div>

                            <Input size="sm" placeholder="Rechercher..." />

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--mr-space-1)',
                                    flex: 1,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 'var(--mr-font-size-xs)',
                                        textTransform: 'uppercase',
                                        letterSpacing: 'var(--mr-tracking-label)',
                                        color: 'var(--mr-text-tertiary)',
                                        fontWeight: 'var(--mr-font-weight-semibold)',
                                        marginBlock: 'var(--mr-space-1)',
                                    }}
                                >
                                    Plateforme
                                </div>
                                {NAV_ITEMS.map((item) => (
                                    <WorkspaceNavItem
                                        key={item.id}
                                        item={item}
                                        active={item.id === activeNav}
                                        onSelect={setActiveNav}
                                    />
                                ))}
                            </div>

                            <div
                                style={{
                                    ...rowStyle,
                                    paddingTop: 'var(--mr-space-2)',
                                    borderTop: '1px solid var(--mr-border-subtle)',
                                }}
                            >
                                <Avatar name="Jane Doe" size="sm" status="online">
                                    JD
                                </Avatar>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                    <Text size="sm" tone="strong" style={{ display: 'block' }}>
                                        Jane Doe
                                    </Text>
                                    <Text size="sm" tone="muted">
                                        Lead Engineer
                                    </Text>
                                </div>
                            </div>
                        </nav>
                    }
                    header={
                        showHeader ? (
                            <div
                                style={{
                                    ...rowStyle,
                                    justifyContent: 'space-between',
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >
                                <Text size="sm" tone="strong">
                                    Infrastructure / Télémétrie Edge
                                </Text>
                                <div style={rowStyle}>
                                    <Badge variant="default" tone="success" size="sm">
                                        Opérationnel
                                    </Badge>
                                    <Button variant="primary" size="sm">
                                        Déployer
                                    </Button>
                                </div>
                            </div>
                        ) : undefined
                    }
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--mr-space-4)',
                            padding: 'var(--mr-space-4)',
                        }}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                gap: 'var(--mr-space-3)',
                            }}
                        >
                            <StatCard
                                label="Trafic Réseau"
                                value="14.8 GB/s"
                                trend="+12.4%"
                                trendTone="success"
                            />
                            <StatCard
                                label="Temps Réponse"
                                value="18 ms"
                                trend="-2.1 ms"
                                trendTone="success"
                            />
                            <StatCard
                                label="Taux d'Erreurs"
                                value="0.002%"
                                trend="Stable"
                                trendTone="neutral"
                            />
                        </div>
                        <Card padding="md">
                            <Text tone="strong" size="sm">
                                Services de Bordure (Edge Clusters)
                            </Text>
                            <Text
                                tone="muted"
                                size="sm"
                                style={{ display: 'block', marginTop: 'var(--mr-space-1)' }}
                            >
                                Tous les nœuds de distribution de contenu répondent avec une latence
                                inférieure à 25 ms.
                            </Text>
                        </Card>
                    </div>
                </SidebarLayout>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'SidebarLayout',
    description:
        'Two-column app-shell layout with framed sidebar rail, optional header, and readable content panel.',
    importCode: "import { SidebarLayout } from '@monority/ui'",
    usageCode: `<SidebarLayout
  collapsible
  sidebar={
    <nav aria-label="Project navigation">
      <div>Workspace</div>
      <div>Overview</div>
      <div>Releases</div>
      <div>Settings</div>
    </nav>
  }
  header={<Text.Strong>Project shell</Text.Strong>}
>
  <div>
    <h3>Main area</h3>
    <p>Sidebar stays contextual, content stays readable.</p>
  </div>
</SidebarLayout>`,
    preview: () => <SidebarLayoutPlayground />,
    examples: [
        { title: 'With content', content: <SidebarLayoutWithContentExample /> },
        { title: 'Sidebar widths', content: <SidebarLayoutWidthsExample /> },
    ],
    props: [
        { name: 'sidebar', type: `ReactNode`, defaultValue: '-', description: 'Sidebar content.' },
        {
            name: 'header',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Optional header content.',
        },
        { name: 'children', type: `ReactNode`, defaultValue: '-', description: 'Main content.' },
        {
            name: 'sidebarWidth',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: '-',
            description: 'Sidebar width preset.',
        },
        {
            name: 'collapsible',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Enables sidebar collapsible toggle with smooth animation.',
        },
    ],
    cssHooks: [
        '.mr-sidebar-layout',
        '.mr-sidebar-layout__sidebar',
        '.mr-sidebar-layout__main',
        '.mr-sidebar-layout__toggle',
        '[data-collapsed]',
    ],
    tokens: ['--mr-sidebar-width', '--mr-bg-surface', '--mr-border-subtle', '--mr-space-*'],
    a11y: [
        'Navigation landmark with aria-label on sidebar nav.',
        'Accessible toggle button with aria-expanded and aria-label.',
        'Keyboard focus preservation during toggle animations.',
        'Native responsive collapse support.',
    ],
}

export function SidebarLayoutDocs() {
    return <DocPage doc={docData} />
}
