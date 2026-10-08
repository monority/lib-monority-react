import type { ReactNode, Ref } from 'react'

export type FileUploadSize = 'sm' | 'md' | 'lg'

export interface FileUploadProps {
    ref?: Ref<HTMLInputElement>
    size?: FileUploadSize
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    className?: string
    accept?: string | string[]
    placeholder?: ReactNode
    multiple?: boolean
    disabled?: boolean
    required?: boolean
    invalid?: boolean
    name?: string
    actionLabel?: string
    description?: ReactNode
    files?: File[]
    onFilesChange?: (files: File[]) => void
    id?: string
}
