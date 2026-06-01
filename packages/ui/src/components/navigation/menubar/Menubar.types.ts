import type { ReactNode, HTMLAttributes } from 'react'

export interface MenuItem {
  label: string
  shortcut?: string
  disabled?: boolean
  separator?: boolean
  onClick?: () => void
  icon?: ReactNode
  variant?: 'default' | 'danger'
}

export interface MenubarMenu {
  label: string
  items: MenuItem[]
  disabled?: boolean
}

export interface MenubarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  items: MenubarMenu[]
  defaultActive?: string
}
