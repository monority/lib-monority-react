import { DocPage, type DocPageData } from '../DocPage'
import {
    CarouselAutoPlayExample,
    CarouselBasicExample,
    CarouselLoopExample,
    CarouselNoControlsExample,
} from './Carousel.examples'

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
    preview: () => <CarouselBasicExample />,
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
