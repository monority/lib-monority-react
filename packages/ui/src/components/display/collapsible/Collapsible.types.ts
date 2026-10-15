import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export interface CollapsibleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    ref?: Ref<HTMLDivElement>
    title?: ReactNode
    children: ReactNode
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    children?: ReactNode
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}
