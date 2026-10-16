import { DocPage, type DocPageData } from '../DocPage'
import { ComponentPlayground } from '../ComponentPlayground'
import { Carousel } from '@monority/ui/carousel'
import { Card } from '@monority/ui/card'
import { Text } from '@monority/ui/text'
import {
    CarouselAutoPlayExample,
    CarouselBasicExample,
    CarouselLoopExample,
    CarouselNoControlsExample,
} from './Carousel.examples'

const playgroundSlides = [
    <Card key="0" padding="lg" style={{ textAlign: 'center', background: 'var(--mr-bg-raised)' }}>
        <Text tone="strong">Diapositive 1 — Découverte</Text>
        <Text size="sm" tone="muted" style={{ marginTop: 'var(--mr-space-2)' }}>
            Architecture basée sur CSS layers et tokens.
        </Text>
    </Card>,
    <Card key="1" padding="lg" style={{ textAlign: 'center', background: 'var(--mr-bg-raised)' }}>
        <Text tone="strong">Diapositive 2 — Accessibilité</Text>
        <Text size="sm" tone="muted" style={{ marginTop: 'var(--mr-space-2)' }}>
            Contrôles au clavier conformes WAI-ARIA et gestion du focus.
        </Text>
    </Card>,
    <Card key="2" padding="lg" style={{ textAlign: 'center', background: 'var(--mr-bg-raised)' }}>
        <Text tone="strong">Diapositive 3 — Performance</Text>
        <Text size="sm" tone="muted" style={{ marginTop: 'var(--mr-space-2)' }}>
            Défilement matériel fluide et pause automatique au survol.
        </Text>
    </Card>,
]

function CarouselPlayground() {
    return (
        <ComponentPlayground
            title="Carousel"
            description="Ajustez les options de défilement, indicateurs et flèches de navigation."
            controls={[
                {
                    type: 'boolean',
                    prop: 'showArrows',
                    label: 'Flèches de navigation (showArrows)',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    prop: 'showDots',
                    label: 'Indicateurs à points (showDots)',
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
    <Card padding="lg">Slide 1</Card>,
    <Card padding="lg">Slide 2</Card>,
    <Card padding="lg">Slide 3</Card>,
  ]}${props.loop ? '\n  loop' : ''}${!props.showArrows ? '\n  showArrows={false}' : ''}${!props.showDots ? '\n  showDots={false}' : ''}${props.autoPlay ? '\n  autoPlay\n  interval={4000}' : ''}
/>`}
        >
            {(props) => (
                <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
                    <Carousel
                        slides={playgroundSlides}
                        showArrows={props.showArrows as boolean}
                        showDots={props.showDots as boolean}
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
        'Scrollable carousel with centered, transparent arrow controls and optional pagination dots.',
    importCode: "import { Carousel } from '@monority/ui/carousel'",
    usageCode: `<Carousel>
  <Carousel.Content>
    <Carousel.Item><Card padding="lg">Slide 1</Card></Carousel.Item>
    <Carousel.Item><Card padding="lg">Slide 2</Card></Carousel.Item>
    <Carousel.Item><Card padding="lg">Slide 3</Card></Carousel.Item>
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
  <Carousel.Dots />
</Carousel>`,
    preview: () => <CarouselPlayground />,
    examples: [
        { title: 'Auto-play', content: <CarouselAutoPlayExample /> },
        { title: 'Loop mode', content: <CarouselLoopExample /> },
        {
            title: 'Without controls',
            content: <CarouselNoControlsExample />,
        },
    ],
    props: [
        {
            name: 'slides',
            type: 'ReactNode[]',
            defaultValue: '-',
            description: 'Array of slide content elements (shorthand mode).',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Compound subcomponents Carousel.Content, Carousel.Previous, etc.',
        },
        {
            name: 'autoPlay',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Automatically advance slides at the given interval.',
        },
        {
            name: 'interval',
            type: 'number',
            defaultValue: '5000',
            description: 'Auto-play interval in milliseconds.',
        },
        {
            name: 'showArrows',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Show prev/next navigation arrows (shorthand mode).',
        },
        {
            name: 'showDots',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Show pagination dot indicators (shorthand mode).',
        },
        {
            name: 'loop',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Wrap around at boundaries instead of disabling arrows.',
        },
        {
            name: 'orientation',
            type: `'horizontal' | 'vertical'`,
            defaultValue: "'horizontal'",
            description: 'Slide direction.',
        },
        {
            name: 'slideClassName',
            type: 'string',
            defaultValue: '-',
            description: 'Additional className applied to each slide element.',
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
            key: 'Tab',
            description:
                'Déplace le focus séquentiellement entre les flèches et les boutons indicateurs de pagination.',
        },
        {
            key: 'Enter / Espace',
            description: 'Active le bouton fléché ou sélectionne le point de pagination ciblé.',
        },
    ],
    cssHooks: [
        '.mr-carousel',
        '.mr-carousel__viewport',
        '.mr-carousel__track',
        '.mr-carousel__slide',
        '.mr-carousel__arrow',
        '.mr-carousel__dots',
        '.mr-carousel__dot',
        '[data-orientation]',
        '[data-active]',
    ],
    tokens: [
        '--mr-radius-md',
        '--mr-radius-full',
        '--mr-space-3',
        '--mr-btn-height-md',
        '--mr-accent-solid',
        '--mr-text-primary',
        '--mr-focus-width',
        '--mr-focus-offset',
        '--mr-z-sticky',
        '--mr-duration-fast',
    ],
    a11y: [
        'Root has role="region" + aria-roledescription="carousel".',
        'Each slide has role="group" + aria-roledescription="slide" + aria-label.',
        'Non-visible slides have aria-hidden="true".',
        'Dots use role="tablist" with role="tab" + aria-selected.',
        'Auto-play pauses on hover.',
    ],
}

export function CarouselDocs() {
    return <DocPage doc={docData} />
}
