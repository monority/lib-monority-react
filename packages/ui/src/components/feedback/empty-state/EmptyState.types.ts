import type { HTMLAttributes, ReactNode } from 'react'

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  action?: ReactNode
  secondaryAction?: ReactNode
}
