import type { ReactNode, Ref } from 'react'

export type InputBaseAs = 'input' | 'textarea' | 'select'

export interface InputBaseProps {
  as: InputBaseAs
  size?: 'sm' | 'md' | 'lg'
  tone?: 'neutral' | 'accent' | 'danger'
  invalid?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
  children?: ReactNode
  id?: string
  ref?: Ref<HTMLElement>
  /* Allow any additional HTML attribute */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
