import type { HTMLAttributes, ReactNode } from 'react'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  title: string
  children: ReactNode
  side?: DrawerSide
  onClose: () => void
}
