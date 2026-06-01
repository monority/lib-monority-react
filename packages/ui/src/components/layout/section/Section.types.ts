import type { HTMLAttributes, ReactNode } from 'react'

export type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl'
export type SectionVariant = 'default' | 'bordered' | 'muted' | 'card'
export type SectionElement = 'section' | 'div' | 'article' | 'aside'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing
  variant?: SectionVariant
  as?: SectionElement
  id?: string
  title?: string
  children?: ReactNode
}
