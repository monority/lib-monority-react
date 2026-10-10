import type { HTMLAttributes, OlHTMLAttributes, ReactNode, Ref } from 'react'

export type TimelineOrientation = 'vertical' | 'horizontal'

export type TimelineStatus =
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'in-progress'

export interface TimelineItemData {
    id?: string | number
    date?: string
    title: string
    description?: ReactNode
    status?: TimelineStatus
}

export interface TimelineProps extends OlHTMLAttributes<HTMLOListElement> {
    ref?: Ref<HTMLOListElement>
    orientation?: TimelineOrientation
    items?: TimelineItemData[]
    children?: ReactNode
}

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
    ref?: Ref<HTMLLIElement>
    status?: TimelineStatus
    children: ReactNode
}

export interface TimelinePointProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    status?: TimelineStatus
}

export interface TimelineContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children: ReactNode
}

export interface TimelineDateProps extends HTMLAttributes<HTMLTimeElement> {
    ref?: Ref<HTMLTimeElement>
    children: ReactNode
}

export interface TimelineTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>
    children: ReactNode
}

export interface TimelineDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
    children: ReactNode
}
