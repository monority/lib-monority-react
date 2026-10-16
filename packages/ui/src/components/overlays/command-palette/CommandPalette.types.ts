import type {
    ButtonHTMLAttributes,
    HTMLAttributes,
    InputHTMLAttributes,
    ReactNode,
    Ref,
} from 'react'

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
    children?: ReactNode
}

export interface CommandPaletteHeaderProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
}

export interface CommandPaletteInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    ref?: Ref<HTMLInputElement>
}

export interface CommandPaletteListProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface CommandPaletteGroupProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    heading?: ReactNode
}

export interface CommandPaletteItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    value?: string
    active?: boolean
    onSelect?: () => void
}

export interface CommandPaletteItemLabelProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}

export interface CommandPaletteItemDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}

export interface CommandPaletteShortcutProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}

export interface CommandPaletteEmptyProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface CommandPaletteSeparatorProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}
