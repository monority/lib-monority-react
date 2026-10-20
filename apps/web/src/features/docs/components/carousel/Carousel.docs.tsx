import { Card } from '@monority/ui/card'
import { Carousel } from '@monority/ui/carousel'
import { Text } from '@monority/ui/text'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    CarouselAutoPlayExample,
    CarouselBasicExample,
    CarouselLoopExample,
    CarouselNoControlsExample,
} from './Carousel.examples'

const playgroundSlides = [
    <Card
        key="0"
        padding="lg"
        style={{
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--mr-bg-raised)',
            border: '1px solid var(--mr-border-subtle)',
        }}
    >
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--mr-space-3)',
                }}
            >
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontWeight: 'var(--mr-font-weight-semibold)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--mr-accent-solid)',
                    }}
                >
                    Architecture
                </span>
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontFamily: 'monospace',
                        color: 'var(--mr-text-muted)',
                    }}
                >
                    01 / 04
                </span>
            </div>
            <Text
                tone="strong"
                size="lg"
                style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}
            >
                CSS Cascade Layers (@layer)
            </Text>
            <Text size="sm" tone="muted">
                Fondation ordonnée en 6 couches déterministes prévenant les conflits de spécificité
                avec les styles applicatifs.
            </Text>
        </div>
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                marginTop: 'var(--mr-space-4)',
                paddingTop: 'var(--mr-space-3)',
                borderTop: '1px solid var(--mr-border-subtle)',
                fontSize: 'var(--mr-font-size-xs)',
                color: 'var(--mr-text-muted)',
            }}
        >
            <span>mr.reset</span>
            <span>•</span>
            <span>mr.tokens</span>
            <span>•</span>
            <span>mr.components</span>
        </div>
    </Card>,
    <Card
        key="1"
        padding="lg"
        style={{
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--mr-bg-raised)',
            border: '1px solid var(--mr-border-subtle)',
        }}
    >
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--mr-space-3)',
                }}
            >
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontWeight: 'var(--mr-font-weight-semibold)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--mr-accent-solid)',
                    }}
                >
                    Accessibilité
                </span>
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontFamily: 'monospace',
                        color: 'var(--mr-text-muted)',
                    }}
                >
                    02 / 04
                </span>
            </div>
            <Text
                tone="strong"
                size="lg"
                style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}
            >
                Contrôles Clavier & Lecteurs d'Écran
            </Text>
            <Text size="sm" tone="muted">
                Prise en charge complète de la spécification WAI-ARIA 1.2 : touches fléchées, Home,
                End, région rotative et annonces en direct.
            </Text>
        </div>
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                marginTop: 'var(--mr-space-4)',
                paddingTop: 'var(--mr-space-3)',
                borderTop: '1px solid var(--mr-border-subtle)',
                fontSize: 'var(--mr-font-size-xs)',
                color: 'var(--mr-text-muted)',
            }}
        >
            <span>role=&quot;region&quot;</span>
            <span>•</span>
            <span>focus-visible</span>
            <span>•</span>
            <span>pause on hover</span>
        </div>
    </Card>,
    <Card
        key="2"
        padding="lg"
        style={{
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--mr-bg-raised)',
            border: '1px solid var(--mr-border-subtle)',
        }}
    >
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--mr-space-3)',
                }}
            >
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontWeight: 'var(--mr-font-weight-semibold)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--mr-accent-solid)',
                    }}
                >
                    Micro-Interactions
                </span>
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontFamily: 'monospace',
                        color: 'var(--mr-text-muted)',
                    }}
                >
                    03 / 04
                </span>
            </div>
            <Text
                tone="strong"
                size="lg"
                style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}
            >
                Indicateurs Morphing & Glassmorphism
            </Text>
            <Text size="sm" tone="muted">
                Points de pagination fluides s'étirant dynamiquement en pilules actives, boutons de
                navigation circulaires en élévation subtile.
            </Text>
        </div>
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                marginTop: 'var(--mr-space-4)',
                paddingTop: 'var(--mr-space-3)',
                borderTop: '1px solid var(--mr-border-subtle)',
                fontSize: 'var(--mr-font-size-xs)',
                color: 'var(--mr-text-muted)',
            }}
        >
            <span>spring physics</span>
            <span>•</span>
            <span>backdrop-filter</span>
            <span>•</span>
            <span>zero layout shift</span>
        </div>
    </Card>,
    <Card
        key="3"
        padding="lg"
        style={{
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--mr-bg-raised)',
            border: '1px solid var(--mr-border-subtle)',
        }}
    >
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--mr-space-3)',
                }}
            >
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontWeight: 'var(--mr-font-weight-semibold)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--mr-accent-solid)',
                    }}
                >
                    Composabilité
                </span>
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontFamily: 'monospace',
                        color: 'var(--mr-text-muted)',
                    }}
                >
                    04 / 04
                </span>
            </div>
            <Text
                tone="strong"
                size="lg"
                style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}
            >
                Composants Composables & Mode Shorthand
            </Text>
            <Text size="sm" tone="muted">
                Utilisation rapide via la prop slides ou architecture compound avec
                Carousel.Content, Carousel.Item, Carousel.Counter et Carousel.PlayPause.
            </Text>
        </div>
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                marginTop: 'var(--mr-space-4)',
                paddingTop: 'var(--mr-space-3)',
                borderTop: '1px solid var(--mr-border-subtle)',
                fontSize: 'var(--mr-font-size-xs)',
                color: 'var(--mr-text-muted)',
            }}
        >
            <span>React 19</span>
            <span>•</span>
            <span>Compound API</span>
            <span>•</span>
            <span>TypeScript strict</span>
        </div>
    </Card>,
]

