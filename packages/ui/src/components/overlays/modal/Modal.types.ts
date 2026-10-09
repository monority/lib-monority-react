import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    /** Whether the modal is open */
    open: boolean
    /** Modal title */
    title: string
    /** Optional description below title */
    description?: ReactNode
    /** Optional modal footer actions */
    footer?: ReactNode
    /** Modal body content */
    children: ReactNode
    /** Called when the modal should close */
    onClose: () => void
}
