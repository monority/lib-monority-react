import type { HTMLAttributes, Ref } from 'react'

export type RatingSize = 'sm' | 'md' | 'lg'

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    ref?: Ref<HTMLDivElement>
    value?: number
    defaultValue?: number
    max?: number
    readOnly?: boolean
    disabled?: boolean
    size?: RatingSize
    onChange?: (value: number) => void
    name?: string
}
