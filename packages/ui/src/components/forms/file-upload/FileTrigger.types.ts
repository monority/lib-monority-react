import type { ReactNode, HTMLAttributes } from 'react'

export interface FileTriggerProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect' | 'children'> {
  accept?: string | string[]
  multiple?: boolean
  onSelect?: (files: File[]) => void
  directory?: boolean
  disabled?: boolean
  required?: boolean
  children?: ReactNode
}
