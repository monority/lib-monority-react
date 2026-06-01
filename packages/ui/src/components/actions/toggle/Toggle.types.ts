import type { ButtonHTMLAttributes } from 'react'

export type ToggleVariant = 'default' | 'outline'
export type ToggleSize = 'sm' | 'md' | 'lg'

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  variant?: ToggleVariant
  size?: ToggleSize
}
