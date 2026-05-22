import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import './Card.css'

type CardPadding = 'sm' | 'md' | 'lg'
interface CardProps extends HTMLAttributes<HTMLDivElement> { padding?: CardPadding; interactive?: boolean }

export function Card({ padding = 'md', interactive = false, className, ...props }: CardProps) {
  return <div className={cn('ui-card', `ui-card--${padding}`, interactive && 'ui-card--interactive', className)} {...props} />
}

export type { CardProps, CardPadding }
