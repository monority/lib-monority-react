import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLHRElement> {}
export function Divider({ className, ...props }: DividerProps) { return <hr className={cn('ui-divider', className)} {...props} /> }
