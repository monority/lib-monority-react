import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

type GridColumns = 1 | 2 | 3 | 4 | 'auto-fit' | 'auto-fill'
const colCN: Record<GridColumns, string> = { 1: 'cols-1', 2: 'cols-2', 3: 'cols-3', 4: 'cols-4', 'auto-fit': 'auto-fit', 'auto-fill': 'auto-fill' }
interface GridProps extends HTMLAttributes<HTMLDivElement> { columns?: GridColumns }

export function Grid({ columns = 2, className, ...props }: GridProps) { return <div className={cn('grid', colCN[columns], className)} {...props} /> }
