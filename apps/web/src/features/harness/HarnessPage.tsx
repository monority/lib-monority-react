import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
    AsyncStateNotice,
    Badge,
    Banner,
    Button,
    ButtonLink,
    Calendar,
    Callout,
    Checkbox,
    Combobox,
    type ComboboxItem,
    CopyButton,
    DatePicker,
    DateRangePicker,
    EmptyState,
    Field,
    FileUpload,
    FormSection,
    IconButton,
    InlineAlert,
    Input,
    NumberInput,
    PasswordInput,
    positionOverlay,
    Progress,
    RadioGroup,
    Select,
    Skeleton,
    Slider,
    Spinner,
    Switch,
    Textarea,
    ThemeScope,
    Toast,
    Toggle,
    ToggleGroup,
} from '@monority/ui'
import './harness.css'
import {
    AlertDialogHarness,
    CommandPaletteHarness,
    ContextMenuHarness,
    DrawerHarness,
    DropdownMenuHarness,
    HoverCardHarness,
    ModalHarness,
    PopoverHarness,
    TooltipHarness,
} from './modules/overlays'
import {
    BreadcrumbHarness,
    FilterBarHarness,
    MenubarHarness,
    NavigationMenuHarness,
    PaginationHarness,
    SidebarLayoutHarness,
    TabsHarness,
    TopbarHarness,
} from './modules/navigation'
import {
    DataListHarness,
    DataTableHarness,
    MetricGridHarness,
    StatCardHarness,
    TableHarness,
} from './modules/data'
import {
    AccordionHarness,
    AvatarHarness,
    CardHarness,
    CarouselHarness,
    CollapsibleHarness,
} from './modules/display'
import {
    AspectRatioHarness,
    ContainerHarness,
    DividerHarness,
    GridHarness,
    PageHeaderHarness,
    ResizableHarness,
    ScrollAreaHarness,
    SectionHarness,
    SeparatorHarness,
    StackHarness,
    ToolbarHarness,
} from './modules/layout'
import { KbdHarness, PreCodeHarness, TextHarness, TitleHarness } from './modules/typography'
import { PasswordInputHarness } from './modules/forms-extra'
import { InfiniteScrollHarness } from './modules/experimental'

const SearchIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM13 13l4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const CheckIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d="M4.5 10.5l3.5 3.5 7.5-7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const ClearIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
            d="M6 6l8 8M14 6l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
)

const themes = ['light', 'dark', 'oled', 'slate', 'ocean', 'night', 'high-contrast'] as const
const densities = ['comfortable', 'compact'] as const
const brands = ['monority', 'studio'] as const
type Theme = (typeof themes)[number]
type Density = (typeof densities)[number]
type Brand = (typeof brands)[number]

const isAllowed = <T extends string>(values: readonly T[], value: string | null): value is T =>
    values.includes(value as T)

function Sample({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <section
            data-harness-sample
            data-testid={`sample-${label.toLowerCase().replaceAll(' ', '-')}`}
        >
            <span className="harness-sample-label">{label}</span>
            {children}
        </section>
    )
}

function ButtonHarness() {
    const variants = ['primary', 'secondary', 'ghost', 'danger'] as const
    return (
        <>
            {variants.flatMap((variant) =>
                (['sm', 'md', 'lg'] as const).map((size) => (
                    <Sample key={`${variant}-${size}`} label={`${variant} ${size}`}>
                        <Button variant={variant} size={size}>
                            Enregistrer
                        </Button>
                    </Sample>
                ))
            )}
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <Sample key={`icon-only-${size}`} label={`icon-only ${size}`}>
                    <Button iconOnly size={size} aria-label="Action">
                        ★
                    </Button>
                </Sample>
            ))}
            <Sample label="disabled">
                <Button disabled>Enregistrer</Button>
            </Sample>
            <Sample label="danger disabled">
                <Button variant="danger" disabled>
                    Supprimer
                </Button>
            </Sample>
            <Sample label="warning (alias)">
                <Button variant="warning">Avertissement</Button>
            </Sample>
            <Sample label="loading primary">
                <Button loading>Enregistrer</Button>
            </Sample>
            <Sample label="loading secondary">
                <Button variant="secondary" loading>
                    Enregistrer
                </Button>
            </Sample>
            <Sample label="loading ghost">
                <Button variant="ghost" loading>
                    Enregistrer
                </Button>
            </Sample>
            <Sample label="loading danger">
                <Button variant="danger" loading>
                    Supprimer
                </Button>
            </Sample>
            <Sample label="full width">
                <div style={{ width: '100%' }}>
                    <Button fullWidth>Pleine largeur</Button>
                </div>
            </Sample>
            <Sample label="full width iconOnly">
                <div style={{ width: '100%' }}>
                    <Button fullWidth iconOnly aria-label="Action">
                        ★
                    </Button>
                </div>
            </Sample>
        </>
    )
}

function IconButtonHarness() {
    return (
        <>
            {(['neutral', 'accent', 'danger'] as const).flatMap((tone) =>
                (['sm', 'md', 'lg'] as const).map((size) => (
                    <Sample key={`${tone}-${size}`} label={`${tone} ${size}`}>
                        <IconButton tone={tone} size={size} label="Ajouter">
                            +
                        </IconButton>
                    </Sample>
                ))
            )}
            <Sample label="disabled">
                <IconButton disabled label="Ajouter">
                    +
                </IconButton>
            </Sample>
            <Sample label="loading">
                <IconButton loading label="Ajouter">
                    +
                </IconButton>
            </Sample>
        </>
    )
}

function CopyButtonHarness() {
    return (
        <>
            {(['subtle', 'outline', 'solid'] as const).flatMap((variant) =>
                (['sm', 'md', 'lg'] as const).map((size) => (
                    <Sample key={`${variant}-${size}`} label={`${variant} ${size}`}>
                        <CopyButton value="monority" variant={variant} size={size} />
                    </Sample>
                ))
            )}
            <Sample label="disabled">
                <CopyButton value="monority" disabled />
            </Sample>
        </>
    )
}

function SpinnerHarness() {
    return (
        <>
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <Sample key={size} label={`taille ${size}`}>
                    <Spinner size={size} />
                </Sample>
            ))}
            {(['base', 'muted', 'inverse'] as const).map((tone) => (
                <Sample key={tone} label={`ton ${tone}`}>
                    <div
                        style={{
                            backgroundColor:
                                tone === 'inverse' ? 'var(--mr-bg-inverse)' : undefined,
                            padding: tone === 'inverse' ? '8px' : undefined,
                            borderRadius: '4px',
                            display: 'inline-flex',
                        }}
                    >
                        <Spinner tone={tone} />
                    </div>
                </Sample>
            ))}
            <Sample label="chargement en ligne">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--mr-text-secondary)',
                    }}
                >
                    <Spinner size="sm" />
                    <span>Chargement des données en cours...</span>
                </div>
            </Sample>
        </>
    )
}

function ButtonLinkHarness() {
    const variants = ['primary', 'secondary', 'ghost', 'danger'] as const
    return (
        <>
            {variants.flatMap((variant) =>
                (['sm', 'md', 'lg'] as const).map((size) => (
                    <Sample key={`${variant}-${size}`} label={`${variant} ${size}`}>
                        <ButtonLink href="/harness/button-link" variant={variant} size={size}>
                            Lien
                        </ButtonLink>
                    </Sample>
                ))
            )}
            <Sample label="disabled">
                <ButtonLink href="/harness/button-link" disabled>
                    Lien désactivé
                </ButtonLink>
            </Sample>
            <Sample label="danger disabled">
                <ButtonLink href="/harness/button-link" variant="danger" disabled>
                    Action destructive
                </ButtonLink>
            </Sample>
            <Sample label="loading primary">
                <ButtonLink href="/harness/button-link" variant="primary" loading>
                    Navigation en cours
                </ButtonLink>
            </Sample>
            <Sample label="loading secondary">
                <ButtonLink href="/harness/button-link" variant="secondary" loading>
                    Navigation en cours
                </ButtonLink>
            </Sample>
            <Sample label="with icons">
                <ButtonLink
                    href="/harness/button-link"
                    iconLeading={<SearchIcon />}
                    iconTrailing={<CheckIcon />}
                >
                    Recherche
                </ButtonLink>
            </Sample>
            <Sample label="full width">
                <div style={{ width: '100%' }}>
                    <ButtonLink href="/harness/button-link" fullWidth>
                        Pleine largeur
                    </ButtonLink>
                </div>
            </Sample>
        </>
    )
}

function PositionHarness() {
    const anchorRef = useRef<HTMLButtonElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!anchorRef.current || !overlayRef.current) return
        return positionOverlay(overlayRef.current, anchorRef.current.getBoundingClientRect(), {
            placement: 'bottom',
            offset: '--mr-spacing-1',
        })
    }, [])

    return (
        <div data-testid="position-harness" style={{ height: 480, position: 'relative' }}>
            <button
                type="button"
                ref={anchorRef}
                data-testid="position-anchor"
                style={{ position: 'absolute', left: 180, top: 120 }}
            >
                Anchor
            </button>
            <div ref={overlayRef} data-testid="position-overlay" style={{ width: 96, height: 48 }}>
                Overlay
            </div>
        </div>
    )
}

function InvalidInputSample() {
    const [val, setVal] = useState('750')
    const isInvalid = val.trim().length !== 5
    return (
        <Input
            size="md"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            invalid={isInvalid}
            label="Code postal (saisissez 5 chiffres pour valider)"
            error={isInvalid ? 'Le code postal doit comporter exactement 5 chiffres.' : undefined}
            placeholder="ex: 75001"
        />
    )
}

