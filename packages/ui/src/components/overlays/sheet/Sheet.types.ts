import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type SheetSide = 'right' | 'left' | 'top' | 'bottom'

export interface SheetProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    open: boolean
    title?: string
    description?: string
    children: ReactNode
    side?: SheetSide
    footer?: ReactNode
    onClose: () => void
}

export interface SheetHeaderProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children: ReactNode
}

export interface SheetTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>
    children: ReactNode
}

export interface SheetDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
    children: ReactNode
}

export interface SheetBodyProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children: ReactNode
}

export interface SheetFooterProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children: ReactNode
}

export interface SheetCloseProps extends HTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    children?: ReactNode
    onClose?: () => void
}
