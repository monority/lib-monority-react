import type { HTMLAttributes, ReactNode } from 'react'

export interface CollapsibleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  size?: 'sm' | 'md' | 'lg'
}