function InputHarness() {
    return (
        <>
            <Sample label="exploration input seul">
                <Input id="input-standalone" defaultValue="Input seul" />
            </Sample>
            <Sample label="exploration input dans field">
                <Field>
                    <Input id="input-in-field" defaultValue="Input dans Field" />
                </Field>
            </Sample>
            <Sample label="exploration input sm">
                <Input id="input-exploration-sm" size="sm" defaultValue="Input sm" />
            </Sample>
            <Sample label="taille sm">
                <Input
                    size="sm"
                    id="input-size-sm"
                    defaultValue="Taille sm (28px)"
                    placeholder="sm..."
                />
            </Sample>
            <Sample label="taille md">
                <Input
                    size="md"
                    id="input-size-md"
                    defaultValue="Taille md (32px)"
                    placeholder="md..."
                />
            </Sample>
            <Sample label="taille md par defaut">
                <Input
                    id="input-size-default"
                    defaultValue="Taille md defaut"
                    placeholder="defaut..."
                />
            </Sample>
            <Sample label="taille lg">
                <Input
                    size="lg"
                    id="input-size-lg"
                    defaultValue="Taille lg (40px)"
                    placeholder="lg..."
                />
            </Sample>
            <Sample label="alignement bouton et input sm">
                <div
                    id="align-container-sm"
                    style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}
                >
                    <Button size="sm" id="btn-align-sm">
                        Bouton sm
                    </Button>
                    <Input size="sm" defaultValue="Input sm" id="input-align-sm" />
                </div>
            </Sample>
            <Sample label="alignement bouton et input md">
                <div
                    id="align-container-md"
                    style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}
                >
                    <Button size="md" id="btn-align-md">
                        Bouton md
                    </Button>
                    <Input size="md" defaultValue="Input md" id="input-align-md" />
                </div>
            </Sample>
            <Sample label="alignement bouton et input lg">
                <div
                    id="align-container-lg"
                    style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}
                >
                    <Button size="lg" id="btn-align-lg">
                        Bouton lg
                    </Button>
                    <Input size="lg" defaultValue="Input lg" id="input-align-lg" />
                </div>
            </Sample>
            <Sample label="champ vide avec placeholder">
                <Input placeholder="Entrez une valeur..." />
            </Sample>
            <Sample label="champ avec valeur">
                <Input defaultValue="Texte saisi" placeholder="Entrez une valeur..." />
            </Sample>
            <Sample label="survol réel">
                <Input
                    id="input-harness-hover"
                    defaultValue="Survol réel"
                    placeholder="Survol..."
                />
            </Sample>
            <Sample label="focus clavier">
                <Input
                    id="input-harness-focus"
                    defaultValue="Champ actif avec focus"
                    placeholder="Entrez une valeur..."
                />
            </Sample>
            <Sample label="invalide (statique)">
                <Input invalid defaultValue="Valeur erronée" placeholder="Entrez une valeur..." />
            </Sample>
            <Sample label="invalide (se valide à 5 chiffres)">
                <InvalidInputSample />
            </Sample>
            <Sample label="invalide avec focus">
                <Input
                    id="input-harness-invalid-focus"
                    invalid
                    defaultValue="Erreur avec focus"
                    placeholder="Entrez une valeur..."
                />
            </Sample>
            <Sample label="désactivé">
                <Input disabled defaultValue="Champ désactivé" />
            </Sample>
            <Sample label="lecture seule">
                <Input readOnly defaultValue="Valeur en lecture seule" />
            </Sample>
            <Sample label="placeholder désactivé">
                <Input disabled placeholder="Placeholder désactivé..." />
            </Sample>
            <Sample label="input with icon leading sm">
                <Input
                    size="sm"
                    id="input-icon-leading-sm"
                    iconLeading={<SearchIcon />}
                    placeholder="Rechercher (sm)..."
                />
            </Sample>
            <Sample label="input with icon leading md">
                <Input
                    size="md"
                    id="input-icon-leading-md"
                    iconLeading={<SearchIcon />}
                    placeholder="Rechercher (md)..."
                />
            </Sample>
            <Sample label="input with icon leading lg">
                <Input
                    size="lg"
                    id="input-icon-leading-lg"
                    iconLeading={<SearchIcon />}
                    placeholder="Rechercher (lg)..."
                />
            </Sample>
            <Sample label="input with icon trailing">
                <Input
                    id="input-icon-trailing"
                    iconTrailing={<CheckIcon />}
                    defaultValue="Champ validé"
                />
            </Sample>
            <Sample label="input with both icons">
                <Input
                    id="input-icons-both"
                    iconLeading={<SearchIcon />}
                    iconTrailing={<ClearIcon />}
                    defaultValue="Texte avec deux icônes"
                />
            </Sample>
            <Sample label="input with password sm">
                <PasswordInput
                    size="sm"
                    id="input-password-sm"
                    placeholder="Mot de passe sm..."
                    defaultValue="secret123"
                />
            </Sample>
            <Sample label="input with password md">
                <PasswordInput
                    size="md"
                    id="input-password-md"
                    placeholder="Mot de passe md..."
                    defaultValue="secret123"
                />
            </Sample>
            <Sample label="input with password lg">
                <PasswordInput
                    size="lg"
                    id="input-password-lg"
                    placeholder="Mot de passe lg..."
                    defaultValue="secret123"
                />
            </Sample>
            <Sample label="input with password direct">
                <Input
                    type="password"
                    showPasswordToggle
                    id="input-password-direct"
                    placeholder="Input direct avec toggle..."
                    defaultValue="direct-secret"
                />
            </Sample>
            <Sample label="input with password disabled">
                <PasswordInput
                    disabled
                    id="input-password-disabled"
                    defaultValue="secret-disabled"
                />
            </Sample>
        </>
    )
}

function FieldHarness() {
    return (
        <>
            <Sample label="Field avec label et Input sm">
                <Field label="Étiquette champ sm">
                    <Input size="sm" defaultValue="Valeur sm" placeholder="Entrez une valeur..." />
                </Field>
            </Sample>
            <Sample label="Field avec label et Input md">
                <Field label="Étiquette champ md">
                    <Input size="md" defaultValue="Valeur md" placeholder="Entrez une valeur..." />
                </Field>
            </Sample>
            <Sample label="Field avec label et Input lg">
                <Field label="Étiquette champ lg">
                    <Input size="lg" defaultValue="Valeur lg" placeholder="Entrez une valeur..." />
                </Field>
            </Sample>
            <Sample label="Input seul md (sans Field extérieur ni label)">
                <Input size="md" defaultValue="Champ autonome" />
            </Sample>
            <Sample label="Field sans label avec Input md">
                <Field>
                    <Input size="md" defaultValue="Sans étiquette" />
                </Field>
            </Sample>
            <Sample label="Field avec label, Input md et texte d'aide">
                <Field label="Adresse email" hint="Format attendu : nom@exemple.com">
                    <Input size="md" defaultValue="contact@monority.dev" />
                </Field>
            </Sample>
            <Sample label="Field avec aide sur deux lignes (conteneur étroit)">
                <div style={{ maxWidth: 220 }}>
                    <Field
                        label="Mot de passe"
                        hint="Doit contenir au moins 12 caractères et inclure un chiffre."
                    >
                        <Input size="md" type="password" defaultValue="secret123456" />
                    </Field>
                </div>
            </Sample>
            <Sample label="Field avec label requis et Input md">
                <Field label="Nom obligatoire" required>
                    <Input size="md" defaultValue="Jean Dupont" />
                </Field>
            </Sample>
            <Sample label="Field avec message d'erreur et Input invalide">
                <Field label="Code postal" error="Le code postal doit comporter 5 chiffres">
                    <Input size="md" invalid defaultValue="750" />
                </Field>
            </Sample>
            <Sample label="Field complet : requis, aide et erreur">
                <Field
                    label="Identifiant"
                    required
                    hint="Lettres minuscules et chiffres uniquement"
                    error="Cet identifiant est déjà utilisé"
                >
                    <Input size="md" invalid defaultValue="admin" />
                </Field>
            </Sample>
        </>
    )
}

function InvalidTextareaSample() {
    const [text, setText] = useState('Trop court')
    const isInvalid = text.trim().length < 20
    return (
        <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            invalid={isInvalid}
            label="Commentaire détaillé (au moins 20 caractères pour valider)"
            error={
                isInvalid
                    ? `Commentaire trop court (${text.trim().length}/20 caractères requis).`
                    : undefined
            }
            placeholder="Saisissez au moins 20 caractères..."
        />
    )
}

