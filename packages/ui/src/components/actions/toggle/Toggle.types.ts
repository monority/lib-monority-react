import type { ButtonHTMLAttributes, Ref } from 'react'

export type ToggleVariant = 'default' | 'outline' | 'ghost'
export type ToggleSize = 'sm' | 'md' | 'lg'
export type ToggleTone = 'neutral' | 'accent'

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    pressed?: boolean
    defaultPressed?: boolean
    onPressedChange?: (pressed: boolean) => void
    variant?: ToggleVariant
    size?: ToggleSize
    tone?: ToggleTone
    ref?: Ref<HTMLButtonElement>
}
