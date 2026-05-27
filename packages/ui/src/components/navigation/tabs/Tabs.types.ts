import type { HTMLAttributes, ReactNode } from 'react'

export type TabsTone = 'neutral' | 'accent' | 'danger'
export type TabsSize = 'sm' | 'md' | 'lg'

export interface TabItem {
  value: string
  label: ReactNode
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  tone?: TabsTone
  size?: TabsSize
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
  fullWidth?: boolean
}
