import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    ref?: Ref<HTMLDivElement>
    open: boolean
    title?: ReactNode
    description?: ReactNode
    footer?: ReactNode
    children: ReactNode
    side?: DrawerSide
    onClose: () => void
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}

export interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>
    children?: ReactNode
}

export interface DrawerDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
    children?: ReactNode
}

export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface DrawerFooterProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}

export interface DrawerCloseProps extends HTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    children?: ReactNode
    onClose?: () => void
}
