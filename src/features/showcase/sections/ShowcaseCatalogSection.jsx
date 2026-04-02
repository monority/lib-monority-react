import { useState } from 'react'
import {
    Accordion,
    AlertDialog,
    Avatar,
    Badge,
    Banner,
    Breadcrumb,
    Button,
    Callout,
    Card,
    Checkbox,
    CommandPalette,
    Combobox,
    DataList,
    Divider,
    DropdownMenu,
    Drawer,
    EmptyState,
    FilterBar,
    FormSection,
    Grid,
    IconButton,
    InlineAlert,
    Input,
    MetricGrid,
    Pagination,
    PageHeader,
    Section,
    Popover,
    Progress,
    RadioGroup,
    Select,
    SidebarLayout,
    Spinner,
    Skeleton,
    Stack,
    StatCard,
    Switch,
    Table,
    Tabs,
    Text,
    Textarea,
    Toolbar,
    Topbar,
    Title,
    Toast,
    Tooltip,
} from '@/components/ui'
import { useToast } from '@/hooks/useToast'

const tabItems = [
    { label: 'Overview', value: 'overview' },
    { label: 'Preview', value: 'preview' },
    { label: 'Code', value: 'code' },
]

const accordionItems = [
    {
        value: 'architecture',
        label: 'Architecture feature-first',
        content: (
            <Text tone="base" size="sm">
                Separe les primitives UI, les pages et les services pour faire grossir le projet
                sans concentrer toute la logique dans `App.jsx`.
            </Text>
        ),
    },
    {
        value: 'theming',
        label: 'Theming centralise',
        content: (
            <Text tone="base" size="sm">
                Les tokens et le provider permettent de faire evoluer les surfaces et le contraste
                sans rewriter les composants.
            </Text>
        ),
    },
]

const tableColumns = [
    { key: 'feature', header: 'Feature' },
    { key: 'status', header: 'Status' },
    {
        key: 'coverage',
        header: 'Coverage',
        align: 'right',
    },
]

const tableRows = [
    { id: 'routing', feature: 'Routing', status: 'Stable', coverage: '100%' },
    { id: 'theme', feature: 'Theme system', status: 'Stable', coverage: '100%' },
    { id: 'ui-kit', feature: 'UI primitives', status: 'Active', coverage: '78%' },
]

const avatarPreviewSrc =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" rx="24" fill="%23d6e4ff"/><circle cx="48" cy="36" r="18" fill="%233a5ccc"/><path d="M18 84c3-16 15-26 30-26s27 10 30 26" fill="%233a5ccc"/></svg>'

function CatalogCard({ name, description, children }) {
    return (
        <Card padding="md" className="showcase-catalog-card stack-m">
            <div className="stack-s">
                <Title as="h3" size="sm">
                    {name}
                </Title>
                <Text tone="base" size="sm">
                    {description}
                </Text>
            </div>
            <div className="showcase-catalog-card__preview">{children}</div>
        </Card>
    )
}

