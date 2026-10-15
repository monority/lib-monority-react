import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type StatCardTone = 'neutral' | 'success' | 'warning' | 'danger'

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    label?: ReactNode
    value?: ReactNode
    trend?: ReactNode
    trendTone?: StatCardTone
    description?: ReactNode
    icon?: ReactNode
    footer?: ReactNode
    children?: ReactNode
}

export interface StatCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface StatCardLabelProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    children?: ReactNode
}

export interface StatCardHeaderEndProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface StatCardIconProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface StatCardTrendProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    tone?: StatCardTone
    children?: ReactNode
}

export interface StatCardMetricProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface StatCardValueProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    children?: ReactNode
}

export interface StatCardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
    children?: ReactNode
}

export interface StatCardFooterProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}
