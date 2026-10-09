import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DropZoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop'> {
    ref?: Ref<HTMLDivElement>
    onDrop?: (files: File[]) => void
    accept?: string | string[]
    multiple?: boolean
    disabled?: boolean
    children?: ReactNode
}
