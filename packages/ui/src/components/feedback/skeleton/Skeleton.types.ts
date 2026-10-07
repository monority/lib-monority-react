import type { HTMLAttributes, Ref } from 'react'

export type SkeletonSize = 'sm' | 'md' | 'lg'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    size?: SkeletonSize
    width?: string | number
    height?: string | number
    rounded?: boolean
    circle?: boolean
    lines?: number
}

export interface SkeletonLineProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
}
