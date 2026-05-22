import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TitleSize = 'sm' | 'md' | 'lg' | 'display'
const szCN: Record<TitleSize, string> = { sm: 'ui-title--sm', md: 'ui-title--md', lg: 'ui-title--lg', display: 'ui-title--display' }
interface TitleProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> { as?: ElementType; size?: TitleSize; className?: string; children?: React.ReactNode }

export function Title({ as: C = 'h2', size = 'md', className, children, ...props }: TitleProps) {
  return createElement(C, { className: cn('ui-title', szCN[size], className), children, ...props })
}
