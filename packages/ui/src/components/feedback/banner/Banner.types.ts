import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type BannerTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'

export interface BannerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    ref?: Ref<HTMLElement>
    tone?: BannerTone
    eyebrow?: ReactNode
    title?: ReactNode
    description?: ReactNode
    actions?: ReactNode
    dismissible?: boolean
    onDismiss?: () => void
    open?: boolean
    children?: ReactNode
}

export interface BannerTitleProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
}

export interface BannerDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
}

export interface BannerEyebrowProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}

export interface BannerActionsProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface BannerCloseProps extends HTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
}
