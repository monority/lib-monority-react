import type { ReactNode, Ref } from 'react'

export interface FormSectionProps {
    ref?: Ref<HTMLDivElement>
    title?: ReactNode
    description?: ReactNode
    meta?: ReactNode
    actions?: ReactNode
    children?: ReactNode
    className?: string
}