function TextareaHarness() {
    return (
        <>
            <Sample label="taille sm">
                <Textarea
                    size="sm"
                    id="textarea-size-sm"
                    defaultValue="Taille sm (padding-inline: 12px)"
                    placeholder="sm..."
                />
            </Sample>
            <Sample label="taille md">
                <Textarea
                    size="md"
                    id="textarea-size-md"
                    defaultValue="Taille md (padding-inline: 16px)"
                    placeholder="md..."
                />
            </Sample>
            <Sample label="taille md par defaut">
                <Textarea
                    id="textarea-size-default"
                    defaultValue="Taille md defaut"
                    placeholder="defaut..."
                />
            </Sample>
            <Sample label="taille lg">
                <Textarea
                    size="lg"
                    id="textarea-size-lg"
                    defaultValue="Taille lg (padding-inline: 20px)"
                    placeholder="lg..."
                />
            </Sample>
            <Sample label="champ vide avec placeholder">
                <Textarea placeholder="Entrez une description detaillee..." />
            </Sample>
            <Sample label="champ avec valeur">
                <Textarea defaultValue="Texte multiligne saisi dans le textarea." />
            </Sample>
            <Sample label="survol réel">
                <Textarea
                    id="textarea-harness-hover"
                    defaultValue="Survol réel"
                    placeholder="Survol..."
                />
            </Sample>
            <Sample label="focus clavier">
                <Textarea
                    id="textarea-harness-focus"
                    defaultValue="Champ actif avec focus"
                    placeholder="Entrez une valeur..."
                />
            </Sample>
            <Sample label="invalide">
                <Textarea invalid defaultValue="Contenu non conforme" />
            </Sample>
            <Sample label="invalide avec focus">
                <Textarea
                    id="textarea-harness-invalid-focus"
                    invalid
                    defaultValue="Erreur avec focus"
                />
            </Sample>
            <Sample label="désactivé">
                <Textarea disabled defaultValue="Champ désactivé en écriture" />
            </Sample>
            <Sample label="placeholder désactivé">
                <Textarea disabled placeholder="Placeholder désactivé..." />
            </Sample>
            <Sample label="lecture seule">
                <Textarea
                    readOnly
                    defaultValue="Ce texte est en lecture seule et ne peut pas être modifié."
                />
            </Sample>
            <Sample label="redimensionnement vertical (défaut)">
                <Textarea
                    resize="vertical"
                    defaultValue="Redimensionnement vertical (resize: vertical)."
                />
            </Sample>
            <Sample label="redimensionnement none">
                <Textarea resize="none" defaultValue="Redimensionnement interdit (resize: none)." />
            </Sample>
            <Sample label="redimensionnement both">
                <Textarea
                    resize="both"
                    defaultValue="Redimensionnement vertical uniquement même avec both."
                />
            </Sample>
            <Sample label="avec label et texte d'aide">
                <Textarea
                    label="Description du projet"
                    hint="Expliquez brièvement votre projet en quelques phrases."
                    placeholder="Votre description..."
                />
            </Sample>
            <Sample label="avec message d'erreur et invalide">
                <Textarea
                    label="Commentaire"
                    error="Le commentaire ne respecte pas les règles de modération."
                    defaultValue="Contenu refusé"
                />
            </Sample>
            <Sample label="invalide (se valide dès 20 caractères)">
                <InvalidTextareaSample />
            </Sample>
            <Sample label="avec compteur de caractères">
                <Textarea
                    label="Bio"
                    maxLength={100}
                    defaultValue="Ceci est un texte de présentation court."
                />
            </Sample>
            <Sample label="compteur avec limite atteinte (25/25)">
                <Textarea
                    label="Limite exacte"
                    maxLength={25}
                    defaultValue="Message de 25 caracteres!"
                />
            </Sample>
            <Sample label="compteur avec dépassement de limite">
                <Textarea
                    label="Message limité"
                    maxLength={25}
                    defaultValue="Message presque à la limite"
                />
            </Sample>
        </>
    )
}

function InvalidSelectSample() {
    const [val, setVal] = useState('')
    const isInvalid = !val
    return (
        <Select
            value={val}
            onChange={(e) => setVal(e.target.value)}
            invalid={isInvalid}
            label="Pays (sélectionnez une option pour valider)"
            error={isInvalid ? 'Veuillez sélectionner un pays pour continuer.' : undefined}
        >
            <option value="">Sélectionnez un pays...</option>
            <option value="fr">France</option>
            <option value="be">Belgique</option>
            <option value="ch">Suisse</option>
            <option value="ca">Canada</option>
        </Select>
    )
}

function SelectHarness() {
    return (
        <>
            <Sample label="taille sm">
                <Select size="sm" id="select-size-sm" defaultValue="fr">
                    <option value="fr">France (sm 28px)</option>
                    <option value="de">Allemagne</option>
                    <option value="es">Espagne</option>
                </Select>
            </Sample>
            <Sample label="taille md">
                <Select size="md" id="select-size-md" defaultValue="fr">
                    <option value="fr">France (md 32px)</option>
                    <option value="de">Allemagne</option>
                    <option value="es">Espagne</option>
                </Select>
            </Sample>
            <Sample label="taille md par defaut">
                <Select id="select-size-default" defaultValue="fr">
                    <option value="fr">France (défaut)</option>
                    <option value="de">Allemagne</option>
                </Select>
            </Sample>
            <Sample label="taille lg">
                <Select size="lg" id="select-size-lg" defaultValue="fr">
                    <option value="fr">France (lg 40px)</option>
                    <option value="de">Allemagne</option>
                    <option value="es">Espagne</option>
                </Select>
            </Sample>
            <Sample label="alignement bouton et select sm">
                <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}>
                    <Button size="sm">Bouton sm</Button>
                    <Select size="sm" defaultValue="1">
                        <option value="1">Select sm</option>
                    </Select>
                </div>
            </Sample>
            <Sample label="alignement bouton et select md">
                <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}>
                    <Button size="md">Bouton md</Button>
                    <Select size="md" defaultValue="1">
                        <option value="1">Select md</option>
                    </Select>
                </div>
            </Sample>
            <Sample label="alignement bouton et select lg">
                <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}>
                    <Button size="lg">Bouton lg</Button>
                    <Select size="lg" defaultValue="1">
                        <option value="1">Select lg</option>
                    </Select>
                </div>
            </Sample>
            <Sample label="avec placeholder non selectionne">
                <Select defaultValue="">
                    <option value="">Choisissez une option...</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                </Select>
            </Sample>
            <Sample label="survol réel">
                <Select id="select-harness-hover" defaultValue="hover">
                    <option value="hover">Survol réel</option>
                </Select>
            </Sample>
            <Sample label="focus clavier">
                <Select id="select-harness-focus" defaultValue="focus">
                    <option value="focus">Focus clavier</option>
                </Select>
            </Sample>
            <Sample label="invalide">
                <Select invalid defaultValue="">
                    <option value="">Sélection requise...</option>
                    <option value="1">Option 1</option>
                </Select>
            </Sample>
            <Sample label="invalide avec focus">
                <Select id="select-harness-invalid-focus" invalid defaultValue="err">
                    <option value="err">Erreur avec focus</option>
                </Select>
            </Sample>
            <Sample label="désactivé">
                <Select disabled defaultValue="dis">
                    <option value="dis">Sélecteur désactivé</option>
                </Select>
            </Sample>
            <Sample label="avec option desactivee">
                <Select defaultValue="1">
                    <option value="1">Option active</option>
                    <option value="2" disabled>
                        Option indisponible (désactivée)
                    </option>
                    <option value="3">Autre option</option>
                </Select>
            </Sample>
            <Sample label="avec label et texte d'aide">
                <Select
                    label="Pays de résidence"
                    hint="Sélectionnez votre pays pour adapter la devise."
                    defaultValue="fr"
                >
                    <option value="fr">France</option>
                    <option value="be">Belgique</option>
                    <option value="ch">Suisse</option>
                    <option value="ca">Canada</option>
                </Select>
            </Sample>
            <Sample label="avec message d'erreur et invalide">
                <Select
                    label="Devise"
                    error="Cette devise n'est pas acceptée pour votre région."
                    defaultValue="usd"
                >
                    <option value="usd">USD — Dollar américain</option>
                    <option value="eur">EUR — Euro</option>
                </Select>
            </Sample>
            <Sample label="invalide (se valide à la sélection)">
                <InvalidSelectSample />
            </Sample>
            <Sample label="mode multiple">
                <Select multiple defaultValue={['1', '2']}>
                    <option value="1">Option 1 — France</option>
                    <option value="2">Option 2 — Belgique</option>
                    <option value="3">Option 3 — Suisse</option>
                    <option value="4">Option 4 — Canada</option>
                </Select>
            </Sample>
        </>
    )
}

function InvalidCheckboxSample() {
    const [accepted, setAccepted] = useState(false)
    return (
        <Checkbox
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            invalid={!accepted}
            label="Consentement obligatoire (cliquez pour valider)"
            error={!accepted ? 'Vous devez accepter pour continuer.' : undefined}
        />
    )
}

function CheckboxHarness() {
    return (
        <>
            <Sample label="taille sm">
                <Checkbox size="sm" label="Option sm (boîte 16px, texte 12px)" />
            </Sample>
            <Sample label="taille md (défaut)">
                <Checkbox size="md" label="Option md (boîte 16px, texte 14px)" />
            </Sample>
            <Sample label="taille lg">
                <Checkbox size="lg" label="Option lg (boîte 20px, texte 14px)" />
            </Sample>
            <Sample label="coché neutre (défaut)">
                <Checkbox defaultChecked label="Accepter les conditions d'utilisation" />
            </Sample>
            <Sample label="indéterminé neutre (défaut)">
                <Checkbox indeterminate label="3 sur 8 éléments sélectionnés" />
            </Sample>
            <Sample label="ton neutre (défaut)">
                <Checkbox tone="neutral" defaultChecked label="Ton neutre (noir/blanc)" />
            </Sample>
            <Sample label="ton accent (marque)">
                <Checkbox tone="accent" defaultChecked label="Ton accent (marque)" />
            </Sample>
            <Sample label="ton danger">
                <Checkbox tone="danger" defaultChecked label="Supprimer définitivement" />
            </Sample>
            <Sample label="invalide (se valide au clic)">
                <InvalidCheckboxSample />
            </Sample>
            <Sample label="avec description d'aide (hint)">
                <Checkbox
                    label="Recevoir les notifications"
                    hint="Un récapitulatif hebdomadaire vous sera envoyé par e-mail."
                    defaultChecked
                />
            </Sample>
            <Sample label="désactivé non coché">
                <Checkbox disabled label="Option indisponible" />
            </Sample>
            <Sample label="désactivé coché neutre">
                <Checkbox disabled defaultChecked label="Option requise par l'organisation" />
            </Sample>
            <Sample label="désactivé indéterminé neutre">
                <Checkbox disabled indeterminate label="Sélection partielle verrouillée" />
            </Sample>
            <Sample label="sans libellé (aria-label)">
                <Checkbox aria-label="Sélectionner la ligne" />
            </Sample>
        </>
    )
}

function InvalidSwitchSample() {
    const [enabled, setEnabled] = useState(false)
    return (
        <Switch
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            invalid={!enabled}
            label="Confirmation de sécurité (activez pour valider)"
            error={!enabled ? 'Activation obligatoire pour poursuivre.' : undefined}
        />
    )
}

