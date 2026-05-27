import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import type { GridProps } from './Grid.types'

const gridVariants = cva({
  base: 'mr-grid',
  variants: {
    columns: {
      1: 'mr-grid--1',
      2: 'mr-grid--2',
      3: 'mr-grid--3',
      4: 'mr-grid--4',
      'auto-fit': 'mr-grid--auto-fit',
      'auto-fill': 'mr-grid--auto-fill',
    },
  },
  defaultVariants: { columns: 2 },
})

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns = 2, className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(gridVariants({ columns }), className)} data-columns={columns} {...props}>
      {children}
    </div>
  )
})

export type { GridProps, GridColumns } from './Grid.types'
