import { Card } from '@monority/ui/card'
import { Carousel } from '@monority/ui/carousel'
import { Text } from '@monority/ui/text'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { carouselI18n } from './Carousel.messages'
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
                Structured foundation organized into 6 deterministic layers preventing specificity
                conflicts with host applications.
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
                    Accessibility
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
                WAI-ARIA Pattern & Focus Management
            </Text>
            <Text size="sm" tone="muted">
                Native keyboard support with Arrow keys, Home/End navigation, live region updates,
                and automatic hover/focus pause.
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
            <span>roving tabindex</span>
            <span>•</span>
            <span>aria-roledescription</span>
            <span>•</span>
            <span>screen readers</span>
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
                Morphing Indicators & Glassmorphic Arrows
            </Text>
            <Text size="sm" tone="muted">
                Fluid pagination dots expanding into active pill shapes, floating circular
                navigation buttons with subtle elevation.
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
                    Composability
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
                Composable Subcomponents & Shorthand Mode
            </Text>
            <Text size="sm" tone="muted">
                Fast setup via the slides prop or compound architecture using Carousel.Content,
                Carousel.Item, Carousel.Counter, and Carousel.PlayPause.
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
            description="Interactive slideshow with floating circular arrows, morphing pill dots, and dynamic slide counter."
            controls={[
                {
                    type: 'boolean',
                    name: 'showArrows',
                    prop: 'showArrows',
                    label: 'Navigation arrows (showArrows)',
                    defaultValue: true,
                },
                {
                    type: 'select',
                    name: 'arrowsPosition',
                    prop: 'arrowsPosition',
                    label: 'Arrows position (arrowsPosition)',
                    defaultValue: 'inside',
                    options: [
                        { value: 'inside', label: 'Inside (overlaid on slides)' },
                        { value: 'outside', label: 'Outside (flanking the sides)' },
                    ],
                },
                {
                    type: 'boolean',
                    name: 'showDots',
                    prop: 'showDots',
                    label: 'Pagination dots (showDots)',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    name: 'showCounter',
                    prop: 'showCounter',
                    label: 'Slide counter (showCounter)',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    name: 'loop',
                    prop: 'loop',
                    label: 'Infinite loop (loop)',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    name: 'autoPlay',
                    prop: 'autoPlay',
                    label: 'Auto-play (autoPlay)',
                    defaultValue: false,
                },
            ]}
            renderCode={(props) => `<Carousel
  slides={[
    <Card padding="lg">CSS Architecture @layer</Card>,
    <Card padding="lg">WAI-ARIA Accessibility</Card>,
    <Card padding="lg">Morphing Indicators</Card>,
    <Card padding="lg">React 19 Composability</Card>,
  ]}${props.loop ? '\n  loop' : ''}${!props.showArrows ? '\n  showArrows={false}' : ''}${props.arrowsPosition === 'outside' ? '\n  arrowsPosition="outside"' : ''}${!props.showDots ? '\n  showDots={false}' : ''}${props.showCounter ? '\n  showCounter' : ''}${props.autoPlay ? '\n  autoPlay\n  interval={4000}' : ''}
/>`}
        >
            {(props) => (
                <div style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
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
        'Accessible slideshow with glassmorphic arrows, morphing pill indicators, and live slide counter.',
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
            title: 'Compound composition',
            content: <CarouselBasicExample />,
        },
        { title: 'Automatic playback (Auto-play)', content: <CarouselAutoPlayExample /> },
        { title: 'Infinite loop mode', content: <CarouselLoopExample /> },
        {
            title: 'Without navigation controls',
            content: <CarouselNoControlsExample />,
        },
    ],
    props: [
        {
            name: 'slides',
            type: 'ReactNode[]',
            defaultValue: '-',
            description: 'Array of child elements projected as slides in shorthand mode.',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description:
                'Compound subcomponents: Carousel.Content, Carousel.Previous, Carousel.Next, etc.',
        },
        {
            name: 'autoPlay',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Enables timed automatic slide transitions.',
        },
        {
            name: 'interval',
            type: 'number',
            defaultValue: '5000',
            description: 'Delay in milliseconds between automatic slide transitions.',
        },
        {
            name: 'showArrows',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Displays floating circular navigation arrows in shorthand mode.',
        },
        {
            name: 'arrowsPosition',
            type: `'outside' | 'inside'`,
            defaultValue: `'outside'`,
            description:
                'Arrow positioning: outside (flanking on sides without overlap) or inside (overlaid on top of slides).',
        },
        {
            name: 'showDots',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Displays morphing pagination dot indicators in shorthand mode.',
        },
        {
            name: 'showCounter',
            type: 'boolean',
            defaultValue: 'false',
            description:
                'Displays badge counter indicating active slide / total count in shorthand mode.',
        },
        {
            name: 'loop',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Allows circular looping without edge boundaries.',
        },
        {
            name: 'orientation',
            type: `'horizontal' | 'vertical'`,
            defaultValue: "'horizontal'",
            description: 'Slide scroll axis.',
        },
        {
            name: 'slideClassName',
            type: 'string',
            defaultValue: '-',
            description: 'Additional CSS class injected on each slide container.',
        },
    ],
    keyboardNavigation: [
        {
            key: 'ArrowLeft / ArrowRight',
            action: 'Navigates to the previous or next slide in horizontal orientation.',
            context: 'Focus on carousel or controls',
        },
        {
            key: 'ArrowUp / ArrowDown',
            action: 'Navigates to the previous or next slide in vertical orientation.',
            context: 'Focus on carousel or controls',
        },
        {
            key: 'Home',
            action: 'Jumps immediately to the first slide.',
            context: 'Focus on carousel or controls',
        },
        {
            key: 'End',
            action: 'Advances immediately to the last slide.',
            context: 'Focus on carousel or controls',
        },
        {
            key: 'Tab',
            action: 'Sequentially moves focus between carousel, arrow buttons, play/pause, and pagination dots.',
            context: 'Global navigation',
        },
        {
            key: 'Enter / Space',
            action: 'Activates the focused arrow, play/pause button, or selects the targeted dot.',
            context: 'Focus on targeted control',
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
        'Root container has role="region" and aria-roledescription="carousel".',
        'Each slide exposes role="group", aria-roledescription="slide", and a dynamic accessible label.',
        'Inactive off-screen slides are hidden from assistive technologies with aria-hidden="true".',
        'Pagination exposes role="tablist" with buttons using role="tab" and synchronized aria-selected.',
        'Full keyboard navigation support with Arrow keys, Home, and End.',
        'Automatic pause on mouse hover or keyboard focus.',
    ],
    i18n: carouselI18n,
}

export function CarouselDocs() {
    return <DocPage doc={docData} />
}