function SwitchHarness() {
    return (
        <>
            <Sample label="taille sm (piste 36x20px, pouce 16px)">
                <Switch size="sm" label="Option sm" />
            </Sample>
            <Sample label="taille md (défaut, piste 44x24px, pouce 20px)">
                <Switch size="md" label="Option md" />
            </Sample>
            <Sample label="taille lg (piste 52x28px, pouce 24px)">
                <Switch size="lg" label="Option lg" />
            </Sample>
            <Sample label="activé neutre (défaut)">
                <Switch defaultChecked label="Activer les alertes" />
            </Sample>
            <Sample label="ton neutre (défaut)">
                <Switch tone="neutral" defaultChecked label="Ton neutre (noir/blanc)" />
            </Sample>
            <Sample label="ton accent (marque)">
                <Switch tone="accent" defaultChecked label="Ton accent (marque)" />
            </Sample>
            <Sample label="ton danger">
                <Switch tone="danger" defaultChecked label="Protection contre suppression" />
            </Sample>
            <Sample label="invalide (se valide au clic)">
                <InvalidSwitchSample />
            </Sample>
            <Sample label="avec description d'aide (hint)">
                <Switch
                    label="Mode sombre automatique"
                    hint="Bascule automatiquement selon les préférences du système."
                    defaultChecked
                />
            </Sample>
            <Sample label="désactivé non activé">
                <Switch disabled label="Fonctionnalité désactivée" />
            </Sample>
            <Sample label="désactivé activé neutre">
                <Switch disabled defaultChecked label="Paramètre imposé par l'organisation" />
            </Sample>
            <Sample label="sans libellé (aria-label)">
                <Switch aria-label="Basculer l'option" />
            </Sample>
        </>
    )
}

function InvalidRadioGroupSample({
    items,
}: {
    items: { value: string; label: string }[]
}) {
    const [val, setVal] = useState('')
    const isInvalid = !val
    return (
        <RadioGroup
            value={val}
            onChange={setVal}
            invalid={isInvalid}
            label="Préférence de communication (cliquez pour valider)"
            error={isInvalid ? 'Veuillez sélectionner un canal de communication.' : undefined}
            items={items}
        />
    )
}

function RadioGroupHarness() {
    const defaultItems = [
        { value: 'email', label: 'Email uniquement' },
        { value: 'push', label: 'Notifications push' },
        { value: 'all', label: 'Toutes les notifications' },
    ]

    const describedItems = [
        {
            value: 'standard',
            label: 'Livraison standard',
            description: 'Sous 3 à 5 jours ouvrés.',
        },
        {
            value: 'express',
            label: 'Livraison express',
            description: 'Livré le lendemain avant 13h.',
        },
    ]

    const disabledItems = [
        { value: 'opt1', label: 'Option disponible' },
        { value: 'opt2', label: 'Option désactivée', disabled: true },
        { value: 'opt3', label: 'Autre option' },
    ]

    return (
        <>
            <Sample label="taille sm (cercle 16px, texte 12px)">
                <RadioGroup size="sm" defaultValue="email" items={defaultItems} />
            </Sample>
            <Sample label="taille md (défaut, cercle 16px, texte 14px)">
                <RadioGroup size="md" defaultValue="email" items={defaultItems} />
            </Sample>
            <Sample label="taille lg (cercle 20px, texte 14px)">
                <RadioGroup size="lg" defaultValue="email" items={defaultItems} />
            </Sample>
            <Sample label="ton neutre (défaut, noir/blanc)">
                <RadioGroup tone="neutral" defaultValue="push" items={defaultItems} />
            </Sample>
            <Sample label="ton accent (marque)">
                <RadioGroup tone="accent" defaultValue="push" items={defaultItems} />
            </Sample>
            <Sample label="ton danger">
                <RadioGroup tone="danger" defaultValue="push" items={defaultItems} />
            </Sample>
            <Sample label="avec description d'aide sur les options">
                <RadioGroup defaultValue="standard" items={describedItems} />
            </Sample>
            <Sample label="invalide (avec erreur de champ)">
                <RadioGroup
                    defaultValue=""
                    items={defaultItems}
                    invalid
                    label="Préférence de communication"
                    error="Veuillez sélectionner un canal de communication."
                />
            </Sample>
            <Sample label="invalide (se valide au clic)">
                <InvalidRadioGroupSample items={defaultItems} />
            </Sample>
            <Sample label="groupe désactivé (rond et contour visibles)">
                <RadioGroup disabled defaultValue="email" items={defaultItems} />
            </Sample>
            <Sample label="option individuelle désactivée">
                <RadioGroup defaultValue="opt1" items={disabledItems} />
            </Sample>
        </>
    )
}

function InvalidSliderSample() {
    const [val, setVal] = useState(95)
    const isInvalid = val > 80
    return (
        <Slider
            value={val}
            onValueChange={setVal}
            invalid={isInvalid}
            label="Seuil d'alerte (glissez sous 80 pour valider)"
            error={isInvalid ? `Valeur excessive (${val}) : doit être <= 80.` : undefined}
        />
    )
}

function SliderHarness() {
    return (
        <>
            <Sample label="taille sm (zone 20px, pouce 14px)">
                <Slider size="sm" defaultValue={30} label="Luminosité sm" />
            </Sample>
            <Sample label="taille md (défaut, zone 24px, pouce 16px)">
                <Slider size="md" defaultValue={50} label="Volume principal" />
            </Sample>
            <Sample label="taille lg (zone 24px, pouce 20px, piste 6px)">
                <Slider size="lg" defaultValue={75} label="Zoom lg" />
            </Sample>
            <Sample label="ton neutre (défaut, noir/blanc)">
                <Slider tone="neutral" defaultValue={50} label="Contraste neutre" />
            </Sample>
            <Sample label="ton accent (marque)">
                <Slider tone="accent" defaultValue={65} label="Progression accent" />
            </Sample>
            <Sample label="ton danger">
                <Slider tone="danger" defaultValue={85} label="Niveau critique" />
            </Sample>
            <Sample label="invalide (avec message d'erreur)">
                <Slider
                    invalid
                    defaultValue={95}
                    label="Seuil d'alerte"
                    error="La valeur dépasse le seuil autorisé (90)."
                />
            </Sample>
            <Sample label="invalide (se valide sous 80)">
                <InvalidSliderSample />
            </Sample>
            <Sample label="désactivé (pouce et piste gris visibles)">
                <Slider disabled defaultValue={40} label="Paramètre verrouillé" />
            </Sample>
            <Sample label="sans affichage de valeur (showValue=false)">
                <Slider showValue={false} defaultValue={60} label="Sensibilité" />
            </Sample>
            <Sample label="mode intervalle (double curseur)">
                <Slider range defaultValue={[20, 80]} label="Fourchette de prix (€)" />
            </Sample>
        </>
    )
}

function InvalidNumberInputSample() {
    const [val, setVal] = useState(-2)
    const isInvalid = val < 0
    return (
        <NumberInput
            value={val}
            onValueChange={(n) => setVal(n ?? 0)}
            invalid={isInvalid}
            label="Nombre d'invités (utilisez + ou saisissez >= 0 pour valider)"
            error={isInvalid ? "Le nombre d'invités doit être positif ou nul." : undefined}
        />
    )
}

function NumberInputHarness() {
    return (
        <>
            <Sample label="taille sm (hauteur 28px, boutons intégrés)">
                <NumberInput size="sm" defaultValue={42} label="Quantité sm" />
            </Sample>
            <Sample label="taille md (défaut, hauteur 32px)">
                <NumberInput size="md" defaultValue={100} label="Quantité md" />
            </Sample>
            <Sample label="taille lg (hauteur 40px)">
                <NumberInput size="lg" defaultValue={250} label="Quantité lg" />
            </Sample>
            <Sample label="ton neutre (défaut ADR-020)">
                <NumberInput tone="neutral" defaultValue={5} label="Ton neutre" />
            </Sample>
            <Sample label="ton accent (marque)">
                <NumberInput tone="accent" defaultValue={10} label="Ton accent" />
            </Sample>
            <Sample label="ton danger">
                <NumberInput tone="danger" defaultValue={99} label="Ton danger" />
            </Sample>
            <Sample label="bornes min=0 max=10 (bouton + désactivé au max)">
                <NumberInput
                    min={0}
                    max={10}
                    defaultValue={10}
                    label="Stock disponible (max 10)"
                    hint="Le bouton + est désactivé lorsque la borne max est atteinte."
                />
            </Sample>
            <Sample label="invalide (avec message d'erreur)">
                <NumberInput
                    invalid
                    defaultValue={-1}
                    label="Nombre d'invités"
                    error="Le nombre d'invités doit être positif."
                />
            </Sample>
            <Sample label="invalide (se valide dès >= 0)">
                <InvalidNumberInputSample />
            </Sample>
            <Sample label="désactivé (boutons et texte estompés)">
                <NumberInput disabled defaultValue={12} label="Paramètre système (verrouillé)" />
            </Sample>
            <Sample label="lecture seule (boutons inactifs)">
                <NumberInput readOnly defaultValue={88} label="Valeur de référence" />
            </Sample>
        </>
    )
}

function InvalidDatePickerSample() {
    const [date, setDate] = useState<Date | null>(new Date(2020, 0, 1))
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const isInvalid = !date || date < today
    return (
        <DatePicker
            value={date}
            onChange={setDate}
            invalid={isInvalid}
            label="Date de départ (choisissez une date future pour valider)"
            error={isInvalid ? "La date doit être aujourd'hui ou dans le futur." : undefined}
        />
    )
}

