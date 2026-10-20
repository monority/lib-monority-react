import type { HTMLAttributes, OlHTMLAttributes, ReactNode, Ref } from 'react'

export type TimelineOrientation = 'vertical' | 'horizontal'

export type TimelineSize = 'sm' | 'md' | 'lg'

export type TimelineLineStyle = 'solid' | 'dashed' | 'dotted'

export type TimelineStatus =
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'in-progress'
    | 'completed'

export type TimelinePointVariant = 'solid' | 'outline' | 'subtle'

export interface TimelineItemData {
    id?: string | number
    date?: string
    title: string
    description?: ReactNode
    status?: TimelineStatus
    icon?: ReactNode
    extra?: ReactNode
    lineStyle?: TimelineLineStyle
}

export interface TimelineProps extends OlHTMLAttributes<HTMLOListElement> {
    ref?: Ref<HTMLOListElement>
    orientation?: TimelineOrientation
    size?: TimelineSize
    lineStyle?: TimelineLineStyle
    items?: TimelineItemData[]
    children?: ReactNode
}

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
    ref?: Ref<HTMLLIElement>
    status?: TimelineStatus
    lineStyle?: TimelineLineStyle
    size?: TimelineSize
    interactive?: boolean
    children?: ReactNode
}

export interface TimelinePointProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    status?: TimelineStatus
    variant?: TimelinePointVariant
    size?: TimelineSize
    icon?: ReactNode
    children?: ReactNode
}

export interface TimelineContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children: ReactNode
}

export interface TimelineHeaderProps extends HTMLAttributes<HTMLDivElement> {
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

export interface TimelineExtraProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children: ReactNode
}
