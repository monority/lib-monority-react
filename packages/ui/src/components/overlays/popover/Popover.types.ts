import type { HTMLAttributes, ReactNode } from 'react'

export type PopoverAlign = 'start' | 'center' | 'end'
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right'

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode | string
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  align?: PopoverAlign
  side?: PopoverSide
  contentClassName?: string
}
