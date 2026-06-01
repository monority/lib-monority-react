import { DocPage, type DocPageData } from '../DocPage'
import {
  CarouselBasicExample,
  CarouselAutoPlayExample,
  CarouselLoopExample,
  CarouselNoControlsExample,
} from './Carousel.examples'

const docData: DocPageData = {
  title: 'Carousel',
  description:
    'Scrollable/sliding carousel with prev/next buttons and optional pagination dots.',
  importCode: "import { Carousel } from '@monority/ui/carousel'",
  usageCode: `<Carousel
  slides={[
    <img key="0" src="/a.jpg" alt="A" />,
    <img key="1" src="/b.jpg" alt="B" />,
    <img key="2" src="/c.jpg" alt="C" />,
  ]}
  autoPlay
  loop
/>`,
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
      description: 'Array of slide content elements.',
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
      description: 'Show prev/next navigation arrows.',
    },
    {
      name: 'showDots',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Show pagination dot indicators.',
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
    '.mr-carousel--horizontal',
    '.mr-carousel--vertical',
    '.mr-carousel__viewport',
    '.mr-carousel__track',
    '.mr-carousel__track--horizontal',
    '.mr-carousel__track--vertical',
    '.mr-carousel__slide',
    '.mr-carousel__arrow',
    '.mr-carousel__arrow--prev',
    '.mr-carousel__arrow--next',
    '.mr-carousel__dots',
    '.mr-carousel__dot',
    '.mr-carousel__dot--active',
  ],
  tokens: [
    '--mr-radius-md',
    '--mr-radius-full',
    '--mr-spacing-3',
    '--mr-bg-surface',
    '--mr-bg-surface-strong',
    '--mr-border-subtle',
    '--mr-border-muted',
    '--mr-fg-default',
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
