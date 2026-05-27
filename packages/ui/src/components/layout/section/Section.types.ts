import type { HTMLAttributes, ReactNode } from 'react'
export type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl'
export interface SectionProps extends HTMLAttributes<HTMLElement> { spacing?: SectionSpacing; children?: ReactNode }
