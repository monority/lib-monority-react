import type { HTMLAttributes, ReactNode } from 'react'

export type SkeletonSize = 'sm' | 'md' | 'lg'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  size?: SkeletonSize
  width?: string | number
  height?: string | number
  rounded?: boolean
}
