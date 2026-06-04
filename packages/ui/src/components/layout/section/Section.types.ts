import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl'

export type SectionVariant = 'default' | 'bordered' | 'muted' | 'card'

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Spacing preset (vertical gap + padding) */
  spacing?: SectionSpacing
  /** Visual variant */
  variant?: SectionVariant
  /** Polymorphic root element type */
  as?: ElementType
  /** Section title rendered as heading */
  title?: ReactNode
  /** HTML heading level for the title */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: ReactNode
}