function DatePickerHarness() {
    return (
        <>
            <Sample label="taille sm (hauteur 28px)">
                <DatePicker size="sm" defaultValue={new Date(2025, 5, 15)} label="Date sm" />
            </Sample>
            <Sample label="taille md (défaut, hauteur 32px)">
                <DatePicker
                    size="md"
                    defaultValue={new Date(2025, 5, 15)}
                    label="Date de réservation"
                />
            </Sample>
            <Sample label="taille lg (hauteur 40px)">
                <DatePicker size="lg" defaultValue={new Date(2025, 5, 15)} label="Date lg" />
            </Sample>
            <Sample label="ton neutre (défaut ADR-020)">
                <DatePicker
                    tone="neutral"
                    defaultValue={new Date(2025, 5, 15)}
                    label="Ton neutre"
                />
            </Sample>
            <Sample label="ton accent (marque)">
                <DatePicker tone="accent" defaultValue={new Date(2025, 5, 15)} label="Ton accent" />
            </Sample>
            <Sample label="ton danger">
                <DatePicker tone="danger" defaultValue={new Date(2025, 5, 15)} label="Ton danger" />
            </Sample>
            <Sample label="avec placeholder (champ vide)">
                <DatePicker placeholder="Sélectionner une date..." label="Événement" />
            </Sample>
            <Sample label="invalide (avec message d'erreur)">
                <DatePicker
                    invalid
                    defaultValue={new Date(2024, 0, 1)}
                    label="Date de départ"
                    error="La date doit être postérieure à aujourd'hui."
                />
            </Sample>
            <Sample label="invalide (se valide sur date future)">
                <InvalidDatePickerSample />
            </Sample>
            <Sample label="pleine largeur (fullWidth)">
                <DatePicker fullWidth defaultValue={new Date(2025, 5, 15)} label="Pleine largeur" />
            </Sample>
            <Sample label="désactivé">
                <DatePicker
                    disabled
                    defaultValue={new Date(2025, 5, 15)}
                    label="Date verrouillée"
                />
            </Sample>
        </>
    )
}

function InteractiveCalendarSample() {
    const [val, setVal] = useState<Date | null>(new Date(2025, 5, 15))
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Calendar value={val} onChange={setVal} />
            <span style={{ fontSize: '13px', color: 'var(--mr-text-secondary)' }}>
                Sélection : {val ? val.toLocaleDateString('fr-FR') : 'aucune'}
            </span>
        </div>
    )
}

function CalendarHarness() {
    return (
        <>
            <Sample label="défaut (juin 2025, jour 15 sélectionné)">
                <Calendar defaultValue={new Date(2025, 5, 15)} />
            </Sample>
            <Sample label="ton accent (marque)">
                <Calendar defaultValue={new Date(2025, 5, 15)} data-tone="accent" />
            </Sample>
            <Sample label="interactif (sélectionnez un jour)">
                <InteractiveCalendarSample />
            </Sample>
            <Sample label="bornes min et max (10 au 20 juin 2025)">
                <Calendar
                    minDate={new Date(2025, 5, 10)}
                    maxDate={new Date(2025, 5, 20)}
                    defaultValue={new Date(2025, 5, 15)}
                />
            </Sample>
            <Sample label="weekends désactivés">
                <Calendar
                    defaultValue={new Date(2025, 5, 15)}
                    disabledDates={(d) => d.getDay() === 0 || d.getDay() === 6}
                />
            </Sample>
            <Sample label="semaines fixes (fixedWeeks, 6 semaines)">
                <Calendar defaultValue={new Date(2025, 5, 15)} fixedWeeks />
            </Sample>
            <Sample label="masquer jours hors mois (showOutsideDays=false)">
                <Calendar defaultValue={new Date(2025, 5, 15)} showOutsideDays={false} />
            </Sample>
            <Sample label="deux mois consécutifs (numberOfMonths=2)">
                <Calendar defaultValue={new Date(2025, 5, 15)} numberOfMonths={2} />
            </Sample>
        </>
    )
}

function InvalidComboboxSample({ items }: { items: ComboboxItem[] }) {
    const [val, setVal] = useState('')
    const isInvalid = !val
    return (
        <Combobox
            value={val}
            onChange={setVal}
            invalid={isInvalid}
            label="Pays requis (sélectionnez pour valider)"
            error={isInvalid ? 'Veuillez sélectionner un pays dans la liste.' : undefined}
            items={items}
        />
    )
}

function ComboboxHarness() {
    const countries: ComboboxItem[] = [
        { value: 'fr', label: 'France', description: "Europe de l'Ouest" },
        { value: 'de', label: 'Allemagne', description: 'Europe centrale' },
        { value: 'es', label: 'Espagne', description: 'Péninsule Ibérique' },
        { value: 'it', label: 'Italie', description: 'Europe du Sud' },
        { value: 'jp', label: 'Japon', description: "Asie de l'Est" },
        { value: 'ca', label: 'Canada', description: 'Amérique du Nord' },
    ]

    return (
        <>
            <Sample label="taille sm (hauteur 28px)">
                <Combobox size="sm" defaultValue="fr" label="Pays sm" items={countries} />
            </Sample>
            <Sample label="taille md (défaut, hauteur 32px)">
                <Combobox size="md" defaultValue="fr" label="Pays de résidence" items={countries} />
            </Sample>
            <Sample label="taille lg (hauteur 40px)">
                <Combobox size="lg" defaultValue="fr" label="Pays lg" items={countries} />
            </Sample>
            <Sample label="ton neutre (défaut ADR-020)">
                <Combobox tone="neutral" defaultValue="fr" label="Ton neutre" items={countries} />
            </Sample>
            <Sample label="ton accent (marque)">
                <Combobox tone="accent" defaultValue="fr" label="Ton accent" items={countries} />
            </Sample>
            <Sample label="ton danger">
                <Combobox tone="danger" defaultValue="fr" label="Ton danger" items={countries} />
            </Sample>
            <Sample label="avec placeholder (champ vide)">
                <Combobox
                    placeholder="Rechercher un pays..."
                    label="Destination"
                    items={countries}
                />
            </Sample>
            <Sample label="invalide (avec message d'erreur)">
                <Combobox
                    invalid
                    defaultValue=""
                    label="Pays obligatoire"
                    error="Ce champ est requis."
                    items={countries}
                />
            </Sample>
            <Sample label="invalide (se valide à la sélection)">
                <InvalidComboboxSample items={countries} />
            </Sample>
            <Sample label="désactivé">
                <Combobox disabled defaultValue="fr" label="Pays verrouillé" items={countries} />
            </Sample>
        </>
    )
}

function DateRangePickerHarness() {
    return (
        <>
            <Sample label="taille sm (hauteur 28px)">
                <DateRangePicker
                    size="sm"
                    fromLabel="Début"
                    toLabel="Fin"
                    fromProps={{ defaultValue: new Date(2025, 5, 1) }}
                    toProps={{ defaultValue: new Date(2025, 5, 15) }}
                />
            </Sample>
            <Sample label="taille md (défaut, hauteur 32px)">
                <DateRangePicker
                    size="md"
                    fromLabel="Date d'arrivée"
                    toLabel="Date de départ"
                    fromProps={{ defaultValue: new Date(2025, 5, 1) }}
                    toProps={{ defaultValue: new Date(2025, 5, 15) }}
                />
            </Sample>
            <Sample label="taille lg (hauteur 40px)">
                <DateRangePicker
                    size="lg"
                    fromLabel="Période du"
                    toLabel="Au"
                    fromProps={{ defaultValue: new Date(2025, 5, 1) }}
                    toProps={{ defaultValue: new Date(2025, 5, 15) }}
                />
            </Sample>
            <Sample label="sans étiquette (champs nus avec flèche)">
                <DateRangePicker
                    fromLabel=""
                    toLabel=""
                    fromProps={{ defaultValue: new Date(2025, 5, 1) }}
                    toProps={{ defaultValue: new Date(2025, 5, 15) }}
                />
            </Sample>
            <Sample label="avec texte d'aide (hint)">
                <DateRangePicker
                    fromLabel="Début de mission"
                    toLabel="Fin de mission"
                    hint="Sélectionnez une période continue."
                    fromProps={{ defaultValue: new Date(2025, 5, 1) }}
                    toProps={{ defaultValue: new Date(2025, 5, 15) }}
                />
            </Sample>
            <Sample label="désactivé">
                <DateRangePicker
                    disabled
                    fromLabel="Période verrouillée"
                    toLabel="Fin"
                    fromProps={{ defaultValue: new Date(2025, 5, 1) }}
                    toProps={{ defaultValue: new Date(2025, 5, 15) }}
                />
            </Sample>
        </>
    )
}

function FileUploadHarness() {
    const dummyFiles = [
        new File(['rapport content'], 'rapport-annuel-2025.pdf', { type: 'application/pdf' }),
        new File(['image content'], 'capture-ecran-dashboard.png', { type: 'image/png' }),
    ]

    return (
        <>
            <Sample label="taille sm (zone compacte)">
                <FileUpload
                    size="sm"
                    label="Justificatif de domicile (sm)"
                    description="Glissez votre document ou cliquez pour parcourir"
                />
            </Sample>
            <Sample label="taille md (défaut)">
                <FileUpload
                    size="md"
                    label="Pièce d'identité"
                    description="Formats acceptés : PDF, JPG, PNG jusqu'à 10 Mo"
                />
            </Sample>
            <Sample label="taille lg (zone large)">
                <FileUpload
                    size="lg"
                    label="Documents de candidature (lg)"
                    description="Glissez vos CV, lettres de motivation et portfolios"
                    multiple
                />
            </Sample>
            <Sample label="avec fichiers sélectionnés (liste et suppression)">
                <FileUpload
                    label="Pièces jointes"
                    files={dummyFiles}
                    description="Fichiers prêts pour l'envoi"
                />
            </Sample>
            <Sample label="invalide (erreur de validation)">
                <FileUpload
                    invalid
                    label="Document requis"
                    error="Veuillez téléverser un fichier valide."
                />
            </Sample>
            <Sample label="désactivé">
                <FileUpload
                    disabled
                    label="Zone verrouillée"
                    description="Le téléversement est temporairement suspendu"
                />
            </Sample>
        </>
    )
}

