import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export type CheckboxTone = 'accent' | 'neutral' | 'danger'
export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'children'> {
    ref?: Ref<HTMLInputElement>
    tone?: CheckboxTone
    size?: CheckboxSize
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    className?: string
    indeterminate?: boolean
    invalid?: boolean
}
