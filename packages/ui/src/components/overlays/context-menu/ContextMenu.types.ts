import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export interface ContextMenuItemData {
    value: string
    label: ReactNode
    type?: 'item' | 'separator'
    disabled?: boolean
    danger?: boolean
    icon?: ReactNode
    shortcut?: string
    onSelect?: (value: string) => void
}

export type ContextMenuItem = ContextMenuItemData

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    trigger?: ReactNode
    items?: ContextMenuItemData[]
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    contentClassName?: string
    children?: ReactNode
}

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface ContextMenuItemProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
    ref?: Ref<HTMLButtonElement>
    value?: string
    danger?: boolean
    icon?: ReactNode
    shortcut?: string
    onSelect?: (value: string) => void
}

export interface ContextMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface ContextMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}