function FormSectionHarness() {
    return (
        <>
            <Sample label="section standard (titre, description et champs)">
                <FormSection
                    title="Informations personnelles"
                    description="Renseignez vos coordonnées de contact pour les notifications."
                    meta="Étape 1 sur 3"
                    actions={
                        <Button variant="secondary" size="sm">
                            Enregistrer le brouillon
                        </Button>
                    }
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Input label="Nom complet" defaultValue="Alexandre Martin" />
                        <Input
                            label="Adresse email"
                            type="email"
                            defaultValue="alexandre@example.com"
                        />
                    </div>
                </FormSection>
            </Sample>
            <Sample label="section simple (titre seul)">
                <FormSection title="Paramètres de sécurité">
                    <Switch label="Authentification à deux facteurs" defaultChecked />
                </FormSection>
            </Sample>
            <Sample label="section avec actions de pied de page">
                <FormSection
                    title="Préférences régionales"
                    description="Choisissez votre langue et votre fuseau horaire."
                    actions={
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button variant="ghost" size="sm">
                                Annuler
                            </Button>
                            <Button variant="primary" size="sm">
                                Appliquer
                            </Button>
                        </div>
                    }
                >
                    <Select label="Langue" defaultValue="fr">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                    </Select>
                </FormSection>
            </Sample>
        </>
    )
}

function ToggleHarness() {
    return (
        <>
            <Sample label="taille sm (repos et pressé)">
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Toggle size="sm">Basculer</Toggle>
                    <Toggle size="sm" defaultPressed>
                        Actif
                    </Toggle>
                </div>
            </Sample>
            <Sample label="taille md (défaut, repos et pressé)">
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Toggle size="md">Basculer</Toggle>
                    <Toggle size="md" defaultPressed>
                        Actif
                    </Toggle>
                </div>
            </Sample>
            <Sample label="taille lg (repos et pressé)">
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Toggle size="lg">Basculer</Toggle>
                    <Toggle size="lg" defaultPressed>
                        Actif
                    </Toggle>
                </div>
            </Sample>
            <Sample label="variantes outline et ghost">
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Toggle variant="outline">Outline</Toggle>
                    <Toggle variant="outline" defaultPressed>
                        Outline actif
                    </Toggle>
                    <Toggle variant="ghost">Ghost</Toggle>
                    <Toggle variant="ghost" defaultPressed>
                        Ghost actif
                    </Toggle>
                </div>
            </Sample>
            <Sample label="ton accent (rail de couleur de marque)">
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Toggle tone="accent" defaultPressed>
                        Accent actif
                    </Toggle>
                    <Toggle tone="accent" variant="outline" defaultPressed>
                        Outline accent
                    </Toggle>
                </div>
            </Sample>
            <Sample label="états désactivés">
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Toggle disabled>Inactif désactivé</Toggle>
                    <Toggle disabled defaultPressed>
                        Actif désactivé
                    </Toggle>
                </div>
            </Sample>
        </>
    )
}

function ToggleGroupHarness() {
    return (
        <>
            <Sample label="mode single par prop items">
                <ToggleGroup
                    type="single"
                    defaultValue="center"
                    items={[
                        { value: 'left', label: 'Gauche' },
                        { value: 'center', label: 'Centre' },
                        { value: 'right', label: 'Droite' },
                    ]}
                />
            </Sample>
            <Sample label="mode multiple par prop items">
                <ToggleGroup
                    type="multiple"
                    defaultValue={['bold', 'italic']}
                    items={[
                        { value: 'bold', label: 'Gras' },
                        { value: 'italic', label: 'Italique' },
                        { value: 'underline', label: 'Souligné' },
                    ]}
                />
            </Sample>
            <Sample label="mode composé déclaratif avec ToggleGroup.Item">
                <ToggleGroup type="single" defaultValue="list">
                    <ToggleGroup.Item value="grid">Grille</ToggleGroup.Item>
                    <ToggleGroup.Item value="list">Liste</ToggleGroup.Item>
                    <ToggleGroup.Item value="table">Tableau</ToggleGroup.Item>
                </ToggleGroup>
            </Sample>
            <Sample label="tailles sm, md, lg">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <ToggleGroup
                        size="sm"
                        defaultValue="1"
                        items={[
                            { value: '1', label: 'Jour' },
                            { value: '2', label: 'Semaine' },
                            { value: '3', label: 'Mois' },
                        ]}
                    />
                    <ToggleGroup
                        size="md"
                        defaultValue="1"
                        items={[
                            { value: '1', label: 'Jour' },
                            { value: '2', label: 'Semaine' },
                            { value: '3', label: 'Mois' },
                        ]}
                    />
                    <ToggleGroup
                        size="lg"
                        defaultValue="1"
                        items={[
                            { value: '1', label: 'Jour' },
                            { value: '2', label: 'Semaine' },
                            { value: '3', label: 'Mois' },
                        ]}
                    />
                </div>
            </Sample>
            <Sample label="orientation verticale">
                <ToggleGroup
                    orientation="vertical"
                    defaultValue="top"
                    items={[
                        { value: 'top', label: 'Haut' },
                        { value: 'middle', label: 'Milieu' },
                        { value: 'bottom', label: 'Bas' },
                    ]}
                />
            </Sample>
            <Sample label="ton accent avec rail coloré">
                <ToggleGroup
                    tone="accent"
                    defaultValue="active"
                    items={[
                        { value: 'all', label: 'Tous' },
                        { value: 'active', label: 'Actifs' },
                        { value: 'completed', label: 'Terminés' },
                    ]}
                />
            </Sample>
            <Sample label="groupe désactivé et item individuel désactivé">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <ToggleGroup
                        disabled
                        defaultValue="1"
                        items={[
                            { value: '1', label: 'Option A' },
                            { value: '2', label: 'Option B' },
                        ]}
                    />
                    <ToggleGroup
                        defaultValue="1"
                        items={[
                            { value: '1', label: 'Disponible' },
                            { value: '2', label: 'Verrouillé', disabled: true },
                            { value: '3', label: 'Disponible' },
                        ]}
                    />
                </div>
            </Sample>
        </>
    )
}

function BadgeHarness() {
    const tones = ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] as const
    const sizes = ['sm', 'md'] as const
    return (
        <>
            {tones.flatMap((tone) =>
                sizes.map((size) => (
                    <Sample key={`${tone}-${size}`} label={`${tone} ${size}`}>
                        <Badge tone={tone} size={size}>
                            Badge {tone}
                        </Badge>
                    </Sample>
                ))
            )}
            <Sample label="avec point (prop dot)">
                <Badge tone="accent" dot>
                    Actif
                </Badge>
            </Sample>
            <Sample label="mode composé avec Badge.Dot">
                <Badge tone="success">
                    <Badge.Dot />
                    En ligne
                </Badge>
            </Sample>
            <Sample label="points de statut">
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Badge tone="success" dot>
                        Opérationnel
                    </Badge>
                    <Badge tone="warning" dot>
                        Dégradé
                    </Badge>
                    <Badge tone="danger" dot>
                        Panne
                    </Badge>
                    <Badge tone="info" dot>
                        Maintenance
                    </Badge>
                </div>
            </Sample>
        </>
    )
}

function BannerHarness() {
    const tones = ['neutral', 'accent', 'info', 'success', 'warning', 'danger'] as const
    return (
        <>
            {tones.map((tone) => (
                <Sample key={tone} label={`ton ${tone}`}>
                    <Banner
                        tone={tone}
                        title={`Annonce ${tone}`}
                        description="Ceci est une bannière informative pleine largeur."
                    />
                </Sample>
            ))}
            <Sample label="avec eyebrow et actions">
                <Banner
                    tone="accent"
                    eyebrow="Nouveauté"
                    title="Version 2.0 disponible"
                    description="Découvrez les nouvelles fonctionnalités du système."
                    actions={<Button size="sm">Découvrir</Button>}
                />
            </Sample>
            <Sample label="fermable (dismissible)">
                <Banner
                    tone="info"
                    title="Mise à jour planifiée"
                    description="Une maintenance aura lieu cette nuit à 02:00 UTC."
                    dismissible
                />
            </Sample>
            <Sample label="mode composé déclaratif">
                <Banner tone="warning">
                    <Banner.Eyebrow>Avertissement</Banner.Eyebrow>
                    <Banner.Title>Quota bientôt atteint</Banner.Title>
                    <Banner.Description>
                        Vous utilisez 85% de votre capacité allouée.
                    </Banner.Description>
                    <Banner.Actions>
                        <Button size="sm" variant="secondary">
                            Augmenter le quota
                        </Button>
                    </Banner.Actions>
                    <Banner.Close />
                </Banner>
            </Sample>
        </>
    )
}

function CalloutHarness() {
    const tones = ['neutral', 'accent', 'info', 'success', 'warning', 'danger'] as const
    const sizes = ['sm', 'md'] as const
    return (
        <>
            {tones.flatMap((tone) =>
                sizes.map((size) => (
                    <Sample key={`${tone}-${size}`} label={`${tone} ${size}`}>
                        <Callout
                            tone={tone}
                            size={size}
                            title={`Remarque ${tone} (${size})`}
                            description="Une information contextuelle importante à retenir."
                        />
                    </Sample>
                ))
            )}
            <Sample label="mode composé déclaratif">
                <Callout tone="accent">
                    <Callout.Title>Astuce de productivité</Callout.Title>
                    <Callout.Content>
                        <Callout.Description>
                            Utilisez le raccourci Cmd+K pour ouvrir la palette de commandes.
                        </Callout.Description>
                    </Callout.Content>
                </Callout>
            </Sample>
            <Sample label="sans titre avec contenu direct">
                <Callout tone="info">
                    Ce bloc informatif ne possède pas de titre séparé mais transmet son message
                    clairement.
                </Callout>
            </Sample>
        </>
    )
}

