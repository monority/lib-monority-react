import {
    Accordion,
    AlertDialog,
    AspectRatio,
    AsyncStateNotice,
    Badge,
    BadgeDelta,
    Banner,
    Breadcrumb,
    Button,
    ButtonLink,
    Calendar,
    Card,
    Carousel,
    Checkbox,
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
    IconAlertCircle,
    IconAlertTriangle,
    IconBell,
    IconCalendar,
    IconCheck,
    IconCheckCircle,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronUp,
    IconClose,
    IconCopy,
    IconEye,
    IconEyeOff,
    IconInfo,
    IconMinus,
    IconPause,
    IconPlay,
    IconPlus,
    IconSearch,
    IconSparkles,
    IconUpload,
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
    Progress,
    RadioGroup,
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
    Section,
    SegmentedControl,
    Select,
    Sheet,
    Skeleton,
    Spinner,
    Stack,
    Stepper,
    Switch,
    Tabs,
    Text,
    Title,
    Toast,
    Toggle,
    ToggleGroup,
    Tooltip,
} from '@monority/ui'
import { useState } from 'react'

export function MoodboardCatalogView() {
    /* États pour les dialogues et overlays */
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isCmdOpen, setIsCmdOpen] = useState(false)
    const [showDynamicToast, setShowDynamicToast] = useState(false)

    /* États pour la démonstration asynchrone et micro-interactions */
    const [isAsyncLoading, setIsAsyncLoading] = useState(false)
    const [autoFailover, setAutoFailover] = useState(true)
    const [hardwareEncrypt, setHardwareEncrypt] = useState(true)
    const [selectVal, setSelectVal] = useState('fra-01')
    const [segmentedVal, setSegmentedVal] = useState('all')
    const [catalogSubTab, setCatalogSubTab] = useState('active')

    /* États pour la simulation de ProgressBar réaliste */
    const [realisticProgress, setRealisticProgress] = useState(65)
    const [isProgressRunning, setIsProgressRunning] = useState(false)
    const [progressStatus, setProgressStatus] = useState<'idle' | 'running' | 'done'>('idle')

    const triggerRealisticProgress = () => {
        setIsProgressRunning(true)
        setProgressStatus('running')
        /* 1. Démarrage instantané (0ms) à 18% */
        setRealisticProgress(18)

        setTimeout(() => setRealisticProgress(48), 250)
        setTimeout(() => setRealisticProgress(74), 550)
        setTimeout(() => setRealisticProgress(84), 900)
        setTimeout(() => setRealisticProgress(86), 1400)
        setTimeout(() => setRealisticProgress(88), 1900)

        /* 2. Téléportation finale de 88% à 100% à la réponse */
        setTimeout(() => {
            setRealisticProgress(100)
            setIsProgressRunning(false)
            setProgressStatus('done')
        }, 2500)
    }

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
    const [filterSearch, setFilterSearch] = useState('')
    const [activeFilterChip, setActiveFilterChip] = useState<'all' | 'eu' | 'prod'>('all')

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

            {/* Barre de contrôle interactif des animations et états asynchrones */}
            <Card style={{ background: 'var(--mr-bg-sunken)' }}>
                <Card.Content>
                    <Stack
                        direction="horizontal"
                        gap="lg"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Stack
                            direction="horizontal"
                            gap="md"
                            style={{ alignItems: 'center', flexWrap: 'wrap' }}
                        >
                            <Switch
                                label="Simuler requêtes réseau asynchrones"
                                checked={isAsyncLoading}
                                onChange={(e) => setIsAsyncLoading(e.target.checked)}
                                hint="Active les spinners intégrés et curseurs d'attente (Select & Combobox)"
                            />
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setShowDynamicToast(true)}
                            >
                                Déclencher Toast animé
                            </Button>
                        </Stack>
                        <SegmentedControl
                            value={segmentedVal}
                            onChange={setSegmentedVal}
                            options={[
                                { value: 'all', label: 'Toutes les vues' },
                                { value: 'async', label: 'Focus asynchrone' },
                                { value: 'motion', label: 'Focus micro-interactions' },
                            ]}
                            size="sm"
                        />
                    </Stack>
                </Card.Content>
            </Card>

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
                            {showDynamicToast && (
                                <Toast tone="info" onClose={() => setShowDynamicToast(false)}>
                                    <Toast.Title>Notification temps réel</Toast.Title>
                                    <Toast.Description>
                                        Animation d’entrée fluide avec translation verticale et
                                        opacité progressive.
                                    </Toast.Description>
                                </Toast>
                            )}

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
                                        <div style={{ width: '220px' }}>
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

                            <Tabs
                                value={catalogSubTab}
                                onChange={setCatalogSubTab}
                                items={[
                                    { value: 'active', label: 'Charges actives' },
                                    { value: 'canary', label: 'Canary rollout' },
                                    { value: 'standby', label: 'En attente' },
                                ]}
                                size="sm"
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
                                <FilterBar.Main>
                                    <FilterBar.Leading>
                                        <Input
                                            size="sm"
                                            placeholder="Filtrer clusters..."
                                            value={filterSearch}
                                            onChange={(e) => setFilterSearch(e.target.value)}
                                            clearable
                                        />
                                    </FilterBar.Leading>
                                    <FilterBar.Chips>
                                        <FilterBar.Chip
                                            active={activeFilterChip === 'all'}
                                            onClick={() => setActiveFilterChip('all')}
                                        >
                                            Statut : Tous
                                        </FilterBar.Chip>
                                        <FilterBar.Chip
                                            active={activeFilterChip === 'eu'}
                                            onClick={() => setActiveFilterChip('eu')}
                                        >
                                            Région : Europe
                                        </FilterBar.Chip>
                                        <FilterBar.Chip
                                            active={activeFilterChip === 'prod'}
                                            onClick={() => setActiveFilterChip('prod')}
                                        >
                                            Environnement : Prod
                                        </FilterBar.Chip>
                                    </FilterBar.Chips>
                                </FilterBar.Main>
                                <FilterBar.Meta>
                                    <Text size="sm" tone="muted">
                                        18 clusters actifs
                                    </Text>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                            setActiveFilterChip('all')
                                            setFilterSearch('')
                                        }}
                                    >
                                        Réinitialiser
                                    </Button>
                                </FilterBar.Meta>
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
                                Calendrier, sélecteurs asynchrones, radio-groupes, nombres et
                                fichiers.
                            </Text>
                        </Stack>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="md">
                            <Grid columns={2} gap="md">
                                <Select
                                    label="Cluster cible (asynchrone)"
                                    value={selectVal}
                                    onChange={(e) => setSelectVal(e.target.value)}
                                    loading={isAsyncLoading}
                                    hint="Supporte l'état asynchrone avec spinner intégré"
                                >
                                    <option value="fra-01">Frankfurt Core 01 (EU)</option>
                                    <option value="cdg-02">Paris Datacenter 02 (EU)</option>
                                    <option value="ams-01">Amsterdam Ring 01 (EU)</option>
                                </Select>

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
                                    clearable
                                    loading={isAsyncLoading}
                                    hint="Filtrable, effaçable (clearable) et réactif au réseau"
                                />
                            </Grid>

                            <Grid columns={2} gap="md">
                                <Switch
                                    label="Failover automatique"
                                    checked={autoFailover}
                                    onChange={(e) => setAutoFailover(e.target.checked)}
                                    hint="Micro-interaction tactile :active avec transition douce"
                                />
                                <Checkbox
                                    label="Chiffrement matériel AES-256"
                                    checked={hardwareEncrypt}
                                    onChange={(e) => setHardwareEncrypt(e.target.checked)}
                                    hint="Transition d’échelle sur la coche et compression tactile"
                                />
                            </Grid>

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
                            <Stack
                                direction="horizontal"
                                gap="sm"
                                style={{ flexWrap: 'wrap', alignItems: 'center' }}
                            >
                                <Badge tone="neutral" size="sm">
                                    Neutre
                                </Badge>
                                <Badge tone="info" size="sm">
                                    Info
                                </Badge>
                                <Badge tone="success" size="sm">
                                    Succès
                                </Badge>
                                <Badge tone="warning" size="sm">
                                    Avertissement
                                </Badge>
                                <Badge tone="danger" size="sm">
                                    Erreur
                                </Badge>
                                <BadgeDelta deltaType="increase" size="sm">
                                    +14.2%
                                </BadgeDelta>
                                <BadgeDelta deltaType="decrease" size="sm">
                                    -2.8%
                                </BadgeDelta>
                            </Stack>

                            <Stack direction="horizontal" gap="sm" style={{ flexWrap: 'wrap' }}>
                                <Button size="sm" variant="primary" loading={isAsyncLoading}>
                                    Action primaire
                                </Button>
                                <Button size="sm" variant="secondary" loading={isAsyncLoading}>
                                    Action secondaire
                                </Button>
                                <Button size="sm" variant="danger" loading={isAsyncLoading}>
                                    Action critique
                                </Button>
                            </Stack>

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
                                    <IconSparkles size={14} />
                                </IconButton>

                                <Spinner size="md" tone="base" />
                                <Text size="sm" tone="muted">
                                    Synchronisation active
                                </Text>
                            </Stack>

                            <Stack gap="xs">
                                <Progress
                                    value={realisticProgress}
                                    label={
                                        progressStatus === 'running'
                                            ? 'Déploiement en cours (stries actives en stagnation)...'
                                            : progressStatus === 'done'
                                              ? 'Déploiement achevé (téléporté à 100%)'
                                              : 'Flux réaliste de chargement'
                                    }
                                    tone={progressStatus === 'done' ? 'success' : 'accent'}
                                    striped={isProgressRunning || isAsyncLoading}
                                    animated={isProgressRunning || isAsyncLoading}
                                />
                                <Stack
                                    direction="horizontal"
                                    gap="sm"
                                    style={{ alignItems: 'center', flexWrap: 'wrap' }}
                                >
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={triggerRealisticProgress}
                                        disabled={isProgressRunning}
                                    >
                                        {isProgressRunning
                                            ? 'Opération en cours...'
                                            : 'Simuler progression réaliste'}
                                    </Button>
                                    <Text size="sm" tone="muted">
                                        Démarrage instantané, stagnation à 85% avec stries, bond à
                                        100%.
                                    </Text>
                                </Stack>
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
                                    <IconAlertCircle size={32} />
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
                                    {
                                        value: 'sec-3',
                                        title: 'Dépliage fluide CSS Grid & Accélération matérielle',
                                        content:
                                            'Animation fluide basée sur grid-template-rows: 0fr -> 1fr sans recalcul de hauteur JavaScript. Conforme prefers-reduced-motion.',
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

                {/* 7. Bibliothèque d'icônes natives */}
                <Card style={{ gridColumn: '1 / -1' }}>
                    <Card.Header>
                        <Stack gap="xs">
                            <Title as="h3" size="sm">
                                Icônes natives vectorielles (@monority/ui/icons)
                            </Title>
                            <Text tone="muted" size="sm">
                                Collection SVG intégrée sans dépendance externe, héritant de
                                currentColor et réactive au thème.
                            </Text>
                        </Stack>
                    </Card.Header>
                    <Card.Content>
                        <Grid columns="auto-fill" gap="sm">
                            {[
                                { name: 'Check', icon: <IconCheck size={18} /> },
                                { name: 'CheckCircle', icon: <IconCheckCircle size={18} /> },
                                { name: 'Search', icon: <IconSearch size={18} /> },
                                { name: 'Bell', icon: <IconBell size={18} /> },
                                { name: 'Calendar', icon: <IconCalendar size={18} /> },
                                { name: 'Sparkles', icon: <IconSparkles size={18} /> },
                                { name: 'AlertTriangle', icon: <IconAlertTriangle size={18} /> },
                                { name: 'AlertCircle', icon: <IconAlertCircle size={18} /> },
                                { name: 'Info', icon: <IconInfo size={18} /> },
                                { name: 'Copy', icon: <IconCopy size={18} /> },
                                { name: 'Upload', icon: <IconUpload size={18} /> },
                                { name: 'Eye', icon: <IconEye size={18} /> },
                                { name: 'EyeOff', icon: <IconEyeOff size={18} /> },
                                { name: 'Plus', icon: <IconPlus size={18} /> },
                                { name: 'Minus', icon: <IconMinus size={18} /> },
                                { name: 'Close', icon: <IconClose size={18} /> },
                                { name: 'Play', icon: <IconPlay size={18} /> },
                                { name: 'Pause', icon: <IconPause size={18} /> },
                                { name: 'ChevronLeft', icon: <IconChevronLeft size={18} /> },
                                { name: 'ChevronRight', icon: <IconChevronRight size={18} /> },
                                { name: 'ChevronUp', icon: <IconChevronUp size={18} /> },
                                { name: 'ChevronDown', icon: <IconChevronDown size={18} /> },
                            ].map(({ name, icon }) => (
                                <div
                                    key={name}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 'var(--mr-space-2)',
                                        padding: 'var(--mr-space-3)',
                                        borderRadius: 'var(--mr-radius-md)',
                                        backgroundColor: 'var(--mr-bg-sunken)',
                                        border: '1px solid var(--mr-border-subtle)',
                                        textAlign: 'center',
                                        minInlineSize: '100px',
                                    }}
                                >
                                    <span style={{ color: 'var(--mr-text-primary)' }}>{icon}</span>
                                    <Text
                                        size="sm"
                                        tone="muted"
                                        style={{
                                            fontSize: 'var(--mr-font-size-xs)',
                                            wordBreak: 'break-all',
                                        }}
                                    >
                                        {name}
                                    </Text>
                                </div>
                            ))}
                        </Grid>
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
