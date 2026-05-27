import type { HTMLAttributes, ReactNode } from 'react'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  open: boolean
  /** Modal title */
  title: string
  /** Modal body content */
  children: ReactNode
  /** Called when the modal should close */
  onClose: () => void
}