function InlineAlertHarness() {
    const tones = ['info', 'success', 'warning', 'danger'] as const
    return (
        <>
            {tones.map((tone) => (
                <Sample key={tone} label={`ton ${tone}`}>
                    <InlineAlert
                        tone={tone}
                        title={`Alerte ${tone}`}
                        description="Message d'alerte en ligne au sein du flux de saisie."
                    />
                </Sample>
            ))}
            <Sample label="avec actionLabel">
                <InlineAlert
                    tone="danger"
                    title="Échec de synchronisation"
                    description="Impossible de contacter le serveur distant."
                    actionLabel="Réessayer"
                    onAction={() => {}}
                />
            </Sample>
            <Sample label="mode composé déclaratif">
                <InlineAlert tone="warning">
                    <InlineAlert.Title>Session expirée</InlineAlert.Title>
                    <InlineAlert.Description>
                        Votre session arrive à échéance dans 2 minutes.
                    </InlineAlert.Description>
                    <InlineAlert.Action>
                        <Button size="sm" variant="secondary">
                            Prolonger
                        </Button>
                    </InlineAlert.Action>
                </InlineAlert>
            </Sample>
        </>
    )
}

function EmptyStateHarness() {
    return (
        <>
            <Sample label="état par défaut (empty)">
                <EmptyState
                    title="Aucun document trouvé"
                    description="Vous n'avez pas encore téléversé de fichier dans ce dossier."
                    action={<Button size="sm">Ajouter un fichier</Button>}
                />
            </Sample>
            <Sample label="état loading">
                <EmptyState
                    state="loading"
                    title="Chargement des données"
                    description="Veuillez patienter pendant la récupération des éléments..."
                />
            </Sample>
            <Sample label="état error">
                <EmptyState
                    state="error"
                    title="Erreur de chargement"
                    description="Une erreur inattendue est survenue lors de l'accès aux données."
                    action={
                        <Button size="sm" variant="secondary">
                            Réessayer
                        </Button>
                    }
                />
            </Sample>
            <Sample label="mode composé déclaratif">
                <EmptyState>
                    <EmptyState.Icon>📁</EmptyState.Icon>
                    <EmptyState.Title>Dossier vide</EmptyState.Title>
                    <EmptyState.Description>
                        Créez un premier sous-dossier ou glissez des fichiers ici.
                    </EmptyState.Description>
                    <EmptyState.Actions>
                        <Button size="sm">Créer un dossier</Button>
                        <Button size="sm" variant="secondary">
                            Importer
                        </Button>
                    </EmptyState.Actions>
                </EmptyState>
            </Sample>
        </>
    )
}

function AsyncStateNoticeHarness() {
    return (
        <>
            <Sample label="état loading">
                <AsyncStateNotice isLoading loadingMessage="Synchronisation en arrière-plan..." />
            </Sample>
            <Sample label="état error">
                <AsyncStateNotice
                    isError
                    errorMessage="La requête a échoué avec le code 503 Service Unavailable."
                />
            </Sample>
            <Sample label="état loading avec contenu personnalisé">
                <AsyncStateNotice
                    isLoading
                    loadingContent={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Spinner size="sm" />
                            <span>Traitement du lot en cours...</span>
                        </div>
                    }
                />
            </Sample>
        </>
    )
}

function ProgressHarness() {
    const tones = ['accent', 'neutral', 'success', 'warning', 'danger', 'info'] as const
    return (
        <>
            {tones.map((tone) => (
                <Sample key={tone} label={`ton ${tone} (50%)`}>
                    <Progress value={50} tone={tone} label={`Progression ${tone}`} showValue />
                </Sample>
            ))}
            <Sample label="mode indéterminé">
                <Progress mode="indeterminate" label="Téléchargement en cours" />
            </Sample>
            <Sample label="mode composé déclaratif">
                <Progress value={75} tone="accent">
                    <Progress.Meta>
                        <Progress.Label>Traitement des lots</Progress.Label>
                        <Progress.Value>75%</Progress.Value>
                    </Progress.Meta>
                    <Progress.Track>
                        <Progress.Bar />
                    </Progress.Track>
                </Progress>
            </Sample>
            <Sample label="sans libellé visible">
                <Progress value={30} aria-label="Progression silencieuse" />
            </Sample>
        </>
    )
}

function SkeletonHarness() {
    return (
        <>
            <Sample label="texte standard (lignes multiples)">
                <Skeleton lines={3} />
            </Sample>
            <Sample label="bloc circulaire (avatar)">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Skeleton circle width="40px" height="40px" />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <Skeleton height="14px" width="60%" />
                        <Skeleton height="12px" width="40%" />
                    </div>
                </div>
            </Sample>
            <Sample label="bloc rectangulaire (carte)">
                <Skeleton height="120px" rounded />
            </Sample>
            <Sample label="mode composé avec Skeleton.Line">
                <Skeleton>
                    <Skeleton.Line style={{ height: '18px', width: '80%' }} />
                    <Skeleton.Line style={{ height: '14px', width: '100%' }} />
                    <Skeleton.Line style={{ height: '14px', width: '50%' }} />
                </Skeleton>
            </Sample>
        </>
    )
}

function ToastHarness() {
    const tones = ['neutral', 'accent', 'info', 'success', 'warning', 'danger'] as const
    return (
        <>
            {tones.map((tone) => (
                <Sample key={tone} label={`ton ${tone}`}>
                    <Toast
                        tone={tone}
                        title={`Notification ${tone}`}
                        description="Message de notification éphémère."
                        onClose={() => {}}
                    />
                </Sample>
            ))}
            <Sample label="mode composé déclaratif">
                <Toast tone="success">
                    <Toast.Title>Enregistrement effectué</Toast.Title>
                    <Toast.Description>
                        Toutes vos modifications ont été sauvegardées sur le cloud.
                    </Toast.Description>
                    <Toast.Close onClick={() => {}} />
                </Toast>
            </Sample>
            <Sample label="avec contenu additionnel">
                <Toast tone="accent" title="Fichier supprimé" onClose={() => {}}>
                    <p style={{ margin: '4px 0 0', fontSize: '13px' }}>
                        Le fichier a été déplacé dans la corbeille.
                    </p>
                </Toast>
            </Sample>
        </>
    )
}

const harnesses: Record<string, () => React.JSX.Element> = {
    // Actions
    button: ButtonHarness,
    'button-link': ButtonLinkHarness,
    'icon-button': IconButtonHarness,
    'copy-button': CopyButtonHarness,
    toggle: ToggleHarness,
    'toggle-group': ToggleGroupHarness,
    // Forms
    input: InputHarness,
    'password-input': PasswordInputHarness,
    textarea: TextareaHarness,
    select: SelectHarness,
    checkbox: CheckboxHarness,
    switch: SwitchHarness,
    'radio-group': RadioGroupHarness,
    slider: SliderHarness,
    'number-input': NumberInputHarness,
    'date-picker': DatePickerHarness,
    'date-range-picker': DateRangePickerHarness,
    calendar: CalendarHarness,
    combobox: ComboboxHarness,
    'file-upload': FileUploadHarness,
    'form-section': FormSectionHarness,
    field: FieldHarness,
    // Feedback
    spinner: SpinnerHarness,
    badge: BadgeHarness,
    banner: BannerHarness,
    callout: CalloutHarness,
    'inline-alert': InlineAlertHarness,
    'empty-state': EmptyStateHarness,
    'async-state-notice': AsyncStateNoticeHarness,
    progress: ProgressHarness,
    skeleton: SkeletonHarness,
    toast: ToastHarness,
    // Overlays
    modal: ModalHarness,
    'alert-dialog': AlertDialogHarness,
    drawer: DrawerHarness,
    tooltip: TooltipHarness,
    popover: PopoverHarness,
    'dropdown-menu': DropdownMenuHarness,
    'context-menu': ContextMenuHarness,
    'hover-card': HoverCardHarness,
    'command-palette': CommandPaletteHarness,
    // Navigation
    tabs: TabsHarness,
    breadcrumb: BreadcrumbHarness,
    pagination: PaginationHarness,
    topbar: TopbarHarness,
    'sidebar-layout': SidebarLayoutHarness,
    'filter-bar': FilterBarHarness,
    menubar: MenubarHarness,
    'navigation-menu': NavigationMenuHarness,
    // Data
    table: TableHarness,
    'data-table': DataTableHarness,
    'data-list': DataListHarness,
    'stat-card': StatCardHarness,
    'metric-grid': MetricGridHarness,
    // Display
    card: CardHarness,
    accordion: AccordionHarness,
    avatar: AvatarHarness,
    carousel: CarouselHarness,
    collapsible: CollapsibleHarness,
    // Layout
    'aspect-ratio': AspectRatioHarness,
    container: ContainerHarness,
    divider: DividerHarness,
    grid: GridHarness,
    'page-header': PageHeaderHarness,
    resizable: ResizableHarness,
    'scroll-area': ScrollAreaHarness,
    section: SectionHarness,
    separator: SeparatorHarness,
    stack: StackHarness,
    toolbar: ToolbarHarness,
    // Typography
    title: TitleHarness,
    text: TextHarness,
    kbd: KbdHarness,
    'pre-code': PreCodeHarness,
    // Experimental
    'infinite-scroll': InfiniteScrollHarness,
    __position: PositionHarness,
}

export type ComponentCategory =
    | 'Actions'
    | 'Forms'
    | 'Feedback'
    | 'Overlays'
    | 'Navigation'
    | 'Data'
    | 'Display'
    | 'Layout'
    | 'Typography'
    | 'Experimental'

const categories: readonly ComponentCategory[] = [
    'Actions',
    'Forms',
    'Feedback',
    'Overlays',
    'Navigation',
    'Data',
    'Display',
    'Layout',
    'Typography',
    'Experimental',
] as const

