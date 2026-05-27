import type { ReactNode } from 'react'

export interface FormSectionProps {
  title?: ReactNode
  description?: ReactNode
  meta?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  className?: string
}
