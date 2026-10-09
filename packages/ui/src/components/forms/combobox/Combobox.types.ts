import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export interface ComboboxItem {
    value: string
    label: string
    description?: string
    keywords?: string
}

export type ComboboxTone = 'neutral' | 'accent' | 'danger'
export type ComboboxSize = 'sm' | 'md' | 'lg'

export interface ComboboxProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'type' | 'size' | 'onChange' | 'children' | 'defaultValue'
    > {
    ref?: Ref<HTMLInputElement>
    tone?: ComboboxTone
    size?: ComboboxSize
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    items?: ComboboxItem[]
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    placeholder?: string
    emptyLabel?: string
    invalid?: boolean
}
