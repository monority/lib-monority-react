import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    slides: ReactNode[]
    autoPlay?: boolean
    interval?: number
    showArrows?: boolean
    showDots?: boolean
    loop?: boolean
    orientation?: 'horizontal' | 'vertical'
    slideClassName?: string
}
