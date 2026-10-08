import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type StatCardTone = 'neutral' | 'success' | 'warning' | 'danger'

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    label: ReactNode
    value: ReactNode
    trend?: ReactNode
    trendTone?: StatCardTone
    description?: ReactNode
    icon?: ReactNode
    footer?: ReactNode
}
