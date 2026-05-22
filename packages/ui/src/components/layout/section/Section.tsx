import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {}
export function Section({ className, ...props }: SectionProps) { return <section className={cn('section', className)} {...props} /> }
