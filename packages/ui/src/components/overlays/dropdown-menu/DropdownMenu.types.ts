import type { HTMLAttributes, ReactNode } from 'react'

export type DropdownAlign = 'start' | 'center' | 'end'
export type DropdownSide = 'top' | 'bottom' | 'left' | 'right'

export interface DropdownMenuItem {
  value: string
  label: string
  type?: 'item' | 'separator'
  disabled?: boolean
  danger?: boolean
  onSelect?: (value: string) => void
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode | string
  items?: DropdownMenuItem[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  align?: DropdownAlign
  side?: DropdownSide
  contentClassName?: string
}
