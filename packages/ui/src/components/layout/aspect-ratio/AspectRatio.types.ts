import type { HTMLAttributes, ReactNode } from 'react'

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number
  children?: ReactNode
}
