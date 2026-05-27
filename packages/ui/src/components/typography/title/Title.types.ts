import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type TitleSize = 'sm' | 'md' | 'lg' | 'display'

export interface TitleProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> {
  as?: ElementType
  size?: TitleSize
  children?: ReactNode
  className?: string
}
