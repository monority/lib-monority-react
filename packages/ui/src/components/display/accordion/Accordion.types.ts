import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export interface AccordionItemData {
    value: string
    title: ReactNode
    content: ReactNode
    /** Disabled items are not focusable via the roving tabindex and cannot be toggled. */
    disabled?: boolean
}

export type AccordionSize = 'sm' | 'md' | 'lg'

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    ref?: Ref<HTMLDivElement>
    items?: AccordionItemData[]
    defaultValue?: string | string[]
    value?: string | string[]
    onChange?: (value: string | string[]) => void
    onValueChange?: (value: string | string[]) => void
    allowMultiple?: boolean
    collapsible?: boolean
    size?: AccordionSize
    children?: ReactNode
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    value: string
    disabled?: boolean
}

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}
