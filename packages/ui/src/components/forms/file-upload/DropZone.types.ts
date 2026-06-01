import type { HTMLAttributes, ReactNode } from 'react'

export interface DropZoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  onDrop?: (files: File[]) => void
  accept?: string | string[]
  multiple?: boolean
  disabled?: boolean
  children?: ReactNode
}
