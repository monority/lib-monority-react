import type { HTMLAttributes, ReactNode } from 'react'

export interface AccordionItem {
  value: string
  title: ReactNode
  content: ReactNode
}

export type AccordionSize = 'sm' | 'md' | 'lg'

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items?: AccordionItem[]
  defaultValue?: string | string[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  allowMultiple?: boolean
  collapsible?: boolean
  size?: AccordionSize
}
