import { useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
    Button,
    CopyButton,
    IconButton,
    Input,
    positionOverlay,
    Spinner,
    ThemeScope,
} from '@monority/ui'
import './harness.css'

const themes = ['light', 'dark', 'dim', 'oled', 'ocean', 'night', 'high-contrast'] as const
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
    const previews = ['hover', 'active', 'focus'] as const
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
            {previews.map((preview) => (
                <Sample key={preview} label={`preview ${preview}`}>
                    <Button data-mr-preview={preview}>Enregistrer</Button>
                </Sample>
            ))}
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
                <Sample key={size} label={size}>
                    <Spinner size={size} />
                </Sample>
            ))}
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

function InputHarness() {
    return (
        <>
            <Sample label="champ vide avec placeholder">
                <Input placeholder="Entrez une valeur..." />
            </Sample>
            <Sample label="champ avec valeur">
                <Input defaultValue="Texte saisi" placeholder="Entrez une valeur..." />
            </Sample>
            <Sample label="focus clavier">
                <Input
                    id="input-harness-focus"
                    data-mr-preview="focus"
                    defaultValue="Champ actif avec focus"
                    placeholder="Entrez une valeur..."
                />
            </Sample>
        </>
    )
}

const harnesses: Record<string, () => React.JSX.Element> = {
    button: ButtonHarness,
    input: InputHarness,
    'icon-button': IconButtonHarness,
    'copy-button': CopyButtonHarness,
    'button-link': ButtonLinkHarness,
    spinner: SpinnerHarness,
    __position: PositionHarness,
}

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

    return (
        <main
            className="harness-page"
            data-testid="harness-page"
            data-harness-component={component}
            data-theme={theme}
        >
            <nav className="harness-controls" data-testid="harness-controls">
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Thème:</span>
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
            </nav>
            <ThemeScope theme={theme} density={density} {...(brand === 'studio' ? { brand } : {})}>
                <Harness />
            </ThemeScope>
        </main>
    )
}
