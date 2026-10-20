import { Card } from '@monority/ui/card'
import { Carousel } from '@monority/ui/carousel'
import { Text } from '@monority/ui/text'

const demoSlides = [
    <Card
        key="0"
        padding="lg"
        style={{
            minHeight: '200px',
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
                    Système
                </span>
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontFamily: 'monospace',
                        color: 'var(--mr-text-muted)',
                    }}
                >
                    01 / 03
                </span>
            </div>
            <Text
                tone="strong"
                size="lg"
                style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}
            >
                Couches CSS Déterministes
            </Text>
            <Text size="sm" tone="muted">
                Isolation rigoureuse via @layer mr.components évitant tout conflit de spécificité
                avec les styles applicatifs.
            </Text>
        </div>
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                marginTop: 'var(--mr-space-3)',
                fontSize: 'var(--mr-font-size-xs)',
                color: 'var(--mr-text-muted)',
            }}
        >
            <span>@layer mr.components</span>
            <span>•</span>
            <span>0 !important</span>
        </div>
    </Card>,
    <Card
        key="1"
        padding="lg"
        style={{
            minHeight: '200px',
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
                    Interactions
                </span>
                <span
                    style={{
                        fontSize: 'var(--mr-font-size-xs)',
                        fontFamily: 'monospace',
                        color: 'var(--mr-text-muted)',
                    }}
                >
                    02 / 03
                </span>
            </div>
            <Text
                tone="strong"
                size="lg"
                style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}
            >
                Flèches Aériennes & Glassmorphism
            </Text>
            <Text size="sm" tone="muted">
                Micro-interactions réactives au survol et au clic, avec flou d'arrière-plan et
                élévation dynamique.
            </Text>
        </div>
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                marginTop: 'var(--mr-space-3)',
                fontSize: 'var(--mr-font-size-xs)',
                color: 'var(--mr-text-muted)',
            }}
        >
            <span>backdrop-filter</span>
            <span>•</span>
            <span>spring physics</span>
        </div>
    </Card>,
    <Card
        key="2"
        padding="lg"
        style={{
            minHeight: '200px',
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
                    03 / 03
                </span>
            </div>
            <Text
                tone="strong"
                size="lg"
                style={{ display: 'block', marginBottom: 'var(--mr-space-2)' }}
            >
                Contrôle Clavier Accessible
            </Text>
            <Text size="sm" tone="muted">
                Navigation au clavier complète (flèches, touches Home et End) avec anneaux de focus
                conformes WCAG AAA.
            </Text>
        </div>
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                marginTop: 'var(--mr-space-3)',
                fontSize: 'var(--mr-font-size-xs)',
                color: 'var(--mr-text-muted)',
            }}
        >
            <span>WAI-ARIA 1.2</span>
            <span>•</span>
            <span>WCAG AAA</span>
        </div>
    </Card>,
]

export function CarouselBasicExample() {
    return (
        <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
            <Carousel loop>
                <Carousel.Content>
                    <Carousel.Item>{demoSlides[0]}</Carousel.Item>
                    <Carousel.Item>{demoSlides[1]}</Carousel.Item>
                    <Carousel.Item>{demoSlides[2]}</Carousel.Item>
                </Carousel.Content>
                <Carousel.Previous />
                <Carousel.Next />
                <div className="mr-carousel__controls">
                    <Carousel.Dots />
                    <Carousel.Counter />
                    <Carousel.PlayPause />
                </div>
            </Carousel>
        </div>
    )
}

export function CarouselAutoPlayExample() {
    return (
        <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
            <Carousel slides={demoSlides} autoPlay interval={3500} showCounter loop />
        </div>
    )
}

export function CarouselLoopExample() {
    return (
        <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
            <Carousel slides={demoSlides} loop showCounter />
        </div>
    )
}

export function CarouselNoControlsExample() {
    return (
        <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
            <Carousel slides={demoSlides} showArrows={false} showDots={false} />
        </div>
    )
}
