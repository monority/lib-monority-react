import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
    Button,
    Checkbox,
    CopyButton,
    DatePicker,
    Field,
    IconButton,
    Input,
    NumberInput,
    PasswordInput,
    positionOverlay,
    RadioGroup,
    Select,
    Slider,
    Spinner,
    Switch,
    Textarea,
    ThemeScope,
} from '@monority/ui'
import './harness.css'

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
            <span>{label}</span>
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
    return (
        <Sample label="pending 3.1">
            <span data-testid="button-link-pending">ButtonLink · étape 3.1</span>
        </Sample>
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

const harnesses: Record<string, () => React.JSX.Element> = {
    button: ButtonHarness,
    input: InputHarness,
    textarea: TextareaHarness,
    select: SelectHarness,
    checkbox: CheckboxHarness,
    switch: SwitchHarness,
    'radio-group': RadioGroupHarness,
    slider: SliderHarness,
    'number-input': NumberInputHarness,
    'date-picker': DatePickerHarness,
    field: FieldHarness,
    'icon-button': IconButtonHarness,
    'copy-button': CopyButtonHarness,
    'button-link': ButtonLinkHarness,
    spinner: SpinnerHarness,
    __position: PositionHarness,
}

const establishedComponents = [
    { slug: 'button', label: 'Button' },
    { slug: 'input', label: 'Input' },
    { slug: 'textarea', label: 'Textarea' },
    { slug: 'select', label: 'Select' },
    { slug: 'checkbox', label: 'Checkbox' },
    { slug: 'switch', label: 'Switch' },
    { slug: 'radio-group', label: 'RadioGroup' },
    { slug: 'slider', label: 'Slider' },
    { slug: 'number-input', label: 'NumberInput' },
    { slug: 'date-picker', label: 'DatePicker' },
    { slug: 'spinner', label: 'Spinner' },
    { slug: 'field', label: 'Field' },
] as const

const otherComponents = [
    { slug: 'icon-button', label: 'IconButton' },
    { slug: 'copy-button', label: 'CopyButton' },
    { slug: 'button-link', label: 'ButtonLink' },
] as const

export function HarnessPage() {
    const { component = 'button' } = useParams()
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

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.dataset.theme = theme
            document.documentElement.dataset.themeChoice = theme
        }
    }, [theme])

    return (
        <main
            className="harness-page"
            data-testid="harness-page"
            data-harness-component={component}
            data-theme={theme}
        >
            <nav className="harness-controls" data-testid="harness-controls">
                <div className="harness-controls-group" data-testid="harness-components-nav">
                    <span className="harness-controls-label">Composants :</span>
                    {establishedComponents.map((c) => (
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
