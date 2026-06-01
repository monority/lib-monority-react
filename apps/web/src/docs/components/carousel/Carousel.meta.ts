export const carouselMeta = {
  title: 'Carousel',
  status: 'draft',
  package: '@monority/ui/carousel',
  import: "import { Carousel } from '@monority/ui/carousel'",
  category: 'display',
  anatomy: [
    'root',
    'viewport',
    'track',
    'slide',
    'arrow (prev/next)',
    'dots',
    'dot',
  ],
  accessibility: [
    'role="region" + aria-roledescription="carousel"',
    'Each slide: role="group" + aria-roledescription="slide"',
    'aria-hidden on non-visible slides',
    'Dots: role="tablist" + role="tab" + aria-selected',
    'Auto-play pauses on hover',
  ],
}
