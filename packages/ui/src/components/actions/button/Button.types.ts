import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'ghost' | 'subtle' | 'danger' | 'secondary' | 'muted' | 'warning'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as' | 'type'> {
  as?: ElementType
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  loading?: boolean
  iconLeading?: ReactNode
  iconTrailing?: ReactNode
  children?: ReactNode

  // Copy mode
  copyValue?: string
  copiedLabel?: string
  duration?: number

  // Icon-only mode
  iconOnly?: boolean
}
