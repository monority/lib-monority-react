import { useState } from 'react'
import {
    Accordion,
    AlertDialog,
    Badge,
    Button,
    Callout,
    Card,
    Checkbox,
    Divider,
    DropdownMenu,
    EmptyState,
    Grid,
    IconButton,
    Input,
    Section,
    Popover,
    RadioGroup,
    Select,
    Skeleton,
    Stack,
    Switch,
    Tabs,
    Text,
    Textarea,
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
    const [selectedPlan, setSelectedPlan] = useState('starter')
    const { pushToast } = useToast()

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
                    />
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
