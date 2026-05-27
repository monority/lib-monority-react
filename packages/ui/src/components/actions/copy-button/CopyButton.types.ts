import type { ButtonProps } from '../button/Button.types'
import type { ReactNode } from 'react'

export type CopyButtonSize = ButtonProps['size']
export type CopyButtonVariant = 'subtle' | 'outline' | 'solid'

export interface CopyButtonProps
  extends Omit<ButtonProps, 'copyValue' | 'copiedLabel' | 'duration' | 'variant' | 'size' | 'children' | 'iconLeading' | 'iconTrailing'> {
  value: string
  label?: string
  copiedLabel?: string
  duration?: number
  size?: CopyButtonSize
  variant?: CopyButtonVariant
}
