import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextTone = 'muted' | 'base' | 'strong'; type TextSize = 'sm' | 'md' | 'lg'
const tnCN: Record<TextTone, string> = { muted: 'ui-text--muted', base: 'ui-text--base', strong: 'ui-text--strong' }
const szCN: Record<TextSize, string> = { sm: 'ui-text--sm', md: 'ui-text--md', lg: 'ui-text--lg' }
interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> { as?: ElementType; tone?: TextTone; size?: TextSize; className?: string; children?: React.ReactNode }

export function Text({ as: C = 'p', tone = 'muted', size = 'md', className, children, ...props }: TextProps) {
  return createElement(C, { className: cn('ui-text', tnCN[tone], szCN[size], className), children, ...props })
}
