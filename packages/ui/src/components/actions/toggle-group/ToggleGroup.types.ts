import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ToggleGroupItem {
    value: string
    label: ReactNode
    disabled?: boolean
}

export type ToggleGroupType = 'single' | 'multiple'
export type ToggleGroupOrientation = 'horizontal' | 'vertical'
export type ToggleGroupVariant = 'default' | 'outline'
export type ToggleGroupSize = 'sm' | 'md' | 'lg'
export type ToggleGroupTone = 'neutral' | 'accent'

export interface ToggleGroupProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    type?: ToggleGroupType
    value?: string | string[]
    defaultValue?: string | string[]
    onValueChange?: (value: any) => void
    disabled?: boolean
    orientation?: ToggleGroupOrientation
    variant?: ToggleGroupVariant
    size?: ToggleGroupSize
    tone?: ToggleGroupTone
    items?: ToggleGroupItem[]
    className?: string
    children?: ReactNode
    ref?: Ref<HTMLDivElement>
}

export interface ToggleGroupItemProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
    value: string
    disabled?: boolean
    children?: ReactNode
    className?: string
    ref?: Ref<HTMLButtonElement>
}
