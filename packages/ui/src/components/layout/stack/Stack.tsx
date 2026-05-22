import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

type StackGap = 'xs' | 's' | 'm' | 'l' | 'xl'
const gapCN: Record<StackGap, string> = { xs: 'stack-xs', s: 'stack-s', m: 'stack-m', l: 'stack-l', xl: 'stack-xl' }
interface StackProps extends HTMLAttributes<HTMLDivElement> { gap?: StackGap }

export function Stack({ gap = 'm', className, ...props }: StackProps) { return <div className={cn('stack', gapCN[gap], className)} {...props} /> }
