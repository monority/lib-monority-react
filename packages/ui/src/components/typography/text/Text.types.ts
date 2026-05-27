import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type TextTone = 'muted' | 'base' | 'strong'
export type TextSize = 'sm' | 'md' | 'lg'

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> {
  as?: ElementType
  tone?: TextTone
  size?: TextSize
  children?: ReactNode
  className?: string
}
