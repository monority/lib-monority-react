import { CodeViewer } from '@/shared/components/CodeViewer'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'
import { Grid } from '@monority/ui/grid'
import { Stack } from '@monority/ui/stack'
import { Link } from 'react-router-dom'
import { DocContainer } from './components/DocContainer'
import { DocSection } from './components/DocSection'

const features: {
    variant: 'default' | 'primary' | 'success' | 'warning' | 'danger'
    title: string
    desc: string
}[] = [
    {
        variant: 'primary',
        title: 'System-first UI',
        desc: 'Shared tokens, recipes, and components that keep shells, forms, and content surfaces visually aligned.',
    },
    {
        variant: 'success',
        title: 'Composable architecture',
        desc: 'Use the main barrel for speed or sub-path imports when you want tighter bundle control.',
    },
    {
        variant: 'warning',
        title: 'Accessible defaults',
        desc: 'Keyboard support, ARIA patterns, and focus handling are built into the component layer.',
    },
    {
        variant: 'primary',
        title: 'Theme-ready styling',
        desc: 'CSS variable driven theming lets docs and products share the same visual language.',
    },
    {
        variant: 'danger',
        title: 'Broad coverage',
        desc: 'From small typography helpers to data-heavy layouts and overlays, the library covers daily product work.',
    },
    {
        variant: 'default',
        title: 'Typed end to end',
        desc: 'Strong TypeScript support keeps component APIs predictable as the design system grows.',
    },
]

export function Introduction() {
    return (
        <DocContainer className="docs-page">
            <HeroHeader
                kicker="Monority UI"
                title="Introduction"
                description="A modern, accessible React component library for building calm, consistent product interfaces with production-ready primitives, layouts, feedback surfaces, and overlays."
            />

            <DocSection
                id="propositions"
                title="Ce que propose la bibliothèque"
                description="Des fondations stables, accessibles et cohérentes pour toutes vos applications."
            >
                <Grid columns="auto-fit">
                    {features.map((feature) => (
                        <Card key={feature.title} padding="md">
                            <Stack gap="xs">
                                <Badge variant={feature.variant} size="sm">
                                    {feature.title}
                                </Badge>
                                <p className="docs-feature-desc">{feature.desc}</p>
                            </Stack>
                        </Card>
                    ))}
                </Grid>
            </DocSection>

            <DocSection
                id="quickstart"
                title="Démarrage rapide"
                description="Installez le package et importez vos premiers composants en quelques secondes."
            >
                <Stack gap="sm">
                    <CodeViewer code="pnpm add @monority/ui" language="bash" filename="terminal" />
                    <CodeViewer
                        code={`import { Button } from '@monority/ui'\nimport '@monority/ui/styles.css'\n\nfunction App() {\n  return <Button>Open workspace</Button>\n}`}
                        filename="App.tsx"
                    />
                </Stack>
                <p className="docs-text">
                    <Link to="/docs/installation" className="docs-text-link">
                        Consulter le guide complet d'installation
                    </Link>
                </p>
            </DocSection>

            <DocSection
                id="categories"
                title="Catégories de composants"
                description="Panorama des familles d'éléments disponibles dans la bibliothèque."
            >
                <Card padding="md">
                    <ul className="docs-list">
                        <li>
                            <strong>Actions</strong> — Button, ButtonLink, IconButton, CopyButton,
                            Toggle, ToggleGroup
                        </li>
                        <li>
                            <strong>Formulaires</strong> — Input, InputOTP, Select, Textarea,
                            Checkbox, RadioGroup, Switch, Slider, Rating, DatePicker
                        </li>
                        <li>
                            <strong>Navigation</strong> — Tabs, SegmentedControl, Stepper,
                            Breadcrumb, Pagination, Toolbar, Topbar, SidebarLayout
                        </li>
                        <li>
                            <strong>Overlays</strong> — Modal, AlertDialog, Sheet, Drawer, Tooltip,
                            Popover, DropdownMenu
                        </li>
                        <li>
                            <strong>Données & Affichage</strong> — DataTable, DataList, Table, Card,
                            MetricGrid, StatCard, Timeline
                        </li>
                        <li>
                            <strong>Feedback</strong> — Badge, BadgeDelta, Callout, InlineAlert,
                            Banner, Progress, Spinner, Toast
                        </li>
                        <li>
                            <strong>Disposition</strong> — Container, Grid, Stack, Section, Divider,
                            Separator, ScrollArea
                        </li>
                    </ul>
                </Card>
            </DocSection>
        </DocContainer>
    )
}