function CarouselPlayground() {
    return (
        <ComponentPlayground
            title="Carousel"
            description="Diaporama interactif avec flèches circulaires flottantes, indicateurs morphiques et compteur dynamique."
            controls={[
                {
                    type: 'boolean',
                    prop: 'showArrows',
                    label: 'Flèches de navigation (showArrows)',
                    defaultValue: true,
                },
                {
                    type: 'select',
                    prop: 'arrowsPosition',
                    label: 'Position des flèches (arrowsPosition)',
                    defaultValue: 'inside',
                    options: [
                        { value: 'inside', label: 'Intérieur (inside - dans le carrousel)' },
                        { value: 'outside', label: 'Extérieur (outside - flanqué)' },
                    ],
                },
                {
                    type: 'boolean',
                    prop: 'showDots',
                    label: 'Indicateurs à points (showDots)',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    prop: 'showCounter',
                    label: 'Compteur de diapositive (showCounter)',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    prop: 'loop',
                    label: 'Bouclage infini (loop)',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    prop: 'autoPlay',
                    label: 'Lecture auto (autoPlay)',
                    defaultValue: false,
                },
            ]}
            renderCode={(props) => `<Carousel
  slides={[
    <Card padding="lg">Architecture CSS @layer</Card>,
    <Card padding="lg">Accessibilité WAI-ARIA</Card>,
    <Card padding="lg">Indicateurs Morphing</Card>,
    <Card padding="lg">Composabilité React 19</Card>,
  ]}${props.loop ? '\n  loop' : ''}${!props.showArrows ? '\n  showArrows={false}' : ''}${props.arrowsPosition === 'outside' ? '\n  arrowsPosition="outside"' : ''}${!props.showDots ? '\n  showDots={false}' : ''}${props.showCounter ? '\n  showCounter' : ''}${props.autoPlay ? '\n  autoPlay\n  interval={4000}' : ''}
/>`}
        >
            {(props) => (
                <div style={{ width: '100%', maxWidth: 560, margin: '0 auto' }}>
                    <Carousel
                        slides={playgroundSlides}
                        showArrows={props.showArrows as boolean}
                        arrowsPosition={props.arrowsPosition as 'outside' | 'inside'}
                        showDots={props.showDots as boolean}
                        showCounter={props.showCounter as boolean}
                        loop={props.loop as boolean}
                        autoPlay={props.autoPlay as boolean}
                        interval={4000}
                    />
                </div>
            )}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Carousel',
    description:
        'Diaporama accessible avec flèches aériennes glassmorphic, indicateurs morphiques en pilule et compteur de défilement.',
    importCode: "import { Carousel } from '@monority/ui/carousel'",
    usageCode: `<Carousel loop showCounter>
  <Carousel.Content>
    <Carousel.Item><Card padding="lg">Slide 1</Card></Carousel.Item>
    <Carousel.Item><Card padding="lg">Slide 2</Card></Carousel.Item>
    <Carousel.Item><Card padding="lg">Slide 3</Card></Carousel.Item>
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
  <div className="mr-carousel__controls">
    <Carousel.Dots />
    <Carousel.Counter />
    <Carousel.PlayPause />
  </div>
</Carousel>`,
    preview: () => <CarouselPlayground />,
    examples: [
        {
            title: 'Composition Compound',
            content: <CarouselBasicExample />,
        },
        { title: 'Lecture automatique (Auto-play)', content: <CarouselAutoPlayExample /> },
        { title: 'Mode boucle continue (Loop)', content: <CarouselLoopExample /> },
        {
            title: 'Sans contrôles de navigation',
            content: <CarouselNoControlsExample />,
        },
    ],
    props: [
        {
            name: 'slides',
            type: 'ReactNode[]',
            defaultValue: '-',
            description:
                'Tableau des éléments enfants à projeter comme diapositives (mode shorthand).',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description:
                'Sous-composants compound : Carousel.Content, Carousel.Previous, Carousel.Next, etc.',
        },
        {
            name: 'autoPlay',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Active le défilement automatique cadencé.',
        },
        {
            name: 'interval',
            type: 'number',
            defaultValue: '5000',
            description: 'Délai en millisecondes entre deux transitions automatiques.',
        },
        {
            name: 'showArrows',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Affiche les flèches de navigation circulaire (mode shorthand).',
        },
        {
            name: 'arrowsPosition',
            type: `'outside' | 'inside'`,
            defaultValue: `'outside'`,
            description:
                'Positionnement des flèches : extérieur (flanqué à gauche et droite sans chevauchement) ou intérieur (superposé en overlay).',
        },
        {
            name: 'showDots',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Affiche les indicateurs morphiques de pagination (mode shorthand).',
        },
        {
            name: 'showCounter',
            type: 'boolean',
            defaultValue: 'false',
            description:
                'Affiche le badge compteur indiquant la diapositive active / totale (mode shorthand).',
        },
        {
            name: 'loop',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Autorise le bouclage circulaire infini sans blocage aux extrémités.',
        },
        {
            name: 'orientation',
            type: `'horizontal' | 'vertical'`,
            defaultValue: "'horizontal'",
            description: 'Axe de défilement du carrousel.',
        },
        {
            name: 'slideClassName',
            type: 'string',
            defaultValue: '-',
            description: 'Classe CSS additionnelle injectée sur chaque conteneur de diapositive.',
        },
    ],
    keyboardNavigation: [
        {
            key: 'Flèche Gauche / Flèche Droite',
            description:
                'Navigue vers la diapositive précédente ou suivante en orientation horizontale.',
        },
        {
            key: 'Flèche Haut / Flèche Bas',
            description:
                'Navigue vers la diapositive précédente ou suivante en orientation verticale.',
        },
        {
            key: 'Home / Début',
            description: 'Revient immédiatement à la première diapositive.',
        },
        {
            key: 'End / Fin',
            description: 'Avance immédiatement à la dernière diapositive.',
        },
        {
            key: 'Tab',
            description:
                'Déplace le focus séquentiellement entre le carrousel, les flèches, le bouton lecture/pause et les points de pagination.',
        },
        {
            key: 'Enter / Espace',
            description:
                'Active le bouton fléché, le bouton lecture/pause ou sélectionne le point de pagination ciblé.',
        },
    ],
    cssHooks: [
        '.mr-carousel',
        '.mr-carousel__viewport',
        '.mr-carousel__track',
        '.mr-carousel__slide',
        '.mr-carousel__arrow',
        '.mr-carousel__arrow--prev',
        '.mr-carousel__arrow--next',
        '.mr-carousel__controls',
        '.mr-carousel__dots',
        '.mr-carousel__dot',
        '.mr-carousel__counter',
        '.mr-carousel__play-pause',
        '[data-orientation]',
        '[data-active]',
    ],
    tokens: [
        '--mr-radius-md',
        '--mr-radius-lg',
        '--mr-radius-full',
        '--mr-space-1',
        '--mr-space-2',
        '--mr-space-3',
        '--mr-space-4',
        '--mr-size-control-sm',
        '--mr-size-control-md',
        '--mr-bg-surface',
        '--mr-bg-raised',
        '--mr-border-control',
        '--mr-border-subtle',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-text-muted',
        '--mr-accent-solid',
        '--mr-focus-ring',
        '--mr-focus-ring-width',
        '--mr-focus-ring-offset',
        '--mr-z-sticky',
        '--mr-duration-panel',
        '--mr-duration-state',
        '--mr-duration-instant',
    ],
    a11y: [
        'Conteneur racine doté de role="region" et aria-roledescription="carousel".',
        'Chaque diapositive expose role="group", aria-roledescription="slide" et un libellé accessible dynamique.',
        'Les diapositives inactives hors champ sont masquées aux technologies d\'assistance via aria-hidden="true".',
        'La pagination expose role="tablist" avec boutons dotés de role="tab" et aria-selected synchronisé.',
        'Support complet des raccourcis clavier (flèches directionnelles, touches Home et End).',
        'Suspension automatique de la rotation lors du survol de la souris ou de la prise de focus clavier.',
    ],
}

export function CarouselDocs() {
    return <DocPage doc={docData} />
}