export function ShowcaseCatalogSection() {
    const [activeTab, setActiveTab] = useState('overview')
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(3)
    const [selectedOwner, setSelectedOwner] = useState('alice')
    const [selectedPlan, setSelectedPlan] = useState('starter')
    const { pushToast } = useToast()

    const commandItems = [
        {
            value: 'home',
            label: 'Aller a l accueil',
            description: 'Action de navigation ou raccourci produit.',
            shortcut: 'G H',
            keywords: 'home navigation accueil',
            onSelect: () =>
                pushToast({
                    title: 'Commande executee',
                    description: "La command palette est prete pour des vraies actions d'app.",
                    tone: 'success',
                }),
        },
        {
            value: 'theme',
            label: 'Changer le theme',
            description: 'Exemple d action utilitaire globale.',
            shortcut: 'T',
            keywords: 'theme dark light',
            onSelect: () =>
                pushToast({
                    title: 'Theme',
                    description: 'Branche ici une vraie action globale.',
                }),
        },
        {
            value: 'docs',
            label: 'Ouvrir la doc UI',
            description: 'Commande de consultation ou de support interne.',
            shortcut: 'D',
            keywords: 'documentation ui composants',
            onSelect: () =>
                pushToast({
                    title: 'Documentation',
                    description: 'La palette peut piloter des liens, routes ou mutations.',
                }),
        },
    ]

    return (
        <Section id="catalog" surface className="stack-m">
            <div className="stack-s">
                <Text className="eyebrow" tone="strong">
                    Catalogue
                </Text>
                <Title as="h2" size="md">
                    Un composant, une carte
                </Title>
                <Text tone="base">
                    Vue individuelle des primitives UI pour scanner rapidement la librairie et
                    reutiliser un pattern sans parcourir toute la page.
                </Text>
            </div>

            <Grid cols={3} gap="md" className="showcase-catalog-grid">
                <CatalogCard
                    name="Button"
                    description="Action principale, secondaire ou de confirmation."
                >
                    <div className="cluster">
                        <Button size="sm">Primary</Button>
                        <Button size="sm" variant="ghost">
                            Ghost
                        </Button>
                    </div>
                </CatalogCard>

                <CatalogCard
                    name="IconButton"
                    description="Action compacte pour toolbar ou menu."
                >
                    <IconButton label="Ajouter" variant="ghost">
                        <span aria-hidden="true">+</span>
                    </IconButton>
                </CatalogCard>

                <CatalogCard name="Badge" description="Meta courte, statut ou etiquette visuelle.">
                    <Badge>Stable</Badge>
                </CatalogCard>

                <CatalogCard
                    name="Banner"
                    description="Annonce visible pour onboarding, nouveaute, maintenance ou message produit."
                >
                    <Banner
                        className="showcase-banner"
                        tone="info"
                        eyebrow="Update"
                        title="Starter 2026 pret"
                        description="Le socle UI et les patterns senior dev sont maintenant bien avances."
                        actions={
                            <div className="cluster showcase-actions-compact">
                                <Button size="sm" variant="ghost">
                                    Lire
                                </Button>
                                <Button size="sm">Continuer</Button>
                            </div>
                        }
                    />
                </CatalogCard>

                <CatalogCard
                    name="Avatar"
                    description="Identite visuelle compacte pour utilisateurs, assignations et activity feeds."
                >
                    <div className="cluster">
                        <Avatar
                            size="sm"
                            name="Alice Martin"
                            src={avatarPreviewSrc}
                            alt="Alice Martin"
                        />
                        <Avatar size="md" name="Bruno Leroy" />
                        <Avatar size="lg" name="Claire Dupont" />
                    </div>
                </CatalogCard>

                <CatalogCard
                    name="Breadcrumb"
                    description="Repere de navigation pour dashboards, docs et espaces admin."
                >
                    <Breadcrumb
                        items={[
                            { label: 'Workspace', href: '#' },
                            { label: 'UI Library', href: '#' },
                            { label: 'Showcase' },
                        ]}
                    />
                </CatalogCard>

                <CatalogCard
                    name="Input"
                    description="Champ simple pour email, texte court ou recherche."
                >
                    <Input label="Email" placeholder="you@studio.dev" />
                </CatalogCard>

                <CatalogCard name="Select" description="Choix parmi plusieurs options.">
                    <Select label="Theme" defaultValue="system">
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </Select>
                </CatalogCard>

                <CatalogCard
                    name="Combobox"
                    description="Recherche et selection dans une liste d options."
                >
                    <Combobox
                        label="Owner"
                        value={selectedOwner}
                        onChange={setSelectedOwner}
                        items={[
                            {
                                value: 'alice',
                                label: 'Alice Martin',
                                description: 'Design system lead',
                            },
                            {
                                value: 'bruno',
                                label: 'Bruno Leroy',
                                description: 'Frontend platform',
                            },
                            {
                                value: 'claire',
                                label: 'Claire Dupont',
                                description: 'Product engineering',
                            },
                        ]}
                    />
                </CatalogCard>

                <CatalogCard
                    name="Textarea"
                    description="Saisie multilignes pour notes, feedbacks et briefs."
                >
                    <Textarea label="Message" placeholder="Decris ici le besoin..." />
                </CatalogCard>

                <CatalogCard name="Tabs" description="Navigation locale entre vues ou panneaux.">
                    <Stack gap="s">
                        <Tabs items={tabItems} value={activeTab} onChange={setActiveTab} />
                        <Text tone="muted" size="sm">
                            Onglet actif: {activeTab}
                        </Text>
                    </Stack>
                </CatalogCard>

                <CatalogCard name="Switch" description="Activation binaire rapide.">
                    <Switch label="Activer le mode pro" defaultChecked />
                </CatalogCard>

                <CatalogCard
                    name="Checkbox"
                    description="Selection ponctuelle dans un formulaire."
                >
                    <Checkbox label="Recevoir les nouveautes" />
                </CatalogCard>

                <CatalogCard
                    name="RadioGroup"
                    description="Choix exclusif structure pour onboarding, pricing ou settings."
                >
                    <RadioGroup
                        label="Plan"
                        value={selectedPlan}
                        onChange={setSelectedPlan}
                        items={[
                            {
                                value: 'starter',
                                label: 'Starter',
                                description: 'Base rapide pour un petit projet ou prototype.',
                            },
                            {
                                value: 'pro',
                                label: 'Pro',
                                description: 'Configuration plus complete pour un vrai produit.',
                            },
                        ]}
                    />
                </CatalogCard>

                <CatalogCard name="Tooltip" description="Aide contextuelle concise.">
                    <Tooltip content="Information contextuelle">
                        <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm">
                            Survoler
                        </button>
                    </Tooltip>
                </CatalogCard>

                <CatalogCard
                    name="Popover"
                    description="Panneau contextuel pour actions, aide ou mini details."
                >
                    <Popover
                        trigger={
                            <Button variant="ghost" size="sm">
                                Ouvrir le panneau
                            </Button>
                        }
                    >
                        <Stack gap="s">
                            <Text tone="strong" size="sm">
                                Quick actions
                            </Text>
                            <Text tone="base" size="sm">
                                Utilise un popover pour garder une action proche de son contexte.
                            </Text>
                            <div className="cluster">
                                <Button size="sm">Confirmer</Button>
                                <Button variant="ghost" size="sm">
                                    Plus tard
                                </Button>
                            </div>
                        </Stack>
                    </Popover>
                </CatalogCard>

                <CatalogCard
                    name="DropdownMenu"
                    description="Menu d'actions contextuelles pour toolbar, ligne ou carte."
                >
                    <DropdownMenu
                        trigger={
                            <Button variant="ghost" size="sm">
                                Actions
                            </Button>
                        }
                        items={[
                            { value: 'edit', label: 'Modifier' },
                            { value: 'duplicate', label: 'Dupliquer' },
                            { type: 'separator' },
                            { value: 'archive', label: 'Archiver' },
                            { value: 'delete', label: 'Supprimer', danger: true },
                        ]}
                    />
                </CatalogCard>

                <CatalogCard
                    name="AlertDialog"
                    description="Confirmation stricte pour suppression ou action sensible."
                >
                    <>
                        <Button
                            size="sm"
                            onClick={() => setIsAlertDialogOpen(true)}
                        >
                            Ouvrir la confirmation
                        </Button>
                        <AlertDialog
                            open={isAlertDialogOpen}
                            title="Supprimer ce modele ?"
                            description="Cette action est irreversible. Le composant sert aux confirmations critiques."
                            confirmLabel="Supprimer"
                            cancelLabel="Annuler"
                            onConfirm={() => setIsAlertDialogOpen(false)}
                            onCancel={() => setIsAlertDialogOpen(false)}
                        />
                    </>
                </CatalogCard>

                <CatalogCard
                    name="CommandPalette"
                    description="Recherche et execution rapide d actions globales."
                >
                    <>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsCommandPaletteOpen(true)}
                        >
                            Ouvrir la palette
                        </Button>
                        <CommandPalette
                            open={isCommandPaletteOpen}
                            onClose={() => setIsCommandPaletteOpen(false)}
                            title="Actions rapides"
                            items={commandItems}
                        />
                    </>
                </CatalogCard>

                <CatalogCard
                    name="Drawer"
                    description="Panneau latéral ou bottom sheet pour mobile, filtres et settings."
                >
                    <>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            Ouvrir le drawer
                        </Button>
                        <Drawer
                            open={isDrawerOpen}
                            title="Parametres rapides"
                            onClose={() => setIsDrawerOpen(false)}
                        >
                            <Stack gap="m">
                                <Text tone="base">
                                    Utilise ce composant pour des filtres, un panneau de details ou
                                    un flow secondaire sans quitter la page.
                                </Text>
                                <Switch label="Activer les previews" defaultChecked />
                                <Checkbox label="Recevoir les changelogs" />
                                <div className="cluster">
                                    <Button size="sm" onClick={() => setIsDrawerOpen(false)}>
                                        Enregistrer
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setIsDrawerOpen(false)}
                                    >
                                        Fermer
                                    </Button>
                                </div>
                            </Stack>
                        </Drawer>
                    </>
                </CatalogCard>

                <CatalogCard name="Toast" description="Feedback systeme, succes ou info.">
                    <Stack gap="s">
                        <Toast
                            title="Mise a jour disponible"
                            description="Le composant est pret a etre integre."
                        />
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                                pushToast({
                                    title: 'Toast global',
                                    description: 'Cette notification passe maintenant par le provider.',
                                    tone: 'success',
                                })
                            }
                        >
                            Declencher un toast
                        </Button>
                    </Stack>
                </CatalogCard>

                <CatalogCard
                    name="Callout"
                    description="Message structure pour onboarding, aide ou warning."
                >
                    <Callout
                        tone="info"
                        title="Info architecture"
                        description="Utilise ce bloc pour contextualiser une page ou une section."
                    />
                </CatalogCard>

                <CatalogCard
                    name="InlineAlert"
                    description="Feedback compact dans le flux pour forms, settings et pages admin."
                >
                    <InlineAlert
                        tone="warning"
                        title="Configuration incomplete"
                        description="Ajoute tes variables d environnement avant de passer en production."
                        actionLabel="Verifier"
                    />
                </CatalogCard>

                <CatalogCard
                    name="Skeleton"
                    description="Chargement visuel avant les vraies donnees."
                >
                    <Stack gap="s">
                        <Skeleton style={{ width: '100%', height: '1rem' }} />
                        <Skeleton style={{ width: '72%', height: '1rem' }} />
                        <Skeleton style={{ width: '48%', height: '1rem' }} />
                    </Stack>
                </CatalogCard>

                <CatalogCard
                    name="Spinner"
                    description="Chargement court pour action async, bouton busy ou zone inline."
                >
                    <div className="cluster showcase-spinner-row">
                        <Spinner size="sm" />
                        <Spinner size="md" tone="muted" />
                        <Button
                            size="sm"
                            loading
                            iconLeading={<Spinner size="sm" tone="inverse" />}
                            className="showcase-spinner-button"
                        >
                            Publication
                        </Button>
                    </div>
                </CatalogCard>

                <CatalogCard
                    name="Card"
                    description="Surface reusable pour dashboard, liste ou bloc marketing."
                >
                    <Card padding="sm" className="stack-s">
                        <Text tone="strong" size="sm">
                            Card interne
                        </Text>
                        <Text tone="base" size="sm">
                            Surface compacte et coherente.
                        </Text>
                    </Card>
                </CatalogCard>

                <CatalogCard
                    name="EmptyState"
                    description="Etat vide presentable sans logique metier."
                >
                    <EmptyState
                        title="Aucun resultat"
                        description="Commence par ajouter une premiere ressource."
                        icon={<span>+</span>}
                        action={<Button size="sm">Ajouter</Button>}
                        secondaryAction={
                            <Button size="sm" variant="ghost">
                                Importer
                            </Button>
                        }
                    />
                </CatalogCard>

                <CatalogCard
                    name="FormSection"
                    description="Bloc de formulaire structure pour settings, profil, checkout ou admin."
                >
                    <FormSection
                        className="showcase-form-section"
                        title="Project settings"
                        description="Regroupe les champs, aides et actions dans un bloc plus senior."
                        meta={<Badge>Draft</Badge>}
                        actions={
                            <div className="cluster showcase-actions-compact">
                                <Button size="sm" variant="ghost">
                                    Cancel
                                </Button>
                                <Button size="sm">Save</Button>
                            </div>
                        }
                    >
                        <Stack gap="m">
                            <Input label="Project name" placeholder="Model Starter" />
                            <Textarea
                                label="Description"
                                placeholder="Describe the intent of this project..."
                            />
                        </Stack>
                    </FormSection>
                </CatalogCard>

                <CatalogCard name="Divider" description="Separation legere entre contenus.">
                    <Stack gap="s">
                        <Text tone="base" size="sm">
                            Bloc A
                        </Text>
                        <Divider label="Milieu" />
                        <Text tone="base" size="sm">
                            Bloc B
                        </Text>
                    </Stack>
                </CatalogCard>

                <CatalogCard
                    name="Accordion"
                    description="Contenu progressif pour FAQ, settings et details secondaires."
                >
                    <Accordion items={accordionItems} defaultValue="architecture" />
                </CatalogCard>

                <CatalogCard
                    name="Table"
                    description="Affichage tabulaire simple pour admin, dashboard ou liste de suivi."
                >
                    <Table columns={tableColumns} rows={tableRows} />
                </CatalogCard>

                <CatalogCard
                    name="DataList"
                    description="Lecture structuree pour fiche detail, meta projet ou resume de configuration."
                >
                    <DataList
                        items={[
                            { label: 'Owner', value: 'Alice Martin' },
                            { label: 'Status', value: <Badge>Stable</Badge> },
                            { label: 'Coverage', value: '100%' },
                        ]}
                    />
                </CatalogCard>

                <CatalogCard
                    name="Pagination"
                    description="Navigation de pages pour listes, tables et vues catalogue."
                >
                    <Pagination page={currentPage} totalPages={8} onPageChange={setCurrentPage} />
                </CatalogCard>

                <CatalogCard
                    name="PageHeader"
                    description="Pattern de page senior pour dashboard, liste admin, detail ou settings."
                >
                    <PageHeader
                        className="showcase-page-header"
                        eyebrow="Workspace"
                        title="Design system"
                        description="Pilote une page complete avec contexte, resume et actions principales."
                        meta={
                            <div className="cluster showcase-meta-row">
                                <Badge>Stable</Badge>
                                <Text tone="muted" size="sm">
                                    v1.0
                                </Text>
                            </div>
                        }
                        actions={
                            <div className="cluster showcase-actions-compact">
                                <Button size="sm" variant="ghost">
                                    Preview
                                </Button>
                                <Button size="sm">Publier</Button>
                            </div>
                        }
                    />
                </CatalogCard>

                <CatalogCard
                    name="Toolbar"
                    description="Barre d actions et filtres pour listes, tables, admin ou recherche."
                >
                    <Toolbar
                        leading={
                            <div className="cluster">
                                <Input placeholder="Rechercher..." inputClassName="showcase-toolbar__input" />
                                <Select defaultValue="all" selectClassName="showcase-toolbar__select">
                                    <option value="all">Tous</option>
                                    <option value="stable">Stable</option>
                                    <option value="active">Active</option>
                                </Select>
                            </div>
                        }
                        trailing={
                            <div className="cluster">
                                <Button size="sm" variant="ghost">
                                    Filtrer
                                </Button>
                                <Button size="sm">Nouveau</Button>
                            </div>
                        }
                    />
                </CatalogCard>

                <CatalogCard
                    name="Topbar"
                    description="Barre haute d application pour navigation, contexte workspace et actions globales."
                >
                    <Topbar
                        className="showcase-topbar"
                        brand={<span>Model App</span>}
                        navigation={
                            <div className="cluster showcase-actions-compact">
                                <Button size="sm" variant="ghost">
                                    Dashboard
                                </Button>
                                <Button size="sm" variant="ghost">
                                    Docs
                                </Button>
                                <Button size="sm" variant="ghost">
                                    Settings
                                </Button>
                            </div>
                        }
                        meta={<Badge className="showcase-topbar__badge">Workspace pro</Badge>}
                        actions={
                            <div className="cluster showcase-actions-compact">
                                <IconButton label="Rechercher" variant="ghost">
                                    <span aria-hidden="true">/</span>
                                </IconButton>
                                <Button size="sm">Invite</Button>
                            </div>
                        }
                    />
                </CatalogCard>

                <CatalogCard
                    name="FilterBar"
                    description="Barre de filtres active avec chips, compteur et reset rapide."
                >
                    <FilterBar
                        className="showcase-filter-bar"
                        leading={
                            <Input
                                placeholder="Search in UI library..."
                                inputClassName="showcase-toolbar__input"
                            />
                        }
                        filters={[
                            { label: 'Active' },
                            { label: 'Design system' },
                            { label: 'Ready' },
                        ]}
                        resultsCount={12}
                        onReset={() => {}}
                    />
                </CatalogCard>

                <CatalogCard
                    name="StatCard"
                    description="Carte KPI pour dashboard, overview produit ou recap equipe."
                >
                    <StatCard
                        label="Release velocity"
                        value="24"
                        trend="+12%"
                        trendTone="positive"
                        description="Deploys this month"
                        icon={<span>↗</span>}
                        footer={
                            <Text tone="muted" size="sm">
                                Compared with last month
                            </Text>
                        }
                    />
                </CatalogCard>

                <CatalogCard
                    name="MetricGrid"
                    description="Rangee de KPI prete a poser sur une home, un dashboard ou une page overview."
                >
                    <MetricGrid
                        className="showcase-metric-grid"
                        items={[
                            {
                                label: 'Components',
                                value: '40+',
                                trend: '+8',
                                trendTone: 'positive',
                                description: 'Primitives and patterns',
                            },
                            {
                                label: 'Coverage',
                                value: '100%',
                                trend: 'Stable',
                                description: 'Core build checks',
                            },
                            {
                                label: 'Themes',
                                value: '3',
                                trend: 'Ready',
                                description: 'Light, dark, system',
                            },
                        ]}
                    />
                </CatalogCard>

                <CatalogCard
                    name="SidebarLayout"
                    description="Layout de page pour settings, docs, profil ou espace admin."
                >
                    <SidebarLayout
                        className="showcase-sidebar-layout"
                        sidebar={
                            <Stack gap="s">
                                <Button size="sm" variant="ghost" fullWidth>
                                    General
                                </Button>
                                <Button size="sm" variant="ghost" fullWidth>
                                    Members
                                </Button>
                                <Button size="sm" variant="ghost" fullWidth>
                                    Billing
                                </Button>
                            </Stack>
                        }
                        header={
                            <PageHeader
                                className="showcase-page-header"
                                title="Workspace settings"
                                description="Exemple de page structuree avec navigation laterale."
                                actions={<Button size="sm">Save changes</Button>}
                            />
                        }
                    >
                        <FormSection
                            className="showcase-form-section"
                            title="Preferences"
                            description="Ajuste ici les options principales de ton workspace."
                        >
                            <Stack gap="m">
                                <Input label="Workspace name" placeholder="Model Studio" />
                                <Switch label="Enable activity digest" defaultChecked />
                            </Stack>
                        </FormSection>
                    </SidebarLayout>
                </CatalogCard>

                <CatalogCard
                    name="Progress"
                    description="Avancement visuel pour onboarding, upload, score ou tache en cours."
                >
                    <Stack gap="s">
                        <Progress label="Setup du starter" value={78} tone="success" />
                        <Progress label="Migration design system" value={42} tone="warning" />
                    </Stack>
                </CatalogCard>

                <CatalogCard
                    name="Title + Text"
                    description="Base typographique de l'interface."
                >
                    <Stack gap="s">
                        <Title as="h4" size="sm">
                            Heading
                        </Title>
                        <Text tone="base" size="sm">
                            Texte courant pour decrire une zone produit.
                        </Text>
                    </Stack>
                </CatalogCard>
            </Grid>
        </Section>
    )
}
