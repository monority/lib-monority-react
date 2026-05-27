import type { HTMLAttributes, ReactNode } from 'react'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode
  children: ReactNode
}
