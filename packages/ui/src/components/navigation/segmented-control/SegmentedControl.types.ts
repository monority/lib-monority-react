import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type SegmentedControlSize = 'sm' | 'md' | 'lg'

export interface SegmentedControlOption {
    value: string
    label: ReactNode
    disabled?: boolean
}

export interface SegmentedControlProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    ref?: Ref<HTMLDivElement>
    options?: SegmentedControlOption[]
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    size?: SegmentedControlSize
    fullWidth?: boolean
    disabled?: boolean
    name?: string
    children?: ReactNode
}

export interface SegmentedControlItemProps
    extends Omit<HTMLAttributes<HTMLButtonElement>, 'value'> {
    ref?: Ref<HTMLButtonElement>
    value: string
    disabled?: boolean
    children?: ReactNode
}
