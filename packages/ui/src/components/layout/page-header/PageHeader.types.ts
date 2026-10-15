import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}

export interface PageHeaderKickerProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    children?: ReactNode
}

export type PageHeaderEyebrowProps = PageHeaderKickerProps

export interface PageHeaderTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>
    children?: ReactNode
    as?: 'h1' | 'h2' | 'h3'
}

export interface PageHeaderDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
    children?: ReactNode
}

export interface PageHeaderActionsProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface PageHeaderMainProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface PageHeaderMetaProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}
