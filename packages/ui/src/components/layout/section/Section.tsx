import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { SectionProps } from './Section.types'

const sectionVariants = cva({
  base: 'mr-section',
  variants: {
    spacing: {
      sm: 'mr-section--sm',
      md: 'mr-section--md',
      lg: 'mr-section--lg',
      xl: 'mr-section--xl',
    },
  },
  defaultVariants: { spacing: 'md' },
})

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { spacing = 'md', className, children, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cn(sectionVariants({ spacing }), className)} data-spacing={spacing} {...props}>
      {children}
    </section>
  )
})

export type { SectionProps, SectionSpacing } from './Section.types'
