import type { HTMLAttributes, ReactNode } from 'react'

export type RadioGroupTone = 'accent' | 'neutral' | 'danger'

export interface RadioItem {
  value: string
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  tone?: RadioGroupTone
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  items?: RadioItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  name?: string
}
