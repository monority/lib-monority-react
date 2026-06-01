import { Carousel } from '@monority/ui/carousel'
import { Card } from '@monority/ui/card'

const demoSlides = [
  <Card key="0" padding="lg" style={{ textAlign: 'center' }}>
    Slide 1 — Welcome
  </Card>,
  <Card key="1" padding="lg" style={{ textAlign: 'center' }}>
    Slide 2 — Features
  </Card>,
  <Card key="2" padding="lg" style={{ textAlign: 'center' }}>
    Slide 3 — Get started
  </Card>,
]

export function CarouselBasicExample() {
  return <Carousel slides={demoSlides} />
}

export function CarouselAutoPlayExample() {
  return <Carousel slides={demoSlides} autoPlay interval={3000} />
}

export function CarouselLoopExample() {
  return <Carousel slides={demoSlides} loop autoPlay interval={2000} />
}

export function CarouselNoControlsExample() {
  return <Carousel slides={demoSlides} showArrows={false} showDots={false} />
}
