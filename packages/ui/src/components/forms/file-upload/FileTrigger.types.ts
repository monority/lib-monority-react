import type { InputHTMLAttributes, ReactNode } from 'react'

export interface FileTriggerProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        | 'accept'
        | 'children'
        | 'className'
        | 'disabled'
        | 'id'
        | 'multiple'
        | 'onSelect'
        | 'required'
    > {
    accept?: string | string[]
    multiple?: boolean
    onSelect?: (files: File[]) => void
    directory?: boolean
    disabled?: boolean
    required?: boolean
    invalid?: boolean
    id?: string
    children?: ReactNode
    className?: string
}
