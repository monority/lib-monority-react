import type { ReactNode, HTMLAttributes } from 'react'

export interface NavigationSubItem {
  label: string
  href?: string
  description?: string
  icon?: ReactNode
}

export interface NavigationItem {
  label: string
  href?: string
  icon?: ReactNode
  items?: NavigationSubItem[]
  disabled?: boolean
}

export interface NavigationMenuProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  items: NavigationItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}
