import type { HTMLAttributes, ReactNode } from 'react'
export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type StackDirection = 'vertical' | 'horizontal'
export type StackAlign = 'stretch' | 'start' | 'center' | 'end'
export type StackJustify = 'start' | 'center' | 'end' | 'between'

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: StackGap
  direction?: StackDirection
  align?: StackAlign
  justify?: StackJustify
  children?: ReactNode
}
