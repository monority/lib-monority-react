import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export type NumberInputSize = 'sm' | 'md' | 'lg'
export type NumberInputTone = 'neutral' | 'accent' | 'danger'

export interface NumberInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'type' | 'size' | 'value' | 'onChange' | 'defaultValue'
    > {
    ref?: Ref<HTMLInputElement>
    size?: NumberInputSize
    tone?: NumberInputTone
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    className?: string
    inputClassName?: string
    wrapperClassName?: string
    invalid?: boolean
    min?: number
    max?: number
    step?: number
    value?: number | null
    defaultValue?: number | null
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onValueChange?: (value: number | null) => void
}
