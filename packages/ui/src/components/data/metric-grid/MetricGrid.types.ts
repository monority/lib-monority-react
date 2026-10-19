import type { StatCardProps } from '@/components/data/stat-card/StatCard.types'
import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface MetricGridItem extends StatCardProps {
    key: string
}

export interface MetricGridProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    items?: MetricGridItem[]
    children?: ReactNode
}
