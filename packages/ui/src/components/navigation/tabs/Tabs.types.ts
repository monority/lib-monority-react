import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export type TabsTone = 'neutral' | 'accent' | 'danger'
export type TabsSize = 'sm' | 'md' | 'lg'

export interface TabItem {
    value: string
    label: ReactNode
    disabled?: boolean
}

export interface TabsProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    ref?: Ref<HTMLDivElement>
    tone?: TabsTone
    size?: TabsSize
    items?: TabItem[]
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    disabled?: boolean
    fullWidth?: boolean
    children?: ReactNode
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    tone?: TabsTone
    size?: TabsSize
    disabled?: boolean
    fullWidth?: boolean
}

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    value: string
    disabled?: boolean
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    value: string
    forceMount?: boolean
}
