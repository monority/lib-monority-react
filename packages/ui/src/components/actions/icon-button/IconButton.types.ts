import type { ButtonProps } from '../button/Button.types'
import type { ReactNode } from 'react'

export type IconButtonSize = ButtonProps['size']
export type IconButtonTone = 'neutral' | 'accent' | 'danger'

export interface IconButtonProps
  extends Omit<ButtonProps, 'iconOnly' | 'size' | 'variant' | 'children'> {
  size?: IconButtonSize
  tone?: IconButtonTone
  label: string
  children: ReactNode
}
