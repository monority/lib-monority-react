import type { InputHTMLAttributes, ReactNode } from 'react'

export type SearchInputSize = 'sm' | 'md' | 'lg'

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: SearchInputSize
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
  inputClassName?: string
  onClear?: () => void
}
