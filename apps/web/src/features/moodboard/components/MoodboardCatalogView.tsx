import { useState } from 'react'
import {
    Accordion,
    AlertDialog,
    AspectRatio,
    AsyncStateNotice,
    Banner,
    Breadcrumb,
    Button,
    ButtonLink,
    Calendar,
    Card,
    Carousel,
    Collapsible,
    Combobox,
    CommandPalette,
    ContextMenu,
    CopyButton,
    DataTable,
    DatePicker,
    DateRangePicker,
    Divider,
    Drawer,
    DropdownMenu,
    EmptyState,
    FileUpload,
    FilterBar,
    FormSection,
    Grid,
    HoverCard,
    IconButton,
    Input,
    Kbd,
    Menubar,
    MetricGrid,
    Modal,
    NavigationMenu,
    NumberInput,
    Pagination,
    PasswordInput,
    Popover,
    RadioGroup,
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
    Section,
    Sheet,
    Skeleton,
    Spinner,
    Stack,
    Stepper,
    Text,
    Title,
    Toast,
    Toggle,
    ToggleGroup,
    Tooltip,
} from '@monority/ui'

export function MoodboardCatalogView() {
    /* États pour les dialogues et overlays */
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isCmdOpen, setIsCmdOpen] = useState(false)

    /* États pour les formulaires et navigations */
    const [clusterName, setClusterName] = useState('production-fra-01')
    const [stepperStep, setStepperStep] = useState(1)
    const [currentPage, setCurrentPage] = useState(2)
    const [radioSelection, setRadioSelection] = useState('canary')
    const [numValue, setNumValue] = useState<number | null>(4)
    const [textPassword, setTextPassword] = useState('SecretToken_2026')
    const [comboboxVal, setComboboxVal] = useState('fra1')
    const [toggleState, setToggleState] = useState(true)
    const [toggleGroupVal, setToggleGroupVal] = useState<string>('grid')
    const [dateValue, setDateValue] = useState<Date | null>(new Date('2026-10-14'))

    return (
        <Stack gap="xl">
            {/* Bannière de présentation */}
            <Banner tone="neutral">
                <Banner.Title>Catalogue exhaustif des composants</Banner.Title>
                <Banner.Description>
                    Présentation interactive des 41 familles de composants complémentaires de
                    Monority UI, adaptées dynamiquement aux axes de thème, marque, rayon et densité
                    du Studio.
                </Banner.Description>
            </Banner>

            {/* Grille 2 colonnes des catégories */}
            <Grid columns={2} gap="lg">
                {/* 1. Overlays, Dialogues & Menus contextuels */}
                <Card>
                    <Card.Header>
                        <Stack gap="xs">
                            <Title as="h3" size="sm">
                                Overlays & Dialogues
                            </Title>
                            <Text tone="muted" size="sm">
                                Fenêtres modales, tiroirs, infobulles et surfaces flottantes
                                accessibles.
                            </Text>
                        </Stack>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <Stack direction="horizontal" gap="sm" style={{ flexWrap: 'wrap' }}>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Ouvrir Modal
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => setIsAlertOpen(true)}
                                >
                                    Ouvrir AlertDialog
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setIsDrawerOpen(true)}
                                >
                                    Ouvrir Drawer
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setIsSheetOpen(true)}
                                >
                                    Ouvrir Sheet
                                </Button>
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => setIsCmdOpen(true)}
                                >
                                    Command Palette (<Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>)
                                </Button>
                            </Stack>

                            <Divider />

                            <Stack
                                direction="horizontal"
                                gap="md"
                                style={{ alignItems: 'center', flexWrap: 'wrap' }}
                            >
                                <Tooltip content="Infobulle accessible avec support clavier et réduction de mouvement">
                                    <Button size="sm" variant="ghost">
                                        Survolez pour Tooltip
                                    </Button>
                                </Tooltip>

                                <Popover
                                    trigger={
                                        <Button size="sm" variant="secondary">
                                            Ouvrir Popover
                                        </Button>
                                    }
                                >
                                    <div
                                        style={{ padding: 'var(--mr-space-3)', maxWidth: '240px' }}
                                    >
                                        <Title as="h4" size="sm">
                                            Surface ancrée
                                        </Title>
                                        <Text size="sm" tone="muted">
                                            Contenu arbitraire positionné au millimètre.
                                        </Text>
                                    </div>
                                </Popover>

                                <DropdownMenu
                                    trigger={
                                        <Button size="sm" variant="ghost">
                                            Actions ▾
                                        </Button>
                                    }
                                    items={[
                                        {
                                            value: 'restart',
                                            label: 'Redémarrer instance',
                                            onSelect: () => {},
                                        },
                                        {
                                            value: 'snapshot',
                                            label: 'Créer un snapshot',
                                            onSelect: () => {},
                                        },
                                        { value: 'sep', label: '', type: 'separator' },
                                        {
                                            value: 'terminate',
                                            label: 'Terminer le nœud',
                                            danger: true,
                                            onSelect: () => {},
                                        },
                                    ]}
                                />

                                <HoverCard
                                    content={
                                        <div
                                            style={{ padding: 'var(--mr-space-3)', width: '220px' }}
                                        >
                                            <Title as="h4" size="sm">
                                                Agent de télémétrie
                                            </Title>
                                            <Text size="sm" tone="muted">
                                                Surveille 12 nœuds cluster en temps réel.
                                            </Text>
                                        </div>
                                    }
                                >
                                    <Text
                                        size="sm"
                                        style={{
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            color: 'var(--mr-accent-text)',
                                        }}
                                    >
                                        @observability-bot
                                    </Text>
                                </HoverCard>
                            </Stack>

                            <ContextMenu
                                trigger={
                                    <div
                                        style={{
                                            padding: 'var(--mr-space-3)',
                                            border: '1px dashed var(--mr-border-default)',
                                            borderRadius: 'var(--mr-radius-md)',
                                            textAlign: 'center',
                                            cursor: 'context-menu',
                                            fontSize: 'var(--mr-font-size-sm)',
                                            color: 'var(--mr-text-secondary)',
                                        }}
                                    >
                                        Faites un clic droit dans cette zone pour tester le
                                        ContextMenu
                                    </div>
                                }
                                items={[
                                    { value: 'copy', label: 'Copier les logs', onSelect: () => {} },
                                    {
                                        value: 'metrics',
                                        label: 'Inspecter les métriques',
                                        onSelect: () => {},
                                    },
                                    { value: 'sep', label: '', type: 'separator' },
                                    {
                                        value: 'sync',
                                        label: 'Forcer la synchronisation',
                                        onSelect: () => {},
                                    },
                                ]}
                            />
                        </Stack>
                    </Card.Content>
                </Card>

                {/* 2. Navigation, Menus & Pagination */}
                <Card>
                    <Card.Header>
                        <Stack gap="xs">
                            <Title as="h3" size="sm">
                                Navigation & Séquençage
                            </Title>
                            <Text tone="muted" size="sm">
                                Fil d'ariane, étapes de validation, pagination et barres de menus.
                            </Text>
                        </Stack>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <Breadcrumb
                                items={[
                                    { label: 'Infrastructure', href: '#infra' },
                                    { label: 'Clusters EU', href: '#clusters' },
                                    { label: 'Nœud fra1-04' },
                                ]}
                            />

                            <Stepper
                                activeStep={stepperStep}
                                steps={[
                                    {
                                        id: '1',
                                        title: 'Spécification',
                                        description: 'Revue d’architecture',
                                    },
                                    {
                                        id: '2',
                                        title: 'Déploiement',
                                        description: 'En cours d’application',
                                    },
                                    {
                                        id: '3',
                                        title: 'Vérification',
                                        description: 'Sondes d’intégrité',
                                    },
                                ]}
                            />

                            <Stack direction="horizontal" gap="sm">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setStepperStep((s) => Math.max(0, s - 1))}
                                >
                                    Étape précédente
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setStepperStep((s) => Math.min(2, s + 1))}
                                >
                                    Étape suivante
                                </Button>
                            </Stack>

                            <Divider />

                            <Menubar
                                items={[
                                    {
                                        label: 'Fichier',
                                        items: [
                                            { label: 'Nouveau cluster', onClick: () => {} },
                                            { label: 'Exporter le plan', onClick: () => {} },
                                        ],
                                    },
                                    {
                                        label: 'Édition',
                                        items: [
                                            { label: 'Annuler', onClick: () => {} },
                                            { label: 'Rétablir', onClick: () => {} },
                                        ],
                                    },
                                    {
                                        label: 'Affichage',
                                        items: [
                                            { label: 'Plein écran', onClick: () => {} },
                                            { label: 'Basculer télémétrie', onClick: () => {} },
                                        ],
                                    },
                                ]}
                            />

                            <NavigationMenu
                                items={[
                                    { label: 'Synthèse', href: '#synthese' },
                                    { label: 'Métriques', href: '#metriques' },
                                    { label: 'Journaux', href: '#journaux' },
                                ]}
                            />

                            <FilterBar>
                                <Button size="sm" variant="secondary">
                                    Statut : Tous
                                </Button>
                                <Button size="sm" variant="ghost">
                                    Région : Europe
                                </Button>
                                <Button size="sm" variant="ghost">
                                    Environnement : Prod
                                </Button>
                            </FilterBar>

                            <Pagination
                                page={currentPage}
                                totalPages={8}
                                onPageChange={setCurrentPage}
                            />
                        </Stack>
                    </Card.Content>
                </Card>

                {/* 3. Formulaires & Saisie avancée */}
                <Card>
                    <Card.Header>
                        <Stack gap="xs">
                            <Title as="h3" size="sm">
                                Saisie avancée & Sélecteurs temporels
                            </Title>
                            <Text tone="muted" size="sm">
                                Calendrier, sélecteurs de dates, radio-groupes, nombres et fichiers.
                            </Text>
                        </Stack>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <RadioGroup
                                label="Stratégie de déploiement"
                                value={radioSelection}
                                onChange={setRadioSelection}
                                items={[
                                    { value: 'canary', label: 'Canary rollout (5% progressif)' },
                                    { value: 'blue-green', label: 'Blue / Green instantané' },
                                    { value: 'rolling', label: 'Mise à jour glissante continue' },
                                ]}
                            />

                            <FormSection
                                title="Dimensionnement & Sécurité"
                                description="Nombre de répliques et clé de signature des sondes"
                            >
                                <Grid columns={3} gap="md">
                                    <Input
                                        label="Nom du cluster"
                                        value={clusterName}
                                        onChange={(e) => setClusterName(e.target.value)}
                                        clearable
                                        hint="Effacement rapide (clearable)"
                                    />

                                    <NumberInput
                                        label="Répliques actives"
                                        min={1}
                                        max={32}
                                        value={numValue}
                                        onValueChange={setNumValue}
                                        hint="Entre 1 et 32 pods"
                                    />

                                    <PasswordInput
                                        label="Clé de chiffrement"
                                        value={textPassword}
                                        onChange={(e) => setTextPassword(e.target.value)}
                                        hint="Visibilité masquable"
                                    />
                                </Grid>
                            </FormSection>

                            <Combobox
                                label="Zone de disponibilité"
                                value={comboboxVal}
                                onChange={setComboboxVal}
                                items={[
                                    { value: 'fra1', label: 'Frankfurt 1 (fra1)' },
                                    { value: 'cdg1', label: 'Paris Charles de Gaulle (cdg1)' },
                                    { value: 'ams1', label: 'Amsterdam (ams1)' },
                                    { value: 'lhr1', label: 'London Heathrow (lhr1)' },
                                ]}
                                hint="Recherche filtrable avec autocomplétion"
                            />

                            <DatePicker
                                label="Date de gel des versions"
                                value={dateValue}
                                onChange={setDateValue}
                                hint="Calendrier popover conforme APG"
                            />

                            <DateRangePicker
                                fromLabel="Début de maintenance"
                                toLabel="Fin de maintenance"
                                hint="Période de maintenance planifiée"
                            />

                            <FileUpload
                                label="Artefact de configuration"
                                description="Déposez votre archive tar.gz ou manifest YAML"
                                actionLabel="Parcourir"
                            />
                        </Stack>
                    </Card.Content>
                </Card>

                {/* 4. Actions & Retours interactifs */}
                <Card>
                    <Card.Header>
                        <Stack gap="xs">
                            <Title as="h3" size="sm">
                                Actions & Retours d'état
                            </Title>
                            <Text tone="muted" size="sm">
                                Bascules, boutons d'icônes, alertes, états vides et indicateurs de
                                chargement.
                            </Text>
                        </Stack>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <Stack direction="horizontal" gap="md" style={{ alignItems: 'center' }}>
                                <Toggle
                                    pressed={toggleState}
                                    onPressedChange={setToggleState}
                                    aria-label="Mode silencieux"
                                >
                                    Mode silencieux : {toggleState ? 'Actif' : 'Inactif'}
                                </Toggle>

                                <ToggleGroup
                                    type="single"
                                    value={toggleGroupVal}
                                    onValueChange={(v) =>
                                        typeof v === 'string' && setToggleGroupVal(v)
                                    }
                                    aria-label="Affichage"
                                    items={[
                                        { value: 'grid', label: 'Grille' },
                                        { value: 'list', label: 'Liste' },
                                        { value: 'compact', label: 'Compact' },
                                    ]}
                                />
                            </Stack>

                            <Stack
                                direction="horizontal"
                                gap="md"
                                style={{ alignItems: 'center', flexWrap: 'wrap' }}
                            >
                                <CopyButton
                                    value="kubectl get pods -n monority-prod"
                                    label="Copier commande"
                                />
                                <ButtonLink href="#docs" size="sm" variant="secondary">
                                    Documentation API ↗
                                </ButtonLink>

                                <IconButton label="Recharger les sondes" tone="neutral" size="sm">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        aria-hidden="true"
                                    >
                                        <polyline points="23 4 23 10 17 10" />
                                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                    </svg>
                                </IconButton>

                                <Spinner size="md" tone="base" />
                                <Text size="sm" tone="muted">
                                    Synchronisation active
                                </Text>
                            </Stack>

                            <AsyncStateNotice
                                isLoading={true}
                                loadingMessage="Calcul des dépendances de micro-services..."
                            />

                            <Toast tone="success">
                                <Toast.Title>Contrat de version respecté</Toast.Title>
                                <Toast.Description>
                                    75 composants vérifiés sans divergence sémantique.
                                </Toast.Description>
                            </Toast>

                            <EmptyState>
                                <EmptyState.Icon>
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        aria-hidden="true"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                </EmptyState.Icon>
                                <EmptyState.Title>Aucun incident détecté</EmptyState.Title>
                                <EmptyState.Description>
                                    Le pipeline de contrôle n'a relevé aucune anomalie sur les 24
                                    dernières heures.
                                </EmptyState.Description>
                                <EmptyState.Actions>
                                    <Button size="sm" variant="secondary">
                                        Consulter l'historique
                                    </Button>
                                </EmptyState.Actions>
                            </EmptyState>

                            <Skeleton lines={2} />
                        </Stack>
                    </Card.Content>
                </Card>

                {/* 5. Données denses & Affichage structuré */}
                <Card>
                    <Card.Header>
                        <Stack gap="xs">
                            <Title as="h3" size="sm">
                                Données denses & Accordéons
                            </Title>
                            <Text tone="muted" size="sm">
                                DataTable avec tri, accordéons APG, sections repliables et
                                carrousel.
                            </Text>
                        </Stack>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <Accordion
                                items={[
                                    {
                                        value: 'sec-1',
                                        title: 'Politique de redondance géographique',
                                        content:
                                            'Les données sont répliquées sur trois zones de disponibilité distinctes avec failover automatique sous 50ms.',
                                    },
                                    {
                                        value: 'sec-2',
                                        title: 'Garanties SLA et temps de rétablissement',
                                        content:
                                            'Engagement de disponibilité de 99.99% avec RTO < 5 minutes et RPO < 1 seconde.',
                                    },
                                ]}
                            />

                            <Collapsible
                                title="Informations avancées de topologie"
                                defaultOpen={false}
                            >
                                <Text size="sm" tone="muted">
                                    VPC pairé avec chiffrement WireGuard point-à-point, filtrage
                                    eBPF en couche noyau.
                                </Text>
                            </Collapsible>

                            <MetricGrid
                                items={[
                                    {
                                        key: '1',
                                        label: 'Taux de cache',
                                        value: '99.4%',
                                        trend: '+0.2%',
                                    },
                                    {
                                        key: '2',
                                        label: 'Débit réseau',
                                        value: '4.8 Gbps',
                                        trend: '+12%',
                                    },
                                ]}
                            />

                            <DataTable
                                caption="File d'attente des builds"
                                columns={[
                                    { key: 'commit', header: 'Commit' },
                                    { key: 'branch', header: 'Branche' },
                                    { key: 'duration', header: 'Durée' },
                                ]}
                                rows={[
                                    {
                                        id: '1',
                                        commit: '4bdc262',
                                        branch: 'feat/stabilize',
                                        duration: '42s',
                                    },
                                    {
                                        id: '2',
                                        commit: '10b70fd',
                                        branch: 'feat/stabilize',
                                        duration: '38s',
                                    },
                                    {
                                        id: '3',
                                        commit: 'e89c3a1',
                                        branch: 'main',
                                        duration: '1m 12s',
                                    },
                                ]}
                                getRowId={(r) => r.id}
                            />

                            <Carousel
                                slides={[
                                    <div
                                        key="1"
                                        style={{
                                            padding: 'var(--mr-space-4)',
                                            background: 'var(--mr-bg-sunken)',
                                            borderRadius: 'var(--mr-radius-md)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Text size="sm" style={{ fontWeight: 600 }}>
                                            Diapositive 1 : Surveillance distribuée
                                        </Text>
                                        <Text size="sm" tone="muted">
                                            Collecte temps réel de 45 000 métriques/seconde
                                        </Text>
                                    </div>,
                                    <div
                                        key="2"
                                        style={{
                                            padding: 'var(--mr-space-4)',
                                            background: 'var(--mr-bg-sunken)',
                                            borderRadius: 'var(--mr-radius-md)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Text size="sm" style={{ fontWeight: 600 }}>
                                            Diapositive 2 : Chiffrement zéro-connaissance
                                        </Text>
                                        <Text size="sm" tone="muted">
                                            Clés rotatives gérées par enclave matérielle
                                        </Text>
                                    </div>,
                                ]}
                            />
                        </Stack>
                    </Card.Content>
                </Card>

                {/* 6. Primitives & Mise en page */}
                <Card>
                    <Card.Header>
                        <Stack gap="xs">
                            <Title as="h3" size="sm">
                                Primitives & Agencement
                            </Title>
                            <Text tone="muted" size="sm">
                                Panneaux redimensionnables, calendrier autonome et ratio d'aspect.
                            </Text>
                        </Stack>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <Section title="Section structurelle" variant="bordered">
                                <Text size="sm">
                                    Contenu de la section aligné sur la grille sémantique.
                                </Text>
                            </Section>

                            <AspectRatio ratio={16 / 5}>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background:
                                            'color-mix(in oklch, var(--mr-bg-sunken), var(--mr-text-primary) 5%)',
                                        borderRadius: 'var(--mr-radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid var(--mr-border-subtle)',
                                    }}
                                >
                                    <Text size="sm" tone="muted">
                                        Boîte AspectRatio verrouillée à 16:5
                                    </Text>
                                </div>
                            </AspectRatio>

                            <div
                                style={{
                                    height: '120px',
                                    border: '1px solid var(--mr-border-subtle)',
                                    borderRadius: 'var(--mr-radius-md)',
                                }}
                            >
                                <ResizablePanelGroup direction="horizontal">
                                    <ResizablePanel defaultSize={40}>
                                        <div
                                            style={{
                                                padding: 'var(--mr-space-3)',
                                                height: '100%',
                                                background: 'var(--mr-bg-surface)',
                                            }}
                                        >
                                            <Text size="sm" tone="muted">
                                                Panneau gauche (40%)
                                            </Text>
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle />
                                    <ResizablePanel defaultSize={60}>
                                        <div
                                            style={{
                                                padding: 'var(--mr-space-3)',
                                                height: '100%',
                                                background: 'var(--mr-bg-raised)',
                                            }}
                                        >
                                            <Text size="sm" tone="muted">
                                                Panneau droit glissant (60%)
                                            </Text>
                                        </div>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </div>

                            <Calendar value={dateValue} onChange={setDateValue} />
                        </Stack>
                    </Card.Content>
                </Card>
            </Grid>

            {/* Modales et Overlays montés sous condition */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Déploiement en production"
                description="Confirmez l'application des manifests sur le cluster principal."
                footer={
                    <Stack direction="horizontal" gap="sm" style={{ justifyContent: 'flex-end' }}>
                        <Button size="sm" variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Annuler
                        </Button>
                        <Button size="sm" variant="primary" onClick={() => setIsModalOpen(false)}>
                            Appliquer les changements
                        </Button>
                    </Stack>
                }
            >
                <Text size="sm">
                    Cette action va synchroniser 14 micro-services avec les nouveaux jetons de thème
                    calculés.
                </Text>
            </Modal>

            <AlertDialog
                open={isAlertOpen}
                onCancel={() => setIsAlertOpen(false)}
                onConfirm={() => setIsAlertOpen(false)}
                title="Arrêter le cluster critique ?"
                description="Cette action interrompra l'ingestion de télémétrie sur l'ensemble de la région."
                confirmLabel="Arrêter immédiatement"
                cancelLabel="Conserver actif"
                tone="danger"
            />

            <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Tiroir d'inspection système"
                side="right"
            >
                <div style={{ padding: 'var(--mr-space-4)' }}>
                    <Text size="sm">
                        Inspecteur latéral complet avec navigation clavier et piège de focus.
                    </Text>
                </div>
            </Drawer>

            <Sheet
                open={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                title="Feuille de paramètres rapides"
                description="Configuration rapide des alertes d'infrastructure."
                side="bottom"
            >
                <div style={{ padding: 'var(--mr-space-4)' }}>
                    <Text size="sm">Contenu de la feuille inférieure réactive et accessible.</Text>
                </div>
            </Sheet>

            <CommandPalette
                open={isCmdOpen}
                onClose={() => setIsCmdOpen(false)}
                title="Recherche globale Monority"
                items={[
                    {
                        value: '1',
                        label: 'Basculer en thème Sombre',
                        onSelect: () => setIsCmdOpen(false),
                    },
                    {
                        value: '2',
                        label: 'Déployer les sondes réseau',
                        onSelect: () => setIsCmdOpen(false),
                    },
                    {
                        value: '3',
                        label: 'Exporter la configuration JSON',
                        onSelect: () => setIsCmdOpen(false),
                    },
                    {
                        value: '4',
                        label: 'Consulter la documentation API',
                        onSelect: () => setIsCmdOpen(false),
                    },
                ]}
            />
        </Stack>
    )
}
