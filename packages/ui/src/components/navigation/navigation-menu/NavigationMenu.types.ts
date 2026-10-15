import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    HTMLAttributes,
    ReactNode,
    Ref,
} from 'react'

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

export interface NavigationMenuProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    items?: NavigationItem[]
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    children?: ReactNode
}

export interface NavigationMenuListProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface NavigationMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    value?: string
    disabled?: boolean
    children?: ReactNode
}

export interface NavigationMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    icon?: ReactNode
    children?: ReactNode
}

export interface NavigationMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface NavigationMenuLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    ref?: Ref<HTMLAnchorElement>
    active?: boolean
    disabled?: boolean
    icon?: ReactNode
    description?: ReactNode
    children?: ReactNode
}
