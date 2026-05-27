import type { InputHTMLAttributes, ReactNode } from 'react'

export type FileUploadSize = 'sm' | 'md' | 'lg'

export interface FileUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'accept' | 'placeholder'> {
  size?: FileUploadSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  inputClassName?: string
  accept?: string | string[]
  placeholder?: ReactNode
}
