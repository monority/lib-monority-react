import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}
export function Container({ className, ...props }: ContainerProps) { return <div className={cn('container', className)} {...props} /> }
