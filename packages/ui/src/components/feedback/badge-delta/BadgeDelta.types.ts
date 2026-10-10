import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type BadgeDeltaType =
    | 'increase'
    | 'moderate-increase'
    | 'decrease'
    | 'moderate-decrease'
    | 'unchanged'

export type BadgeDeltaSize = 'sm' | 'md' | 'lg'

export interface BadgeDeltaProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>
    deltaType?: BadgeDeltaType
    size?: BadgeDeltaSize
    isIncreasePositive?: boolean
    children: ReactNode
}
