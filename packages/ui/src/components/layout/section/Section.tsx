import { forwardRef, type ElementType } from 'react'
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
    variant: {
      default: '',
      bordered: 'mr-section--bordered',
      muted: 'mr-section--muted',
      card: 'mr-section--card',
    },
  },
  defaultVariants: {
    spacing: 'md',
    variant: 'default',
  },
})

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { className, spacing = 'md', variant = 'default', as, title, children, ...props },
  ref,
) {
  const Component = (as ?? 'section') as ElementType

  return (
    <Component
      ref={ref}
      className={cn(sectionVariants({ spacing, variant }), className)}
      data-spacing={spacing}
      data-variant={variant}
      {...props}
    >
      {title && <h2 className="mr-section__title">{title}</h2>}
      {children}
    </Component>
  )
})

export type { SectionProps, SectionSpacing, SectionVariant, SectionElement } from './Section.types'
