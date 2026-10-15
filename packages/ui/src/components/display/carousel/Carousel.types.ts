import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    slides?: ReactNode[]
    children?: ReactNode
    autoPlay?: boolean
    interval?: number
    showArrows?: boolean
    showDots?: boolean
    loop?: boolean
    orientation?: 'horizontal' | 'vertical'
    slideClassName?: string
}

export interface CarouselContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
    index?: number
}

export interface CarouselButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    children?: ReactNode
}

export interface CarouselDotsProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}
