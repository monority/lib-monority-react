import type { HTMLAttributes, ReactNode } from 'react'
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  orientation?: 'horizontal' | 'vertical'
}
