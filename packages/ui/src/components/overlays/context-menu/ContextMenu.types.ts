import type { HTMLAttributes, ReactNode } from 'react'

export interface ContextMenuItem {
  value: string
  label: ReactNode
  type?: 'item' | 'separator'
  disabled?: boolean
  danger?: boolean
  onSelect?: (value: string) => void
}

export interface ContextMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  trigger: ReactNode
  items: ContextMenuItem[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  contentClassName?: string
}
