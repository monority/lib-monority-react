import type { HTMLAttributes, ReactNode } from 'react'

export type HoverCardAlign = 'start' | 'center' | 'end'
export type HoverCardSide = 'top' | 'bottom' | 'left' | 'right'

export interface HoverCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  children: ReactNode
  content: ReactNode
  openDelay?: number
  closeDelay?: number
  side?: HoverCardSide
  align?: HoverCardAlign
  sideOffset?: number
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  arrow?: boolean
  contentClassName?: string
}
