import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export type PasswordInputSize = 'sm' | 'md' | 'lg'

export interface PasswordInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    ref?: Ref<HTMLInputElement>
    size?: PasswordInputSize
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    className?: string
    inputClassName?: string
    showToggle?: boolean
}
