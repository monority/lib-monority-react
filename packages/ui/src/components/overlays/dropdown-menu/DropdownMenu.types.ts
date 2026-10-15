import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export type DropdownAlign = 'start' | 'center' | 'end'
export type DropdownSide = 'top' | 'bottom' | 'left' | 'right'

export interface DropdownMenuItemData {
    value: string
    label: string
    type?: 'item' | 'separator'
    disabled?: boolean
    danger?: boolean
    icon?: ReactNode
    shortcut?: string
    onSelect?: (value: string) => void
}

export type DropdownMenuItem = DropdownMenuItemData

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    trigger?: ReactNode | string
    items?: DropdownMenuItemData[]
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    align?: DropdownAlign
    side?: DropdownSide
    contentClassName?: string
    children?: ReactNode
}

export interface DropdownMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
}

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface DropdownMenuItemProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
    ref?: Ref<HTMLButtonElement>
    value?: string
    danger?: boolean
    icon?: ReactNode
    shortcut?: string
    onSelect?: (value: string) => void
}

export interface DropdownMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}
