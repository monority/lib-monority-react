import type { HTMLAttributes, ReactNode } from 'react'

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'both' | 'vertical' | 'horizontal'
  hideScrollbar?: boolean
  children?: ReactNode
}
