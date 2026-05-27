import type { HTMLAttributes, ReactNode } from 'react'
export type GridColumns = 1 | 2 | 3 | 4 | 'auto-fit' | 'auto-fill'
export interface GridProps extends HTMLAttributes<HTMLDivElement> { columns?: GridColumns; children?: ReactNode }