const establishedComponents: readonly {
    slug: string
    label: string
    category: ComponentCategory
}[] = [
    // Actions (6)
    { slug: 'button', label: 'Button', category: 'Actions' },
    { slug: 'button-link', label: 'ButtonLink', category: 'Actions' },
    { slug: 'icon-button', label: 'IconButton', category: 'Actions' },
    { slug: 'copy-button', label: 'CopyButton', category: 'Actions' },
    { slug: 'toggle', label: 'Toggle', category: 'Actions' },
    { slug: 'toggle-group', label: 'ToggleGroup', category: 'Actions' },
    // Forms (16)
    { slug: 'input', label: 'Input', category: 'Forms' },
    { slug: 'password-input', label: 'PasswordInput', category: 'Forms' },
    { slug: 'textarea', label: 'Textarea', category: 'Forms' },
    { slug: 'select', label: 'Select', category: 'Forms' },
    { slug: 'checkbox', label: 'Checkbox', category: 'Forms' },
    { slug: 'switch', label: 'Switch', category: 'Forms' },
    { slug: 'radio-group', label: 'RadioGroup', category: 'Forms' },
    { slug: 'slider', label: 'Slider', category: 'Forms' },
    { slug: 'number-input', label: 'NumberInput', category: 'Forms' },
    { slug: 'date-picker', label: 'DatePicker', category: 'Forms' },
    { slug: 'date-range-picker', label: 'DateRangePicker', category: 'Forms' },
    { slug: 'calendar', label: 'Calendar', category: 'Forms' },
    { slug: 'combobox', label: 'Combobox', category: 'Forms' },
    { slug: 'file-upload', label: 'FileUpload', category: 'Forms' },
    { slug: 'form-section', label: 'FormSection', category: 'Forms' },
    { slug: 'field', label: 'Field', category: 'Forms' },
    // Feedback (10)
    { slug: 'spinner', label: 'Spinner', category: 'Feedback' },
    { slug: 'badge', label: 'Badge', category: 'Feedback' },
    { slug: 'banner', label: 'Banner', category: 'Feedback' },
    { slug: 'callout', label: 'Callout', category: 'Feedback' },
    { slug: 'inline-alert', label: 'InlineAlert', category: 'Feedback' },
    { slug: 'empty-state', label: 'EmptyState', category: 'Feedback' },
    { slug: 'async-state-notice', label: 'AsyncStateNotice', category: 'Feedback' },
    { slug: 'progress', label: 'Progress', category: 'Feedback' },
    { slug: 'skeleton', label: 'Skeleton', category: 'Feedback' },
    { slug: 'toast', label: 'Toast', category: 'Feedback' },
    // Overlays (9)
    { slug: 'modal', label: 'Modal', category: 'Overlays' },
    { slug: 'alert-dialog', label: 'AlertDialog', category: 'Overlays' },
    { slug: 'drawer', label: 'Drawer', category: 'Overlays' },
    { slug: 'tooltip', label: 'Tooltip', category: 'Overlays' },
    { slug: 'popover', label: 'Popover', category: 'Overlays' },
    { slug: 'dropdown-menu', label: 'DropdownMenu', category: 'Overlays' },
    { slug: 'context-menu', label: 'ContextMenu', category: 'Overlays' },
    { slug: 'hover-card', label: 'HoverCard', category: 'Overlays' },
    { slug: 'command-palette', label: 'CommandPalette', category: 'Overlays' },
    // Navigation (8)
    { slug: 'tabs', label: 'Tabs', category: 'Navigation' },
    { slug: 'breadcrumb', label: 'Breadcrumb', category: 'Navigation' },
    { slug: 'pagination', label: 'Pagination', category: 'Navigation' },
    { slug: 'topbar', label: 'Topbar', category: 'Navigation' },
    { slug: 'sidebar-layout', label: 'SidebarLayout', category: 'Navigation' },
    { slug: 'filter-bar', label: 'FilterBar', category: 'Navigation' },
    { slug: 'menubar', label: 'Menubar', category: 'Navigation' },
    { slug: 'navigation-menu', label: 'NavigationMenu', category: 'Navigation' },
    // Data (5)
    { slug: 'table', label: 'Table', category: 'Data' },
    { slug: 'data-table', label: 'DataTable', category: 'Data' },
    { slug: 'data-list', label: 'DataList', category: 'Data' },
    { slug: 'stat-card', label: 'StatCard', category: 'Data' },
    { slug: 'metric-grid', label: 'MetricGrid', category: 'Data' },
    // Display (5)
    { slug: 'card', label: 'Card', category: 'Display' },
    { slug: 'accordion', label: 'Accordion', category: 'Display' },
    { slug: 'avatar', label: 'Avatar', category: 'Display' },
    { slug: 'carousel', label: 'Carousel', category: 'Display' },
    { slug: 'collapsible', label: 'Collapsible', category: 'Display' },
    // Layout (11)
    { slug: 'aspect-ratio', label: 'AspectRatio', category: 'Layout' },
    { slug: 'container', label: 'Container', category: 'Layout' },
    { slug: 'divider', label: 'Divider', category: 'Layout' },
    { slug: 'grid', label: 'Grid', category: 'Layout' },
    { slug: 'page-header', label: 'PageHeader', category: 'Layout' },
    { slug: 'resizable', label: 'Resizable', category: 'Layout' },
    { slug: 'scroll-area', label: 'ScrollArea', category: 'Layout' },
    { slug: 'section', label: 'Section', category: 'Layout' },
    { slug: 'separator', label: 'Separator', category: 'Layout' },
    { slug: 'stack', label: 'Stack', category: 'Layout' },
    { slug: 'toolbar', label: 'Toolbar', category: 'Layout' },
    // Typography (4)
    { slug: 'title', label: 'Title', category: 'Typography' },
    { slug: 'text', label: 'Text', category: 'Typography' },
    { slug: 'kbd', label: 'Kbd', category: 'Typography' },
    { slug: 'pre-code', label: 'PreCode', category: 'Typography' },
    // Experimental (1)
    { slug: 'infinite-scroll', label: 'InfiniteScroll', category: 'Experimental' },
] as const

const otherComponents: readonly { slug: string; label: string }[] = []

export function HarnessPage() {
    const { component = 'button' } = useParams()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const theme = isAllowed(themes, searchParams.get('theme'))
        ? (searchParams.get('theme') as Theme)
        : 'light'
    const density = isAllowed(densities, searchParams.get('density'))
        ? (searchParams.get('density') as Density)
        : 'comfortable'
    const brand = isAllowed(brands, searchParams.get('brand'))
        ? (searchParams.get('brand') as Brand)
        : 'monority'
    const Harness = harnesses[component] ?? harnesses.button!

    const currentQuery = searchParams.toString() ? `?${searchParams.toString()}` : ''
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.dataset.theme = theme
            document.documentElement.dataset.themeChoice = theme
        }
    }, [theme])

    const filteredComponents = establishedComponents.filter(
        (c) => selectedCategory === 'all' || c.category === selectedCategory
    )

    if (component === '__position') {
        return (
            <main
                className="harness-page"
                data-testid="harness-page"
                data-harness-component={component}
                data-theme={theme}
            >
                <ThemeScope theme={theme} density={density}>
                    <PositionHarness />
                </ThemeScope>
            </main>
        )
    }

    return (
        <main
            className="harness-page"
            data-testid="harness-page"
            data-harness-component={component}
            data-theme={theme}
        >
            <nav className="harness-controls" data-testid="harness-controls">
                <div
                    className="harness-controls-group"
                    style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        gap: 'var(--mr-space-2)',
                    }}
                >
                    <div
                        style={{ display: 'flex', alignItems: 'center', gap: 'var(--mr-space-2)' }}
                    >
                        <span className="harness-controls-label">
                            Composants ({establishedComponents.length}) :
                        </span>
                        <select
                            className="harness-select"
                            value={component}
                            aria-label="Sélectionner un composant"
                            onChange={(e) => navigate(`/harness/${e.target.value}${currentQuery}`)}
                        >
                            {categories.map((cat) => (
                                <optgroup
                                    key={cat}
                                    label={`${cat} (${establishedComponents.filter((c) => c.category === cat).length})`}
                                >
                                    {establishedComponents
                                        .filter((c) => c.category === cat)
                                        .map((c) => (
                                            <option key={c.slug} value={c.slug}>
                                                {c.label}
                                            </option>
                                        ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        <button
                            type="button"
                            className="harness-controls-btn"
                            data-active={selectedCategory === 'all'}
                            onClick={() => setSelectedCategory('all')}
                        >
                            Tous
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className="harness-controls-btn"
                                data-active={selectedCategory === cat}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="harness-controls-group" data-testid="harness-components-nav">
                    {filteredComponents.map((c) => (
                        <Link
                            key={c.slug}
                            to={`/harness/${c.slug}${currentQuery}`}
                            className="harness-controls-btn"
                            data-active={component === c.slug}
                        >
                            {c.label}
                        </Link>
                    ))}
                    {otherComponents.map((c) => (
                        <Link
                            key={c.slug}
                            to={`/harness/${c.slug}${currentQuery}`}
                            className="harness-controls-btn harness-controls-btn--secondary"
                            data-active={component === c.slug}
                        >
                            {c.label}
                        </Link>
                    ))}
                </div>
                <div className="harness-controls-group">
                    <span className="harness-controls-label">Thème :</span>
                    {themes.map((t) => (
                        <button
                            key={t}
                            type="button"
                            className="harness-controls-btn"
                            data-active={theme === t}
                            onClick={() => {
                                const next = new URLSearchParams(searchParams)
                                next.set('theme', t)
                                setSearchParams(next)
                            }}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <div className="harness-controls-group">
                    <span className="harness-controls-label">Densité :</span>
                    {densities.map((d) => (
                        <button
                            key={d}
                            type="button"
                            className="harness-controls-btn"
                            data-active={density === d}
                            onClick={() => {
                                const next = new URLSearchParams(searchParams)
                                next.set('density', d)
                                setSearchParams(next)
                            }}
                        >
                            {d}
                        </button>
                    ))}
                </div>
                <div className="harness-controls-group">
                    <span className="harness-controls-label">Marque :</span>
                    {brands.map((b) => (
                        <button
                            key={b}
                            type="button"
                            className="harness-controls-btn"
                            data-active={brand === b}
                            onClick={() => {
                                const next = new URLSearchParams(searchParams)
                                next.set('brand', b)
                                setSearchParams(next)
                            }}
                        >
                            {b}
                        </button>
                    ))}
                </div>
            </nav>
            <ThemeScope theme={theme} density={density} {...(brand === 'studio' ? { brand } : {})}>
                <Harness />
            </ThemeScope>
        </main>
    )
}
