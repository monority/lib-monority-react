import type {
    ButtonHTMLAttributes,
    HTMLAttributes,
    InputHTMLAttributes,
    ReactNode,
    Ref,
} from 'react'

export interface ComboboxItem {
    value: string
    label: string
    description?: string
    keywords?: string
}

export type ComboboxItemData = ComboboxItem

export type ComboboxTone = 'neutral' | 'accent' | 'danger'
export type ComboboxSize = 'sm' | 'md' | 'lg'

export interface ComboboxProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'type' | 'size' | 'onChange' | 'defaultValue'
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
    loading?: boolean
    clearable?: boolean
    clearAriaLabel?: string
    onClear?: () => void
    children?: ReactNode
}

export interface ComboboxInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    ref?: Ref<HTMLInputElement>
}

export interface ComboboxListProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}

export interface ComboboxItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    value: string
    label?: string
    description?: string
}

export interface ComboboxItemLabelProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}

export interface ComboboxItemDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
}

export interface ComboboxEmptyProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}
