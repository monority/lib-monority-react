import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    ref?: Ref<HTMLDivElement>
    /** Whether the modal is open */
    open: boolean
    /** Modal title */
    title?: ReactNode
    /** Optional description below title */
    description?: ReactNode
    /** Optional modal footer actions */
    footer?: ReactNode
    /** Modal body content or compound elements */
    children: ReactNode
    /** Called when the modal should close */
    onClose: () => void
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>
    children?: ReactNode
}

export interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>
    children?: ReactNode
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: ReactNode
}

export interface ModalFooterProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>
    children?: ReactNode
}

export interface ModalCloseProps extends HTMLAttributes<HTMLButtonElement> {
    ref?: Ref<HTMLButtonElement>
    children?: ReactNode
    onClose?: () => void
}
