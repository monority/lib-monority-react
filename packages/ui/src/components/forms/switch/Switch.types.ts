import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export type SwitchTone = 'accent' | 'neutral' | 'danger'
export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'children'> {
    ref?: Ref<HTMLInputElement>
    tone?: SwitchTone
    size?: SwitchSize
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    className?: string
    invalid?: boolean
}
