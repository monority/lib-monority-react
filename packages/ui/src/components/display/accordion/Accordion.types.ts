import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface AccordionItem {
    value: string
    title: ReactNode
    content: ReactNode
    /** Disabled items are not focusable via the roving tabindex and cannot be toggled. */
    disabled?: boolean
}

export type AccordionSize = 'sm' | 'md' | 'lg'

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    ref?: Ref<HTMLDivElement>
    items?: AccordionItem[]
    defaultValue?: string | string[]
    value?: string | string[]
    onChange?: (value: string | string[]) => void
    onValueChange?: (value: string | string[]) => void
    allowMultiple?: boolean
    collapsible?: boolean
    size?: AccordionSize
}
