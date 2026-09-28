import type { HTMLAttributes } from 'react'
import type { StatCardProps } from '@/components/data/stat-card/StatCard.types'

export interface MetricGridItem extends StatCardProps {
    key: string
}

export interface MetricGridProps extends HTMLAttributes<HTMLDivElement> {
    items?: MetricGridItem[]
}
