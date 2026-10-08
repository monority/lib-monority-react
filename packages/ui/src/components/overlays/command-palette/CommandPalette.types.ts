import type { HTMLAttributes, Ref } from 'react'

export interface CommandItem {
    value: string
    label: string
    description?: string
    keywords?: string
    group?: string
    shortcut?: string
    onSelect?: () => void
}

export interface CommandPaletteProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    open: boolean
    onClose?: () => void
    items?: CommandItem[]
    title?: string
    placeholder?: string
    emptyLabel?: string
}
