import type { HTMLAttributes, ReactNode } from 'react'

export type StatCardTone = 'neutral' | 'success' | 'warning' | 'danger'

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode
  value: ReactNode
  trend?: ReactNode
  trendTone?: StatCardTone
  description?: ReactNode
  icon?: ReactNode
  footer?: ReactNode
}
