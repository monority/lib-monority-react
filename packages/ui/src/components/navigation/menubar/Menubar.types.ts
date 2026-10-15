import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

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

export interface MenubarProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    items?: MenubarMenu[]
    defaultActive?: string
    value?: string
    onValueChange?: (value: string | null) => void
    children?: ReactNode
}

export interface MenubarMenuProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    value?: string
    disabled?: boolean
    children?: ReactNode
}

export interface MenubarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    children?: ReactNode
}

export interface MenubarContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface MenubarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    variant?: 'default' | 'danger'
    icon?: ReactNode
    shortcut?: string
    children?: ReactNode
}

export interface MenubarSeparatorProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface MenubarShortcutProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    children?: ReactNode
}
