import type { HTMLAttributes, ReactNode } from 'react'
export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export interface StackProps extends HTMLAttributes<HTMLDivElement> { gap?: StackGap; children?: ReactNode }
