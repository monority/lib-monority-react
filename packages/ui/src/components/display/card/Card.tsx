import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { CardProps } from './Card.types'

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = 'md', interactive = false, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('mr-card', `mr-card--${padding}`, interactive && 'mr-card--interactive', className)}
      {...props}
      data-padding={padding}
      data-interactive={interactive ? true : undefined}
    />
  )
})

export type { CardPadding, CardProps } from './Card.types'
