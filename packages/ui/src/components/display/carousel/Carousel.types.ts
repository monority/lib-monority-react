import type { HTMLAttributes, ReactNode } from 'react'

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  slides: ReactNode[]
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showDots?: boolean
  loop?: boolean
  orientation?: 'horizontal' | 'vertical'
  slideClassName?: string
}
