import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface InputOTPProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    ref?: Ref<HTMLDivElement>
    value?: string
    defaultValue?: string
    maxLength?: number
    onChange?: (value: string) => void
    onComplete?: (value: string) => void
    disabled?: boolean
    autoFocus?: boolean
    children?: ReactNode
    pattern?: string
    inputMode?: 'numeric' | 'text'
}

export interface InputOTPGroupProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children: ReactNode
}

export interface InputOTPSlotProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    index: number
}

export interface InputOTPSeparatorProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}
