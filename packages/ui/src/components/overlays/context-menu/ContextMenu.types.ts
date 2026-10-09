import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ContextMenuItem {
    value: string
    label: ReactNode
    type?: 'item' | 'separator'
    disabled?: boolean
    danger?: boolean
    icon?: ReactNode
    shortcut?: string
    onSelect?: (value: string) => void
}

export interface ContextMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    ref?: Ref<HTMLDivElement>
    trigger: ReactNode
    items: ContextMenuItem[]
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    contentClassName?: string
}
